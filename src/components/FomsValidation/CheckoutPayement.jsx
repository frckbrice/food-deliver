import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, useField, Field } from "formik";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import validationSchema from "./ValidationSchema";
// import { useLocalStorage } from "../../store/useLocalStorage";
import classes from "./CheckoutPayement.module.css";
import Card2 from "../UI/Card2";
import CartContext from "../../store/cart-context";
import HeaderWithoutBtn from "../Layout/HeaderWithoutBtn";
import { Set as set } from "../../store/functions";
// import mastercard from '../../assests/masterCard.png'

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={classes.error}>{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className={["checkbox-input"]}>
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className={classes.error}>{meta.error}</div>
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
        <div className={classes.error}>{meta.error}</div>
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
  name: "",
  email: "",
  phoneNumber: "",
  quater: "",
  acceptedTerms: false,
  cardNumber: "",
  expiryDate: "",
  cvc: "",
};

const CheckoutPayement = () => {
  // const { setUserValues } = useLocalStorage();
  const navigate = useNavigate();
  const { meals, totalAmount } = useContext(CartContext);
  const [trueValue, setTrueValue] = useState(false);
  const {
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps,
  } = usePaymentInputs();

  useEffect(() => {
    if (trueValue) {
      navigate("/foodDetail/ShowCart/PayementDetails/success");
    }
  }, []);

  const processCheckout = (values, { setSubmitting, resetForm }) => {
    console.log("process checkout ok");
    if (values) {
      setTrueValue(true);
      navigate("/foodDetail/ShowCart/PayementDetails/success");
      console.log(trueValue);
      setTimeout(() => {
        set(`${values.name}`, values);
        setSubmitting(false);
      }, 400);
    } else {
      setTrueValue(false);
    }

    resetForm({ values: "" });
  };

  console.log("process checkout ko");
  return (
    <>
      <HeaderWithoutBtn />
      <main className={classes["main-container"]}>
        <Card2>
          <h1 className={classes.h1}>Checkout Process</h1>
          <div className={classes.container}>
            <div>
              {" "}
              <h1 className="mb-6 text-amber-600 italic">Food(s) Ordered:</h1>
              {meals.length >= 1 &&
                meals.map((meal) => (
                  <div key={meal.id} className={classes.meal}>
                    <span style={{ color: "#897a7a" }}>{meal.name}</span>{" "}
                    <span style={{ color: "#1f7305" }}>
                      $ {(meal.quantity * meal.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              <h1 className="mt-6 ">
                Total Amount:{" "}
                <span style={{ color: "#1f7305" }}>
                  $ {totalAmount.toFixed(2)}
                </span>{" "}
              </h1>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              // validationSchema={() => {}}
              onSubmit={processCheckout}
            >
              <Form className={classes.form}>
                <MyTextInput
                  id="name"
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="full name"
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
                  label="Phone Number"
                  name="phoneNumber"
                  type="text"
                  placeholder="+237"
                  className={classes.input}
                  maxLength={15}
                />
                <br />
                <MySelect
                  label="Quater"
                  name="quater"
                  className={classes.select}
                >
                  <option value="">Select a quater</option>

                  <option value="mendong">Mendong</option>

                  <option value="biyemeassi">BiyemeAssi</option>

                  <option value="jouvence">Jouvence</option>

                  <option value="other">Other</option>
                </MySelect>

                <MyCheckbox name="acceptedTerms" className={classes.checkb}>
                  I accept the terms and conditions
                </MyCheckbox>

                <div className={classes.card}>
                  <label htmlFor="payementCard">Enter Card Informations</label>
                  <br />
                  <PaymentInputsWrapper {...wrapperProps}>
                  
                    <svg {...getCardImageProps({ images })} />
                    <Field name="cardNumber" className={classes.cardNumber}>
                      {({ field }) => (
                        <input
                          {...getCardNumberProps({
                            onBlur: field.onBlur,
                            onChange: field.onChange,
                            maxLength: 20,
                          })}
                        />
                      )}
                    </Field>
                    <Field name="expiryDate" className={classes.expiryDate}>
                      {({ field }) => (
                        <input
                          {...getExpiryDateProps({
                            onBlur: field.onBlur,
                            onChange: field.onChange,
                          })}
                        />
                      )}
                    </Field>
                    <Field name="cvc" className={classes.cvc}>
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

                <button type="submit" className={classes.bton}>
                  Submit
                </button>
                <button
                  type="button"
                  id="cancelBtnCheckOut"
                  className={classes.bton}
                  onClick={() => {
                    navigate("/foodDetail/ShowCart/PayementDetails/cancel");
                  }}
                >
                  Cancel
                </button>
              </Form>
            </Formik>
          </div>
        </Card2>
      </main>
    </>
  );
};

export default CheckoutPayement;
