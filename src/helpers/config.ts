const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const flutUrl = process.env.NEXT_PUBLIC_FLUT_URL;
const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
const encryptKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY;
const enquiry = process.env.NEXT_PUBLIC_ENQUIRY_KEY;

const CONFIG = {
  BASE_URL: `${baseUrl}`,
  PUBLIC_KEY: `${publicKey}`,
  SECRET_KEY: `${secretKey}`,
  FLUT_URL: `${flutUrl}`,
  ENCRYPTKEY: `${encryptKey}`,
  ENQUIRY: `${enquiry}`,
};

export default CONFIG;
