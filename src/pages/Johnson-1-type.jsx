import Container from '../components/Container'
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import johnsonActions from '../redux/actions/johnsonActions';

export default function JohnsonType() {
    const dispatch = useDispatch()
const type1 = "A430"
    useEffect(() => {
        dispatch(johnsonActions.getJohnsonType(type1))
        // eslint-disable-next-line
    }, [])

    const type = useSelector(store => store.johnsonReducer.filterJohnsonType)
    console.log("🚀 ~ file: Johnson-1-type.jsx ~ line 18 ~ JohnsonType ~ type", type)
    
    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)'>
            <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
                <LinkRouter to={'/johnson/new/A304'} className="linkTypes mr10 mb10 menorH">
                    <div className="bgType bgA304" >
                        <div className='mask'>
                            
                            <h1 className='titleCard johnsonTypeh1'>A304</h1>
                        </div>
                    </div>
                </LinkRouter>

                <LinkRouter to={'/johnson/new/A430'} className="linkTypes mr10 mb10 menorH">
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