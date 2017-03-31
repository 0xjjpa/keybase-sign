import P from 'bluebird'
import kbpgp from 'kbpgp'

const importFromArmoredPgp = P.promisify(kbpgp.KeyManager.import_from_armored_pgp)
const box = P.promisify(kbpgp.box)

module.exports = async function sign (privateKey, message, passphrase) {
  try {
    const returnsUnlockedKeyManager = (keyManager) => {
      try {
        if (keyManager.is_pgp_locked()) {
          keyManager.unlock_pgp({ passphrase: passphrase }, (err) => { if (err) { throw new Error(err) } })
        }
        return keyManager
      } catch (err) {
        return err
      }
    }

    const keyManager = await importFromArmoredPgp({armored: privateKey})
        .then((keyManager) => returnsUnlockedKeyManager(keyManager))

    const signedMessage = await box({ sign_with: keyManager, msg: message })
        .then((signed) => signed)

    return Promise.resolve(signedMessage)
  } catch (err) {
    return Promise.reject(err)
  }
}
