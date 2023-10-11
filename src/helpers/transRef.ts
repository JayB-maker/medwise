export function transRef() {
  let refNo = "";
  const possibleRef =
    "ABCDEFGAGHSKYEJDJOUGUDKJOJIHJOOWFHQWHIJKLMNOPQRSTUVWXYZabcdefhdfuhdksmdlslkojqwnlsdfmcdloejehghijklmnopqrstuvwxyz0123969657680804534958465490345749794456789";
  //  const possibleRef = '0123456789';
  for (let i = 0; i < 5; i++) {
    refNo += possibleRef.charAt(Math.floor(Math.random() * possibleRef.length));
  }
  return refNo;
}

export function policyNumberGenerator() {
  // tslint:disable-next-line:no-shadowed-variable
  let policyNumber = "";
  const possibleRef =
    "ABCDE01FGHIJLLKDNKLMLSML890908497439HHKKVFTDRTQU23KLMNO45PGRST67UVWX89YX";
  //  const possibleRef = '0123456789';
  for (let i = 0; i < 5; i++) {
    policyNumber += possibleRef.charAt(
      Math.floor(Math.random() * possibleRef.length)
    );
  }
  return "/" + policyNumber;
}
