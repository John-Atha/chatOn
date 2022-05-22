import { Button, Stack, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { NavLink } from "react-router-dom";
import { signUpCall } from "../../api/auth";
import { getFieldErrors } from "../../helpers/getFieldErrors";
import { SignUpValidationSchema } from "../../helpers/yup/SignValidationSchema";
import { useAppDispatch } from "../../redux/hooks";

export const Signup = ({ submit }: { submit: (values: any) => void }) => {
  const dispatch = useAppDispatch();

  return (
    <Stack spacing={2} justifyContent={"center"}>
      <Typography align="center" variant="h5">
        Sign up
      </Typography>
      <Formik
        initialValues={{
          username: "",
          password: "",
          email: "",
          confirmation: "",
        }}
        validationSchema={SignUpValidationSchema}
        onSubmit={submit}
      >
        {({ values, errors, touched }) => (
          <Form>
            <Stack spacing={1}>
              <Field
                as={TextField}
                variant="outlined"
                label="Username"
                placeholder="Username..."
                name="username"
                type="text"
                {...getFieldErrors({ name: "username", errors, touched })}
              />
              <Field
                as={TextField}
                variant="outlined"
                label="Email"
                placeholder="Email..."
                name="email"
                type="text"
                {...getFieldErrors({ name: "email", errors, touched })}
              />
              <Field
                as={TextField}
                variant="outlined"
                label="Password"
                placeholder="password..."
                name="password"
                type="password"
                {...getFieldErrors({ name: "password", errors, touched })}
              />
              <Field
                as={TextField}
                variant="outlined"
                label="Confirmation"
                placeholder="confirmation..."
                name="confirmation"
                type="password"
                {...getFieldErrors({ name: "confirmation", errors, touched })}
              />
              <div style={{ paddingLeft: 32, paddingRight: 32 }}>
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  fullWidth
                >
                  Signup
                </Button>
              </div>
              <NavLink style={{ textAlign: "center" }} to="/login">
                Already have an account?
              </NavLink>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
