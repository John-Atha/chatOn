import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import io from "socket.io-client";
import { Navbar } from "../components/Home/Navbar";
import { Contacts } from "../components/Home/Contacts";
import { useAppSelector } from "../redux/hooks";
import { selectAuth } from "../redux/slices/auth";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:3001");

function App() {
  const navigate = useNavigate();
  const { user, status } = useAppSelector(selectAuth);

  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState("");

  const submit = () => {
    socket.emit("send_message", {
      message: text,
    });
  };

  useEffect(() => {
    if (!user && status === "idle") {
      navigate("/login");
    }
  }, [user]);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("received:", { data });
      setMessages(messages.concat(data.message));
    });
  }, [socket]);

  return (
    <Stack direction="column" minHeight={"inherit"} spacing={1}>
      <Navbar />
      <Grid container flexGrow={1}>
        <Grid
          item
          padding={1}
          minHeight={"100%"}
          width={250}
          sx={{ borderRight: "1px solid grey" }}
        >
          <Contacts />
        </Grid>
        <Grid item padding={1} flexGrow={1}>
          <Stack direction="column" minHeight={"100%"}>
            <Grid container flexGrow={1}>
              {messages?.map((message: string) => (
                <Grid item>
                  <Paper sx={{ padding: 2 }}>{message}</Paper>
                </Grid>
              ))}
            </Grid>
            <Grid container spacing={1}>
              <Grid item flexGrow={1}>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder="Your message..."
                  onChange={(e) => setText(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Grid container height='100%' alignItems="flex-end">
                  <Button onClick={submit} variant="outlined">
                    Send
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default App;
