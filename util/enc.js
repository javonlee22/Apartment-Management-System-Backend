const Crypto = require("crypto-js");

encryptCookie = val => {
  var ciphertext = Crypto.AES.encrypt(val,'TEST')
  return ciphertext.toString();
};

decryptCookie = val => {
  var bytes = Crypto.AES.decrypt(val.toString(),'TEST')
  console.log(bytes.toString(Crypto.enc.Utf8))
  return bytes.toString(Crypto.enc.Utf8);
};

module.exports = {
  encryptCookie,
  decryptCookie
};
