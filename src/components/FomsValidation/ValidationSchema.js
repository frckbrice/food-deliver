import * as yup from "yup";

export default yup.object().shape({
  name: yup.string().required("*"),
  email: yup.string().required("*").email("email need to be correct"),
  phoneNumber: yup
    .number()
    .required("*")
    .max(9, "the phone number must contain 9 digits")
    .typeError("kindly add valid phone number."),
  acceptedTerms: yup
    .boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),
  quater: yup
    .string()
    .required("*")
    .oneOf(
      ["mendong", "biyemeassi", "jouvence", "other"],
      "Invalid quater! Kindly add the quater; It's necessary for delivering."
    ),
  role: yup
    .string()
    .required("*")
    .oneOf(["admin", "guestUser"], "Invalid role! Choose your role;"),
  password: yup
    .string()
    .required("*")
    .min(8, "the password must contain at least 8 characters"),
  passwordConfirmation: yup
    .string()
    .required("*")
    .oneOf([yup.ref("password")], "the passwords are not the same"),
});
