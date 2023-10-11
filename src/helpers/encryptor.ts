const key = process.env.REACT_APP_ENCRIPTIONKEY;
const CryptoJS = require("crypto-js");

export const encrypt = (data: any) => {
  const encrypted =
    process.env.NODE_ENV === "development"
      ? data
      : CryptoJS.AES.encrypt(data, key).toString();
  return encrypted;
};
export const decrypt = (data: string) => {
  const decrypted =
    process.env.NODE_ENV === "development"
      ? data
      : CryptoJS.AES.decrypt(data, key);
  var decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
  return decryptedText;
};
