import { Start } from '@mui/icons-material'
import {Box} from '@mui/material'

export default function Container({children,width,grow,wrap,direction,justify,align,color,bgColor,padding,margin,to, content}) {

    return (
        <Box onClick={to} sx={{
            width: width,
            display: 'flex',
            flexDirection: direction,
            justifyContent: justify,
            alignItems: align,
            alignContent:content,
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