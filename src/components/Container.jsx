import {Box} from '@mui/material'

export default function Container({children,width,grow,wrap,direction,color,bgColor,padding,margin,to}) {

    return (
        <Box onClick={to} sx={{
            width: width,
            display: 'flex',
            flexDirection: direction,
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: grow,
            flexWrap: wrap,
            color: color,
            backgroundColor: bgColor,
            padding: padding,
            margin: margin}}>
            {children}
        </Box>
    )
    
}