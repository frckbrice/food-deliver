import * as yup from "yup";

export default yup.object().shape({
  name: yup.string().required("*"),
  email: yup.string().required("*").email("email need to be correct"),
  phoneNumber: yup
    .number()
    .required("*")
    .typeError("kindly add valid phone number."),
  acceptedTerms: yup
    .boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),
  quater: yup
    .string()
    .required("*")
    .typeError("Kindly add the quater. It's necessary for delivering."),
});
