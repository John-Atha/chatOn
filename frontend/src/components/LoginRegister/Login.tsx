import { Button, Stack, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { NavLink } from "react-router-dom";
import { getFieldErrors } from "../../helpers/getFieldErrors";
import { LoginValidationSchema } from "../../helpers/yup/SignValidationSchema";

export const Login = ({ submit }: { submit: (values: any) => void }) => {

  return (
    <Stack spacing={2} justifyContent={"center"}>
      <Typography align="center" variant="h5">
        Login
      </Typography>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginValidationSchema}
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
                label="Password"
                placeholder="password..."
                name="password"
                type="password"
                {...getFieldErrors({ name: "password", errors, touched })}
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
