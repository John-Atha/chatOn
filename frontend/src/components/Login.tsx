import { Button, Stack, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { NavLink } from "react-router-dom";

export const Login = () => {
  const submit = (values: any) => {
    console.log(values);
  };
  return (
    <Stack spacing={2} justifyContent={"center"}>
      <Typography align="center" variant="h5">
        Login
      </Typography>
      <Formik initialValues={{ username: "", password: "" }} onSubmit={submit}>
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
                label="Password"
                placeholder="password..."
                name="password"
                type="password"
              />
              <div style={{ paddingLeft: 32, paddingRight: 32 }}>
                <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    fullWidth
                >
                    Login
                </Button>
              </div>
              <NavLink style={{ textAlign: "center" }} to="/signup">
                First time here?
              </NavLink>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
