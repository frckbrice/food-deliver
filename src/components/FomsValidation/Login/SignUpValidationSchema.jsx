import * as yup from "yup";

const PHONE_NO_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/g;
const EMAIL_REG = /\S+@\S+\.\S+/g;
export default yup.object().shape({
  name: yup
    .string()
    .min(4, "Please enter a name more than 4 character")
    .required("Required"),
  email: yup.string().matches(EMAIL_REG, {
    message: "not valid email address",
    excludeEmptyString: true,
  }),
  phoneNumber: yup.string().matches(PHONE_NO_REGEX, {
    message: "not valid phone number",
    excludeEmptyString: false,
  }),
  acceptedTerms: yup
    .boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),
  role: yup
    .string()
    .required("Required")
    .oneOf(["admin", "guestUser"], "Invalid role! Choose your role;"),
  password: yup
    .string()
    .required("Required")
    .min(8, "the password must contain at least 8 characters"),
  passwordConfirmation: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password")], "the passwords are not the same"),
});
