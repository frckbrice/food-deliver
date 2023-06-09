import * as yup from "yup";

export default yup.object().shape({
  firstName: yup
    .string()
    .required("*"),
  lastName: yup
    .string()
    .required("*"),
  email: yup
    .string()
    .required("*")
    .email("email need to be correct"),
  password: yup
    .string()
    .required("*")
    .min(8, "the password must contain at least 8 characters"),
  passwordConfirmation: yup
    .string()
    .required("*")
    .oneOf([yup.ref("password")], "the passwords are not the same"),
});

//other schema to check on

// .transform(x => x === '' ? undefined : x)
//             .concat(true ? yup.string().required('*') : null)
//             .min(6, 'Password must be at least 6 characters'),
//   confirmPassword: yup.string()
//             .transform(x => x === '' ? undefined : x)
//             .when('password', (password, schema) => {
//                 if (password || true) return schema.required('*');
//             })
//             .oneOf([yup.ref('password')], 'Passwords must match')