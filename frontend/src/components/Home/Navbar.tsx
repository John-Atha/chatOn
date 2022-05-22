import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/slices/auth";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography component="div" variant="h6" sx={{ flexGrow: 1 }}>
            ChatOn
          </Typography>
          <Button
            variant="text"
            color='secondary'
            onClick={() => dispatch(logout)}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
