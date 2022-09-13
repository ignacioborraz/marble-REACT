import { useEffect } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import companyActions from '../redux/actions/companyActions'
import Container from '../components/Container'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import TaskIcon from '@mui/icons-material/Task';
export default function Stock() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(companyActions.getCompanies())
        // eslint-disable-next-line
    }, [])

    const companies = useSelector(store => store.companyReducer.companies)
    console.log("🚀 ~ file: New-1-Company.jsx ~ line 16 ~ SelectCompany ~ companies", companies)

    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)'>
            <Container width='100%' justify='space-evenly' wrap='wrap'>
                    <LinkRouter className='cardCompany link' to={'/stock/plates/internal'}  >
                        <div className="bgDisp">
                            <div className='mask3'>
                                <ThumbUpIcon className='iconTitle disp'/>
                                <h1 className='titleCard'>DISPONIBLES</h1>
                            </div>
                        </div>
                    </LinkRouter>
                    <LinkRouter className='cardCompany link' to={'/stock/plates/note'}  >
                        <div className="bgVend">
                            <div className='mask3'>
                            <RequestQuoteIcon className='iconTitle'/>
                                <h1 className='titleCard'>VENDIDAS</h1>
                            </div>
                        </div>
                    </LinkRouter>
                    <LinkRouter className='cardCompany link' to={'/stock/plates/done'}  >
                        <div className="bgDone">
                            <div className='mask3'>
                            <TaskIcon className='iconTitle'/>
                                <h1 className='titleCard'>CONSUMIDAS</h1>
                            </div>
                        </div>
                    </LinkRouter>
            </Container>
        </Container>
    )

}