import Container from '../components/Container'
import {Link as LinkRouter} from 'react-router-dom'

export default function Index() {
    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)'>
            <Container width='100%' justify='space-evenly'>
                <LinkRouter className='link link1 ml10 mt10' to={'/nueva'}>
                    NUEVA PLACA
                </LinkRouter>
                <LinkRouter className='link link1 mr10 mt10' to={'/'}>
                    USAR PLACA
                </LinkRouter>
            </Container>
            <Container width='100%' justify='space-evenly'>
                <LinkRouter className='link link2 ml10 mb10' to={'/'}>
                    STOCK
                </LinkRouter>
                <LinkRouter className='link link2 mr10 mb10' to={'/'}>
                    EMPRESAS
                </LinkRouter>
            </Container>
        </Container>
    )
    
}