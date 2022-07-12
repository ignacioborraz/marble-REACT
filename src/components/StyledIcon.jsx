import {Box} from '@mui/material'

export default function StyledIcon({children,color,bgColor,pad,mar}) {

    return (
        <Box sx={{
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: color,
            backgroundColor: bgColor,
            padding: pad,
            margin: mar}}>
            {children}
        </Box>
    )
    
}