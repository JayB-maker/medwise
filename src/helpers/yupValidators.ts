import * as yup from "yup";

// Regular expression for phone number
export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const numberRegExp = /[0-9]/;
export const yupValidators = {
  password: yup
    .string()
    .min(6, "Password must have at least 6 characters")
    .matches(/[A-Z]/, "Password must contain an uppercase alphabet")
    .matches(/[a-z]/, "Password must contain a lowercase alphabet")
    .matches(numberRegExp, "Password must contain a number"),
  phoneNumber: yup
    .string()
    .trim()
    .required("Please enter your phone number")
    .test(
      "len",
      "phone number must be exactly 11 characters",
      (val) => val?.length === 11
    )
    .matches(phoneRegExp, "Invalid Phone Number"),
  bvn: yup
    .string()
    .trim()
    .required("Please enter your bvn")
    .test(
      "len",
      "bvnmust be exactly 11 characters",
      (val) => val?.length === 11
    )
    .matches(phoneRegExp, "Invalid Phone Number"),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Please enter your email address")
    .min(5, "Email must have at least 5 characters")
    .max(128, "Email cannot have more than 128 characters"),
  bvnEmail: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Please enter your email address")
    .min(5, "Email must have at least 5 characters")
    .max(128, "Email cannot have more than 128 characters"),
  otp: yup
    .string()
    .required("Please enter OTP")
    .min(4, "OTP must have at least 4 characters")
    .max(10, "OTP cannot have more than 10 characters")
    .matches(numberRegExp, "Invalid OTP"),
  firstName: yup
    .string()
    .trim()
    .required("Please enter your name")
    .min(2, "Name must have at least 2 characters")
    .max(60, "Name cannot be longer than 60 characters"),
  lastName: yup
    .string()
    .trim()
    .required("Please enter your name")
    .min(2, "Name must have at least 2 characters")
    .max(60, "Name cannot be longer than 60 characters"),
  businessName: yup
    .string()
    .trim()
    .required("Please enter your name")
    .min(2, "Name must have at least 2 characters")
    .max(60, "Name cannot be longer than 60 characters"),
  accountNumber: yup
    .string()
    .trim()
    .required("Please enter account number")
    .test(
      "len",
      "account number must be exactly 10 characters",
      (val) => val?.length === 10
    )
    .matches(phoneRegExp, "Invalid Account Number"),
  amount: yup.string().trim().required("Amount is required"),
  bankName: yup.string().trim().required("Bank Name is required"),
  accountName: yup.string().required("Account Name is required"),
  genericRequired: ({
    message,
    min,
    max,
  }: {
    message?: string;
    min?: number;
    max?: number;
  }) => {
    return yup
      .string()
      .trim()
      .required(message ? message : "This field is required")
      .min(min || 0, `This field must have at least ${min} characters`)
      .max(
        max || Infinity,
        `This field cannot be longer than ${max} characters`
      );
  },
  genericRequiredNumber: ({
    message,
    min,
    max,
    matches,
  }: {
    message?: string;
    min?: number;
    max?: number;
    matches?: string;
  }) => {
    return yup
      .string()
      .trim()
      .required(message ? message : "This field is required ")
      .matches(numberRegExp, matches ? matches : "Invalid number")
      .min(min || 0, `This field must have at least ${min} characters`)
      .max(
        max || Infinity,
        `This field cannot be longer than ${max} characters`
      );
  },
  generic: ({ min, max }: { min?: number; max?: number }) => {
    return yup
      .string()
      .trim()
      .min(min || 0, `This field must have at least ${min} characters`)
      .max(
        max || Infinity,
        `This field cannot be longer than ${max} characters`
      );
  },
};
