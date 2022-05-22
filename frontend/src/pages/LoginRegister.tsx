import { Grid, Paper, Typography, Stack, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginCall, signUpCall } from "../api/auth";
import { SnackMessage } from "../components/general/SnackMessage";
import { Login } from "../components/LoginRegister/Login";
import { Signup } from "../components/LoginRegister/Signup";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login, selectAuth } from "../redux/slices/auth";
import { setSnackMessage } from "../redux/slices/snackMessage";

export const LoginRegister = ({ page }: { page: string }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, status } = useAppSelector(selectAuth);

  const submit = (values: any) => {
    console.log(values);
    let method = loginCall;
    if (page === "signup") {
      method = signUpCall;
    }
    method(values)
      .then((response) => {
        console.log(response.data);
        const { token, user } = response.data;
        dispatch(
          setSnackMessage({
            text: "Welcome",
            severity: "success",
          })
        );
        setTimeout(() => {
          dispatch(login({ token, user }));
        }, 300);
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(
          setSnackMessage({
            text: "Invalid credentials",
            severity: "error",
          })
        );
      });
  };

  useEffect(() => {
    if (user && status === "idle") {
      navigate("/");
    }
  }, [user, status]);

  const renderForm = () => {
    if (page === "login") {
      return <Login submit={submit} />;
    }
    return <Signup submit={submit} />;
  };
  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent={"center"}
        spacing={3}
        paddingTop="10vh"
      >
        <Stack direction="column" justifyContent={"center"} width={"100%"}>
          <Typography
            variant="h3"
            align="center"
            color={theme.palette.primary.main}
          >
            ChatOn
          </Typography>
          <Typography variant="h6" align="center">
            Chatting...simplified
          </Typography>
        </Stack>
        <Grid container justifyContent="center">
          <Box
            component={Paper}
            sx={{ padding: 2 }}
            width={{ xs: 300, sm: 500 }}
            elevation={3}
          >
            {renderForm()}
          </Box>
        </Grid>
      </Stack>
      <SnackMessage />
    </>
  );
};
