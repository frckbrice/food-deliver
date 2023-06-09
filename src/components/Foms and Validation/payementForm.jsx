import React, { useRef } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import validationSchema from "./ValidationSchema";
import register from "./FakeApi";
// import yup from "yup";

const initialValues = {
  pic: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const PayementForm = () => {
  const onSubmit = async (values) => {
    try {
      const returnValue = await register(values);
      console.log("values : ", returnValue);
      alert("registration success");
      resetForm();
    } catch ({ errors }) {
      alert(errors);
      // to manually set error on the field(s)
      for (let key of errors) {
        setFieldError(key, errors[key]);
      }
    }
  };

  //store values in the database
  React.useEffect(() => {
    localStorage.setItem("form", JSON.stringify(values));
  }, [values]);

  const imageRegister = useRef();
  return (
    <Formik 
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={}
    >
      {(formik) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-center">Create Profile</h1>
            <p className="text-gray-500 text-center">
              add information of your profile
            </p>
          </div>
          <div className="my-4 mx-4">
            <input type="file" id="imageFile" name="pic" ref={imageRegister} />
          </div>
          <div className="my-2 ">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="input"
              placeholder="first name"
              name="firstName"
              value={values.firstName || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.firstName && (
              <small className="error text-red-500 font-semibold">
                {errors.firstName}
              </small>
            )}
          </div>
          <div className="my-2">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="input"
              placeholder="last name"
              name="lastName"
              value={values.lastName || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.lastName && (
              <small className="error text-red-500 font-semibold">
                {errors.lastName}
              </small>
            )}
          </div>
          <div className="my-2">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="input"
              placeholder="email"
              name="email"
              value={values.email || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && (
              <small className="error text-red-500 font-semibold">
                {errors.email}
              </small>
            )}
          </div>
          <div className="my-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="input"
              placeholder="password"
              name="password"
              value={values.password || ""}
              onChange={handleChange}
              // onBlur={handleBlur}
            />
            {/* {touched.password && errors.password ? (
          <small className="error  text-red-500 font-semibold">
            {errors.password}
          </small>
        ) : null} */}
            {errors.password && (
              <small className="error text-red-500 font-semibold">
                {errors.password}
              </small>
            )}
          </div>
          <div className="my-2 ">
            <label htmlFor="confimationPassword">Confirm Password</label>
            <input
              type="password"
              className="input"
              placeholder="confirm password"
              name="passwordConfirmation"
              value={values.passwordConfirmation || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              // id="passwordConfirmation"
            />
            {errors.passwordConfirmation && (
              <small className="error text-red-500 font-semibold">
                {errors.passwordConfirmation}
              </small>
            )}
          </div>
          <div className="my-4">
            <Link to="/createprofile/viewprofile">
              <button
                className="btn"
                disabled={!isValid || isSubmitting}
                type="submit"
                onClick={onSubmit}
              >
                Register
              </button>
            </Link>
          </div>
        </form>
      )}
    </Formik>
  );
};
export default PayementForm;
