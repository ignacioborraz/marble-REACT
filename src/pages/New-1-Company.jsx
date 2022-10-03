import { useEffect } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import companyActions from '../redux/actions/companyActions'
import Container from '../components/Container'

export default function SelectCompany() {

    const companies = useSelector(store => store.companyReducer.companies)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(companyActions.getCompanies())
        dispatch(companyActions.newPlate(null))
        // eslint-disable-next-line
    }, [])

    function creatingPlate(event) {
        dispatch(companyActions.newPlate(event.currentTarget.id))
    }

    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)'>
            <Container width='100%' justify='space-evenly' wrap='wrap'>
                {companies?.map(everyCompany => (
                    <LinkRouter className='cardCompany link' to={'/nueva/color'} onClick={creatingPlate} key={everyCompany._id} id={everyCompany._id}>
                        <div className={everyCompany.nameCompany}>
                            <div className='mask'>
                                <h1 className='titleCard'>{everyCompany.nameCompany}</h1>
                            </div>
                        </div>
                    </LinkRouter>
                ))}
            </Container>
        </Container>
    )

}