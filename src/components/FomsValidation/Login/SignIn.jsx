import { useState, useEffect } from "react";
import { Formik, Form, useField } from "formik";
import validationSchema from "./SignInValidationSchema";
import classes from "../CheckoutPayement.module.css";
import Card2 from "../../UI/Card2";
import HeaderWithoutBtn from "../../Layout/HeaderWithoutBtn";
import { useLocalStorage } from "../../../store/useLocalStorage";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
  username: "",
  password: "",
  role: "",
};

const SignIn = () => {
  // const { lsData, setLsData } = useLocalStorage("email");
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const [successAuth, setSuccessAuth] = useState(false);
  const { lsData, setlsData } = useLocalStorage("authenticated", false);

  const authUsers = [
    {
      username: "avomevariste@ymail.com",
      password: "123456789",
      role: "admin",
    },
  ];
  useEffect(() => {
    if (successAuth) {
      navigate("/Login/Adminpage");
    }
  }, [successAuth, navigate]);

  const CheckLoginAndRedirect = (values, { setSubmitting, resetForm }) => {
    const accountUser = authUsers.find(
      (user) => user.username === values.username
    );
    if (
      accountUser &&
      accountUser.password === values.password &&
      accountUser.role === "admin"
    ) {
      setSuccessAuth(true);
      setFlag(false);
      setlsData(true);
      toast.success(`Login Successfull Mr. ${values.role}`);
      resetForm({ values: "" });
    } else {
      setFlag(true);
      setSuccessAuth(false);
      setSubmitting(false);
      resetForm({ values: "" });
      console.log("Not saved in Local Storage");
    }

    setSubmitting(false);
  };

  return (
    <>
      <HeaderWithoutBtn />
      <main className={classes["main-containerSignIn"]}>
        <Card2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={CheckLoginAndRedirect}
          >
            <Form className={classes.formSignIn}>
              <h1> Login Page</h1>

              <MyTextInput
                label="UserName"
                name="username"
                type="email"
                placeholder="example@hotmail.com"
                className={classes.input}
                value={undefined}
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
              <button type="submit" className={classes.btonSignIn}>
                Submit
              </button>
              {flag && (
                <p className={classes.error}>Can not access private page.</p>
              )}
            </Form>
          </Formik>
        </Card2>
      </main>
    </>
  );
};

export default SignIn;
