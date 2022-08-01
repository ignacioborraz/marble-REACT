import {useNavigate} from 'react-router-dom'

import {Grid} from '@mui/material'
import StyledGrid from '../components/StyledGrid'
import StyledGridImg from '../components/StyledGridImg'
import Text from '../components/Text'

export default function VariantPage({text,back}) {

    const navigate = useNavigate()

    function handleBack(event) {
        event.preventDefault()
        navigate("/"+back.to,{replace:true})
    }

    return (
        <Grid container sx={{flexGrow: '1', backgroundColor: 'rgb(25,25,25)'}}>
            <StyledGridImg bgColor='rgb(224,224,224)' className='backGroundStyle bgVariant' />
            <StyledGrid bgColor='rgb(224,224,224)' direction='column'>
            <Text variant='h3' width='75%' font='Paytone One' color='rgb(224,224,224)' bgColor='rgb(204,21,23)' padding='15px' margin='0 0 10px 0'>
                    rosarioJobs
                </Text>
                <Text variant='h5' color='rgb(204,21,23)' margin='0 0 10px 0'>
                    {text}
                </Text>
                <Text variant='h5' width='75%' font='Paytone One' color='rgb(224,224,224)' bgColor='rgb(25,25,25)' hover='rgb(204,21,23)' padding='5px' margin='0 0 10px 0' to={handleBack}>
                    {back.text}!
                </Text>
            </StyledGrid>
        </Grid>
    )
    
}