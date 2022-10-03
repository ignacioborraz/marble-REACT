import Container from '../components/Container'
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import { Link as LinkRouter } from 'react-router-dom'

export default function JohnsonMenu() {
    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)'>
            <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
                <LinkRouter to={'/johnson/new'} className="linkTypes menorH">
                    <div className="bgType bgCargar" >
                        <div className='mask'>
                        <PlaylistAddCircleIcon className='iconTitle' />
                            <h1 className='titleCard'>Cargar</h1>
                        </div>
                    </div>
                </LinkRouter>
                <LinkRouter to={'/johnson/stock'}  className="linkTypes menorH">
                    <div className="bgType bgStockJohnson" >
                        <div className='mask'>
                        <PlaylistAddCheckCircleIcon className='iconTitle' />
                            <h1 className='titleCard'>Stock</h1>
                        </div>
                    </div>
                </LinkRouter>
            </Container>
        </Container >
    )

}