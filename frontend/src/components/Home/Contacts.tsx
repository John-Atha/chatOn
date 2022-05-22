import { Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'
import { getContactsCall } from '../../api/messages'
import { queriesKeys } from '../../api/queriesKeys'
import { Spinner } from '../general/Spinner'
import { ContactsList } from './ContactsList'

export const Contacts = () => {
    const { data, isLoading, isError } = useQuery(
        queriesKeys['getContacts'],
        getContactsCall, {
            refetchOnWindowFocus: false,
        },
    );

    let content = null;

    if (isLoading) {
        content = <Spinner />;
    }
    else if (isError || !data?.length) {
        content = (
            <Typography variant='h6'>
                No messages found
            </Typography>
        )
    }
    else {
        content = <ContactsList contacts={data} />
    }

    return (
        <Stack direction='column'>
            <Typography variant='h5'>
                Messages
            </Typography>
            <Divider sx={{ marginTop: 1 }} />
            { content }
        </Stack>
    )
}