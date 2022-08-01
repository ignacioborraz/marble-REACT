import React from 'react'

import {Box,Typography} from '@mui/material'

function Footer() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70px',
            color: 'rgb(224,224,224)',
            backgroundColor: 'rgb(204,21,23)'}}>
            <Typography variant='h6' sx={{fontFamily: 'Paytone One'}}>
                ------ portaro ------
            </Typography>
        </Box>
    )
}

export default Footer

//rgb(25,25,25) //negro
//rgb(204,21,23) //violeta
//rgb(224,224,224) //gris