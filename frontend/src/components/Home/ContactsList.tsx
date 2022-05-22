import { List, ListItem } from '@mui/material'
import React from 'react'
import { OneContact } from './OneContact'

export const ContactsList = ({ contacts }: { contacts: any[] }) => {
    return (
        <List disablePadding>
            {contacts.map((contact) => (
                <ListItem key={contact.user._id} disablePadding>
                    <OneContact contact={contact} />
                </ListItem>
            ))}
        </List>
    )
}