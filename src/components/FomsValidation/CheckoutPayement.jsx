import React, { useContext } from "react";
import { Formik, Form, useField, Field } from "formik";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import validationSchema from "./ValidationSchema";
import { useLocalStorage } from "../../store/useLocalStorage";
import classes from "./CheckoutPayement.module.css";
import Card2 from "../UI/Card2";
import CartContext from "../../store/cart-context";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>

      <select {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

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

const initialValues = {
  cvc: "",
  name: "",
  email: "",
  quater: "",
  passWord: "",
  cardNumber: "",
  expiryDate: "",
  phoneNumber: "",
  acceptedTerms: false,
};

// And now we can use these
const CheckoutPayement = () => {
  const { setUserValues } = useLocalStorage();

  const { meals, totalAmount } = useContext(CartContext);

  const {
    meta,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps,
  } = usePaymentInputs();

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

  const storeUserData = (values, { setSubmitting }) => {
    setTimeout(() => {
      setUserValues(values);
      setSubmitting(false);
    }, 400);
  };

  return (
    <Card2>
      <main className={classes["main-container"]}>
        <h1>Checkout Process</h1>
        <div className={classes.container}>
          <div>
            {meals.length >= 1 &&
              meals.map((meal) => (
                <div key={meal.id} className={classes.meal}>
                  <span>{meal.name}</span>{" "}
                  <span>{(meal.quantity * meal.price).toFixed(2)}</span>
                </div>
              ))}
            <h1>Total Amount: {totalAmount}</h1>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={storeUserData}
            validate={validate}
          >
            <Form className={classes.form}>
              <MyTextInput
                id="name"
                label="Full Name"
                name="name"
                type="text"
                placeholder="maebrie"
                className={classes.input}
              />
              <br />
              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="example@hotmail.com"
                className={classes.input}
              />
              <br />
              <MyTextInput
                label="PassWord"
                name="passWord"
                type="text"
                placeholder="avom"
                className={classes.input}
              />
              <br />
              <MyTextInput
                label="Phone Number"
                name="phoneNumber"
                type="text"
                placeholder="Brice"
                className={classes.input}
              />
              <br />
              <MySelect label="Quater" name="quater" className={classes.select}>
                <option value="">Select a quater</option>

                <option value="mendong">Mendong</option>

                <option value="biyemeassi">BiyemeAssi</option>

                <option value="jouvence">Jouvence</option>

                <option value="other">Other</option>
              </MySelect>

              <MyCheckbox name="acceptedTerms" className={classes.checkb}>
                I accept the terms and conditions
              </MyCheckbox>

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

              <button type="submit" className="btn">
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </main>
    </Card2>
  );
};

export default CheckoutPayement;
