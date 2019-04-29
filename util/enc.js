const Crypto = require('crypto-js')

encryptCookie = (val) => {
    const key = Crypto.enc.Utf8.parse(process.env.JWT_KEY);
    const iv = Crypto.enc.Utf8.parse(process.env.JWT_KEY);
    const encrypted = Crypto.AES.encrypt(
      Crypto.enc.Utf8.parse(val.toString()),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: Crypto.mode.CBC,
        padding: Crypto.pad.Pkcs7
      }
    );
    return encrypted.toString();
  };

decryptCookie = (val) => {
    const key = CryptoJS.enc.Utf8.parse(process.env.JWT_KEY);
    var iv = CryptoJS.enc.Utf8.parse(process.env.JWT_KEY);
    var decrypted = CryptoJS.AES.decrypt(val, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}

module.exports = {
    encryptCookie,
    decryptCookie
}