import * as yup from "yup";
import valid from "card-validator";

const PHONE_NO_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/g;
const EMAIL_REG = /\S+@\S+\.\S+/g;
const CARD_PATTERN_REG_MASTERCARD = /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/;
export default yup.object().shape({
  name: yup
    .string()
    .min(4, "Please enter a name more than 4 character")
    .required("Required"),
  email: yup.string().required("Required").matches(EMAIL_REG, {
    message: "not valid email address",
    excludeEmptyString: true,
  }),
  phoneNumber: yup.string().required("Required").matches(PHONE_NO_REGEX, {
    message: "not valid phone number",
    excludeEmptyString: false,
  }),
  quater: yup
    .string()
    .required("Required")
    .oneOf(
      ["mendong", "biyemeassi", "jouvence", "other"],
      "Invalid quater! Kindly add the quater; It's necessary for delivering."
    ),
  acceptedTerms: yup
    .boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),

  cardNumber: yup
    .string()
    .test(
      "test-number",
      "Credit Card number is invalid",
      (value) => valid.number(value).isValid
    ),
  expiryDate: yup.string().required("Add the expiryDate"),
  cvc: yup.string().required("Add the cvc"),
});
