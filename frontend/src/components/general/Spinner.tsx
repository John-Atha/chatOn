import { CircularProgress, Grid } from '@mui/material'
import React from 'react'

export const Spinner = () => {
    return (
        <Grid container justifyContent='center' alignItems='center'>
            <CircularProgress />
        </Grid>
    )
}