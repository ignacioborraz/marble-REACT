import {Grid} from '@mui/material'

export default function StyledGridImg({children,grow,direction,color,bgColor,pad,mar,className}) {

    return (
        <Grid item xs={0} sm={6} md={7} xl={8} className={className} sx={{
            display: 'flex',
            flexDirection: direction,
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: grow,
            color: color,
            backgroundColor: bgColor,
            padding: pad,
            margin: mar}}>
            {children}
        </Grid>
    )
    
}