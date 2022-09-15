import Container from '../components/Container'
import { Link as LinkRouter } from 'react-router-dom'
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import LayersIcon from '@mui/icons-material/Layers';
import WashIcon from '@mui/icons-material/Wash';

export default function Index() {
    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)'>
            <div className='containerIndex1' >
                <LinkRouter className='link linkNew link1 ml10 mt10' to={'/nueva'}>
                    <div className='mask'>
                        <PlaylistAddCircleIcon className='iconTitle' />
                        <h1 className='titleCard'>NUEVA PLACA</h1>
                    </div>

                </LinkRouter>
                <LinkRouter className='link linkUsarPlaca link1 mr10 mt10' to={'/editPlate'}>
                <div className='mask'>
                        <LayersIcon className='iconTitle' />
                        <h1 className='titleCard'>USAR PLACA</h1>
                    </div>
                    
                </LinkRouter>
            </div>
            <div className='containerIndex1' >
                <LinkRouter className='link linkStock link2 ml10 mb10' to={'/stock'}>
                    <div className='mask'>
                        <PlaylistAddCheckCircleIcon className='iconTitle' />
                        <h1 className='titleCard'>STOCK</h1>
                    </div>

                </LinkRouter>
                <LinkRouter className='link linkEmp link2 mr10 mb10' to={'/'}>
                    <div className='mask'>
                        <DomainAddIcon className='iconTitle' />
                        <h1 className='titleCard'>MATERIALES</h1>
                    </div>

                </LinkRouter>
                <LinkRouter className='link linkJson link2 mr10 mb10' to={'/'}>
                    <div className='mask'>
                        <WashIcon className='iconTitle' />
                        <h1 className='titleCard'>JOHNSON</h1>
                    </div>

                </LinkRouter>

                
            </div>
        </Container>
    )

}