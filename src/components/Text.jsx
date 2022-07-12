import {Typography} from '@mui/material'

export default function Text({children,font,width,grow,variant,color,bgColor,padding,margin,hover,to,weight}) {
    return (
        <Typography variant={variant} onClick={to} sx={{
            fontFamily: font,
            width: width,
            fontSize: variant==='h1' ? {xs: '48px', sm: '60px', md: '75px', lg: '96px'} :
                        variant==='h2' ? {xs: '34px', sm: '34px', md: '48px', lg: '60px'} :
                        variant==='h3' ? {xs: '26px', sm: '30px', md: '40px', lg: '48px'} :
                        variant==='h4' ? {xs: '20px', sm: '24px', md: '30px', lg: '34px'} :
                        variant==='h5' ? {xs: '14px', sm: '16px', md: '22px', lg: '24px'} :
                        variant==='h6' ? {xs: '12px', sm: '14px', md: '16px', lg: '18px'} : {xs: '10px', sm: '12px', md: '14px', lg: '18px'},
            fontWeight: weight,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: grow,
            textAlign: 'center',
            color: color,
            backgroundColor: bgColor,
            padding: padding,
            margin: margin,
            '&:hover': {bgcolor: hover}}}>
            {children}
        </Typography>
    )
    
}