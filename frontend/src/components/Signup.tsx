import { Button, Stack, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { NavLink } from "react-router-dom";

export const Signup = () => {
  const submit = (values: any) => {
    console.log(values);
  };
  return (
    <Stack spacing={2} justifyContent={"center"}>
      <Typography align="center" variant="h5">
        Sign up
      </Typography>
      <Formik initialValues={{ username: "", password: "", email: "", confirmation: "", }} onSubmit={submit}>
        {({ values, errors, touched }) => (
          <Form>
            <Stack spacing={2}>
              <Field
                as={TextField}
                variant="outlined"
                label="Username"
                placeholder="Username..."
                name="username"
                type="text"
              />
            <Field
                as={TextField}
                variant="outlined"
                label="Email"
                placeholder="Email..."
                name="email"
                type="text"
              />
              <Field
                as={TextField}
                variant="outlined"
                label="Password"
                placeholder="password..."
                name="password"
                type="password"
              />
            <Field
                as={TextField}
                variant="outlined"
                label="Confirmation"
                placeholder="confirmation..."
                name="confirmation"
                type="password"
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
