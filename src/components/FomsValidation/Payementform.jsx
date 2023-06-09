import { Formik, Field } from "formik";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import { useLocalStorage } from "../../store/useLocalStorage";

function PaymentForm() {
  const { setValues } = useLocalStorage();

  const {
    meta,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps,
  } = usePaymentInputs();

  const images = {
    mastercard: (
      <g fill="none" fillRule="evenodd">
        <rect fill="#252525" height="16" rx="2" width="24" />
        <circle cx="9" cy="8" fill="#eb001b" r="5" />
        <circle cx="15" cy="8" fill="#f79e1b" r="5" />
        <path
          d="m12 3.99963381c1.2144467.91220633 2 2.36454836 2 4.00036619s-.7855533 3.0881599-2 4.0003662c-1.2144467-.9122063-2-2.36454837-2-4.0003662s.7855533-3.08815986 2-4.00036619z"
          fill="#ff5f00"
        />
      </g>
    ),
  };

  const initValues = {
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  };

  const validate = () => {
    let errors = {};
    if (meta.erroredInputs.cardNumber) {
      errors.cardNumber = meta.erroredInputs.cardNumber;
    }
    if (meta.erroredInputs.expiryDate) {
      errors.expiryDate = meta.erroredInputs.expiryDate;
    }
    if (meta.erroredInputs.cvc) {
      errors.cvc = meta.erroredInputs.cvc;
    }
    return errors;
  };

  const storeCardData = (data) => {
    setValues(data);
  };

  return (
    <Formik
      initialValues={initValues}
      onSubmit={storeCardData}
      validate={validate}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <PaymentInputsWrapper {...wrapperProps}>
              <svg {...getCardImageProps({ images })} />
              <Field name="cardNumber">
                {({ field }) => (
                  <input
                    {...getCardNumberProps({
                      onBlur: field.onBlur,
                      onChange: field.onChange,
                    })}
                  />
                )}
              </Field>
              <Field name="expiryDate">
                {({ field }) => (
                  <input
                    {...getExpiryDateProps({
                      onBlur: field.onBlur,
                      onChange: field.onChange,
                    })}
                  />
                )}
              </Field>
              <Field name="cvc">
                {({ field }) => (
                  <input
                    {...getCVCProps({
                      onBlur: field.onBlur,
                      onChange: field.onChange,
                    })}
                  />
                )}
              </Field>
            </PaymentInputsWrapper>
          </div>
          <button style={{ marginTop: "major-2" }} type="submit">
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
}
export default PaymentForm;
