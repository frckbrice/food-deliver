import { useState } from "react";
import { Formik, Form, useField } from "formik";
import validationSchema from "./SignInValidationSchema";
import classes from "../CheckoutPayement.module.css";
import Card2 from "../../UI/Card2";
import HeaderWithoutBtn from "../../Layout/HeaderWithoutBtn";
// import { Set as set } from "../../../store/functions";
// import AdminPage from "../../Admin/AdminPage";
import { useLocalStorage } from "../../../store/useLocalStorage";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

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
  email: "",
  passWord: "",
  role: "",
};

const SignIn = () => {
  const { lsData, setLsData } = useLocalStorage("email", {});
  const [flag, setFlag] = useState(false);

  const CheckLogin = (values, { setSubmitting }) => {
    setTimeout(() => {
      if (
        values.passWord !== lsData.passWord ||
        values.email !== lsData.email
      ) {
        setFlag(true);
      } else {
        setFlag(false);
      }
      setLsData(values);
      setSubmitting(false);
      Formik.resetForm();
      console.log("Saved in Local Storage");
    }, 400);
    toast.success("Login Successfull Mr. Admin");
  };

  return (
    <>
      <HeaderWithoutBtn />
      <main className={classes["main-containerSignIn"]}>
        <Card2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={CheckLogin}
          >
            <Form className={classes.formSignIn}>
              <h1> Login Page</h1>

              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="example@hotmail.com"
                className={classes.input}
              />

              <br />
              <MySelect label="Role" name="role" className={classes.select}>
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
              <Link to="/Login/Adminpage">
                <button type="submit" className={classes.btonSignIn}>
                  Submit
                </button>
              </Link>
              {flag && (
                <p className={classes.error}>
                  Fill correct Info else keep trying.
                </p>
              )}
            </Form>
          </Formik>
        </Card2>
      </main>
    </>
  );
};

export default SignIn;
