import { useEffect } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import companyActions from '../redux/actions/companyActions'
import Container from '../components/Container'

export default function SelectCompany() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(companyActions.getCompanies())
        // eslint-disable-next-line
    }, [])

    const companies = useSelector(store => store.companyReducer.companies)
    console.log("🚀 ~ file: New-1-Company.jsx ~ line 16 ~ SelectCompany ~ companies", companies)

    function creatingPlate(event) {
        let plate = { company: event.target.id }
        localStorage.setItem('plate', JSON.stringify(plate))
        console.log(JSON.parse(localStorage.getItem('plate')))
    }

    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)'>
            <Container width='100%' justify='space-evenly' wrap='wrap'>
                {companies?.map(everyCompany => (
                    <LinkRouter className='cardCompany link' to={'/nueva/' + everyCompany._id} onClick={creatingPlate} key={everyCompany._id} id={everyCompany._id}>
                        <div className={everyCompany.nameCompany}>
                            <div className='mask'>
                                <h1 className='titleCard'>{everyCompany.nameCompany}</h1>
                            </div>
                        </div>


                        {/* <img src={everyCompany.logoCompany} alt={everyCompany._id} className='fit' id={everyCompany._id} /> */}
                    </LinkRouter>
                ))}
            </Container>
        </Container>
    )

}