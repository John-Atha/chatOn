import {
  Grid,
  Paper,
  Typography,
  Card,
  CardHeader,
  Stack,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Login } from "../components/Login";
import { Signup } from "../components/Signup";

export const LoginRegister = ({ page }: { page: string }) => {
    const theme = useTheme();
  const renderForm = () => {
    if (page === "login") {
      return <Login />;
    }
    return <Signup />;
  };
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' justifyContent={'center'} spacing={3} paddingTop='10vh'>
      <Stack direction='column' justifyContent={'center'} width={'100%'}>
        <Typography variant="h3" align="center" color={theme.palette.primary.main}>
            ChatOn
        </Typography>
        <Typography variant='h6' align='center'>
            Chatting...simplified
        </Typography>
      </Stack>
      <Grid container justifyContent='center'>
        <Box component={Paper} sx={{ padding: 2 }} width={{ xs: 300, sm: 500 }} elevation={3}>
            {renderForm()}
        </Box>
      </Grid>
    </Stack>
  );
};
