import Container from '../components/Container'
import { Link as LinkRouter } from 'react-router-dom'

export default function JohnsonType() {
    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)'>
            <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
                <LinkRouter to={'/johnson/new/A304'} className="linkTypes menorH">
                    <div className="bgType bgA304" >
                        <div className='mask'>                            
                            <h1 className='titleCard johnsonTypeh1'>A304</h1>
                        </div>
                    </div>
                </LinkRouter>
                <LinkRouter to={'/johnson/new/A430'} className="linkTypes menorH">
                    <div className="bgType bgA430" >
                        <div className='mask'>                            
                            <h1 className='titleCard johnsonTypeh1'>A430</h1>
                        </div>
                    </div>
                </LinkRouter>
            </Container>
        </Container >
    )

}