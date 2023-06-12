import { Formik, Form, useField } from "formik";
import validationSchema from "./SignUpValidationSchema";
import classes from "../CheckoutPayement.module.css";
import Card2 from "../../UI/Card2";
import HeaderWithoutBtn from "../../Layout/HeaderWithoutBtn";
import { Set as set } from "../../../store/functions";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
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
      <label>
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

const initialValues = {
  name: "",
  email: "",
  passWord: "",
  passWordConfirmation: "",
  role: "",
  phoneNumber: "",
  acceptedTerms: false,
};

const SignUp = () => {
  const storeUserData = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      set("user", values);
      set("authenticated", false);
      setSubmitting(false);
      console.log("Saved in Local Storage");
    }, 400);
    console.log(values);
    toast.success("Successfully Registered");
    resetForm({ values: "" });
  };

  return (
    <>
      <HeaderWithoutBtn />
      <main className={classes["main-containerSignUp"]}>
        <Card2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={storeUserData}
          >
            <Form className={classes.form}>
              <h1> Registration Page</h1>
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
                label="Role"
                name="role"
                className={classes.selectSignup}
              >
                <option value="">Select your Role</option>
                <option value="admin">Admin</option>
                <option value="guestUser">User</option>
              </MySelect>
              <br />
              <MyTextInput
                label="Password"
                name="password"
                type="password"
                placeholder="password"
                className={classes.input}
                value={undefined}
              />
              <br />
              <MyTextInput
                label="PassWord Confirmation"
                name="passwordConfirmation"
                type="password"
                placeholder="passwordconfirmation"
                className={classes.input}
                value={undefined}
              />
              <br />

              <MyCheckbox name="acceptedTerms" className={classes.checkb}>
                I accept the terms and conditions
              </MyCheckbox>

              <button type="submit" className={classes.bton}>
                Submit
              </button>
              <p className="forgot-password text-right">
                Already registered &nbsp;
                <Link to="/login">
                  <button className="text-blue-800 text-2xl">log in</button>
                </Link>
                &nbsp;&nbsp;?
              </p>
            </Form>
          </Formik>
        </Card2>
      </main>
    </>
  );
};

export default SignUp;
