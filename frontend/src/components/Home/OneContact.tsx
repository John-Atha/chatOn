import { Typography } from '@mui/material';
import React from 'react'
import { stringSlice } from '../../helpers/stringSlice';
import { useAppSelector } from '../../redux/hooks';
import { selectAuth } from '../../redux/slices/auth';
import { UserAvatar } from '../general/UserAvatar';

export const OneContact = ({ contact }: any) => {
    const { user: currentUser } = useAppSelector(selectAuth);
    const { user, text, sender, receiver, seen, datetime } = contact;

    const sent = sender===currentUser._id;

    return (
        <UserAvatar
            username={user.username}
            subheader={(
                <Typography variant='caption'>
                   {sent && "You: "} {stringSlice(text, 15)} &#8226; {datetime.slice(5, 10)}
                </Typography>
            )}
        />
    )
}