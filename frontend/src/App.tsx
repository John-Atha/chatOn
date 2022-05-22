import React, { useEffect, useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState('');

  const submit = () => {
    socket.emit('send_message', {
      message: text,
    });
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log("received:", { data });
      setMessages(messages.concat(data.message));
    })
  }, [socket])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6">Messages</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          {messages?.map((message: string) => (
            <Grid item>
              <Paper sx={{ padding: 2 }}>
                {message}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField
          type='text'
          variant="outlined"
          placeholder="Your message..."
          onChange={(e) => setText(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={submit} variant='outlined'>
          Send
        </Button>
      </Grid>
    </Grid>
  );
}

export default App;
