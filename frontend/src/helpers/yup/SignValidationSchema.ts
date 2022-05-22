import * as Yup from "yup";

const email_regexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const basicShape = {
  username: Yup.string().required("Required"),
};

export const SignUpValidationSchema = Yup.object().shape({
  ...basicShape,
  email: Yup.string().required("Required").matches(email_regexp, {
    message: "Invalid email address",
    excludeEmptyStrings: true,
  }),
  password: Yup.string()
    .required("Required")
    .min(6, "Must be at least 6 characters long"),
  confirmation: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Must be the same with the password")
    .required("Required"),
});

export const LoginValidationSchema = Yup.object().shape({
  ...basicShape,
  password: Yup.string().required("Required"),
});
