/* global it */
/* global expect */

import * as Fixture from './fixtures'
import verify from 'keybase-verify'

const sign = require('../src')

it('returns a signed message given a private key that can be verified with its public pair', async () => {
  const signedMessage = await sign(Fixture.privateKey, Fixture.message, Fixture.passphrase)

  verify(Fixture.publicKey, signedMessage).then(() => {
    console.log('The user signed the message')
  })
})

it('throws an error given when signing a message with a locked key given the wrong password', async () => {
  const err = await sign(Fixture.privateKey, Fixture.message, Fixture.wrongPassphrase)
    .catch((err) => err)

  expect(err).toThrow()
})
