import {Grid} from '@mui/material'
import Container from '../components/Container'
import StyledGrid from '../components/StyledGrid'
import StyledGridImg from '../components/StyledGridImg'
import Text from '../components/Text'

export default function Index() {
    return (
        <Grid container sx={{flexGrow: '1', backgroundColor: 'rgb(2,0,3)'}}>
            <StyledGridImg bgColor='rgb(224,224,224)' className='backGroundStyle bgIndex' />
            <StyledGrid bgColor='rgb(224,224,224)' direction='column'>
                <Text variant='h3' width='280px' font='Paytone One' color='rgb(224,224,224)' bgColor='rgb(105,24,152)' padding='15px' margin='0 0 10px 0'>
                    PORTARO
                </Text>
                <Container width='280px' margin='0 0 10px 0'>
                    <Text variant='h6' width='50%' font='Paytone One' color='rgb(224,224,224)' bgColor='rgba(2,0,3,0.5)' hover='rgb(105,24,152)' padding='5px' /* to={toOpenEdit} */>
                        NUEVA PLACA
                    </Text>
                    <Text variant='h6' width='50%' font='Paytone One' color='rgb(224,224,224)' bgColor='rgb(2,0,3)' hover='rgb(105,24,152)' padding='5px' /* to={toDelete} */>
                        USAR PLACA
                    </Text>
                </Container>
                <Container width='280px'>
                    <Text variant='h6' width='50%' font='Paytone One' color='rgb(224,224,224)' bgColor='rgb(2,0,3)' hover='rgb(105,24,152)' padding='5px' /* to={toDelete} */>
                        STOCK
                    </Text>
                    <Text variant='h6' width='50%' font='Paytone One' color='rgb(224,224,224)' bgColor='rgba(2,0,3,0.5)' hover='rgb(105,24,152)' padding='5px' /* to={toOpenEdit} */>
                        HISTORIAL
                    </Text>
                </Container>
            </StyledGrid>
        </Grid>
    )
    
}