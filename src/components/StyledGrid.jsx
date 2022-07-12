import {Grid} from '@mui/material'

export default function StyledGrid({children,grow,direction,color,bgColor,pad,mar}) {

    return (
        <Grid item xs={12} sm={6} md={5} xl={4} sx={{
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