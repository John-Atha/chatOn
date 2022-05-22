import { Alert, Snackbar } from '@mui/material';
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeSnackMessage, selectSnackMessage } from '../../redux/slices/snackMessage';

export const SnackMessage = () => {
    const dispatch = useAppDispatch();

    const { text, severity, duration } = useAppSelector(selectSnackMessage);

    const close = () => dispatch(closeSnackMessage());

    if (!text) {
        return null;
    }

    return (
        <Snackbar
            open
            onClose={close}
            autoHideDuration={duration}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert
                severity={severity}
                onClose={close}
            >
                { text }
            </Alert>
        </Snackbar>
    )
}