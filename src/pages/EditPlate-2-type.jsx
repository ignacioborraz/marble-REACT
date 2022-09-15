import { useEffect } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import companyActions from '../redux/actions/companyActions'
import Container from '../components/Container'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import TaskIcon from '@mui/icons-material/Task';

export default function EditPlateType() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(companyActions.getCompanies())
        // eslint-disable-next-line
    }, [])

    const companies = useSelector(store => store.companyReducer.companies)
    console.log("🚀 ~ file: New-1-Company.jsx ~ line 16 ~ SelectCompany ~ companies", companies)

    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)'>
            <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
            
                    <LinkRouter className='linkTypes  mr10 mb10' to={'/editPlate/plate'} >
                        <div className="Standard bgType">
                            <div className='mask'>
                                <h1 className='titleCard'>Placa Entera</h1>
                                
                            </div>
                        </div>
                    </LinkRouter>
                    <LinkRouter className='linkTypes  mr10 mb10' to={'/editPlate/plate'} >
                        <div className="Standard bgType">
                            <div className='mask'>
                                <h1 className='titleCard'>Escuadra</h1>
                                
                            </div>
                        </div>
                    </LinkRouter>
                    <LinkRouter className='linkTypes  mr10 mb10' to={'/editPlate/plate'} >
                        <div className="Jumbo bgType">
                            <div className='mask'>
                                <h1 className='titleCard'>Mayor a 50cm</h1>
                                
                            </div>
                        </div>
                    </LinkRouter>
                    <LinkRouter className='linkTypes  mr10 mb10' to={'/editPlate/plate'} >
                        <div className="Jumbo bgType">
                            <div className='mask'>
                                <h1 className='titleCard'>Menor a 50cm</h1>
                                
                            </div>
                        </div>
                    </LinkRouter>
                    
            
                
            </Container>
        </Container>
    )

}