const crypto = require('crypto')

export const getNonce = () => {
  crypto.randomBytes(16).toString('base64')
}
