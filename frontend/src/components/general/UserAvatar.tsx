import { alpha, Avatar, CardHeader, useTheme } from "@mui/material";
import React, { ReactElement } from "react";

interface UserAvatarProps {
  username: string;
  subheader?: ReactElement;
  action?: ReactElement;
  height?: number;
  width?: number;
}
export const UserAvatar = ({
  username,
  subheader,
  action,
  height=25,
  width=25,
}: UserAvatarProps) => {
    const theme = useTheme();
  return (
    <CardHeader
      avatar={
        <Avatar alt="user avatar" sx={{ height, width, bgcolor: alpha(theme.palette.primary.main, 0.4) }}>
          {username.slice(0, 1)}
        </Avatar>
      }
      title={username}
      subheader={subheader}
      action={action}
      sx={{ padding: 1 }}
    />
  );
};
