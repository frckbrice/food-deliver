import * as yup from "yup";

const EMAIL_REG = /\S+@\S+\.\S+/g;
export default yup.object().shape({
  username: yup.string().required("Required").matches(EMAIL_REG, {
    message: "not valid email address",
    excludeEmptyString: true,
  }),
  role: yup
    .string()
    .required("Required")
    .oneOf(["admin", "guestUser"], "Invalid role! Choose your role;"),
  password: yup
    .string()
    .required("Required")
    .min(8, "the password must contain at least 8 characters"),
});
