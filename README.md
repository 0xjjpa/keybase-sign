# keybase-sign [![Build Status](https://img.shields.io/travis/jjperezaguinaga/keybase-sign/master.svg?style=flat-square)](https://travis-ci.org/jjperezaguinaga/keybase-sign)
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


🔑  Using kbpgp to sign messages with on a private key

## Install

```bash
$ npm install keybase-sign --save
```

## Usage

```js
const sign = require('keybase-sign')

const privateKey =  `-----BEGIN PGP PRIVATE KEY BLOCK-----
Version: Keybase OpenPGP v2.0.66
Comment: https://keybase.io/crypto

xcaGBFjc/2UBEADIuWmIzZNn5ZXLSs5juV+yi2RIsCqHtotcjJ/g4QqKaw4vpFYa
...
`

const message = 'This is a test'
const passphrase = 'password' // Only required if private key is locked

try {
  sign(privateKey, message, passphrase).then(detachedSignature => {
    console.log(detachedSignature)
    /*
    -----BEGIN PGP MESSAGE-----
    Version: Keybase OpenPGP v2.0.68
    Comment: https://keybase.io/crypto
    
    yMCQAnicAUQBu/7EDQMACgFK7D7a1hCEhQHLFHUAWN58I1RoaXMgaXMgYSB0ZXN0
    ...
    -----END PGP MESSAGE-----
    */
  })
} catch(err) {
    console.log('There was an error signing', err)
}


```

## Related

[E.nigma](https://github.com/jjperezaguinaga/e.nigma.pw) - 🔐 e.nigma.pw / Encryption toolbox utility

## License

MIT © [Jose Aguinaga](https://jjperezaguinaga.com)
