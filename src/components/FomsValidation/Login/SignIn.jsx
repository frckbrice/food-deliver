import { useState } from "react";
import { Formik, Form, useField } from "formik";
import validationSchema from "../ValidationSchema";
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
  const [adminPage, setAdminpage] = useState(true);
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
        setAdminpage(!adminPage);
        setFlag(false);
      }
      setLsData(values);
      setSubmitting(false);
      Formik.resetForm();
      console.log("Saved in Local Storage");
    }, 400);

    setAdminpage(!adminPage);
    toast.success("Login Successfull");
  };

  return (
    <>
      <HeaderWithoutBtn />
      <main className={classes["main-container"]}>
        <Card2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={CheckLogin}
          >
            <Form className={classes.form}>
              <h1> Login</h1>

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
              />

              <br />
              <Link to="/Login/AdminPage">
                <button type="submit" className={classes.btn}>
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
