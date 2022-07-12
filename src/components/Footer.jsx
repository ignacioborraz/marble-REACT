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
            backgroundColor: 'rgb(105,24,152)'}}>
            <Typography variant='h6' sx={{fontFamily: 'Paytone One'}}>
                ------ portaro ------
            </Typography>
        </Box>
    )
}

export default Footer

//rgb(2,0,3) //negro
//rgb(105,24,152) //violeta
//rgb(224,224,224) //gris