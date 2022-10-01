import React, {useEffect} from 'react'
import {Link as LinkRouter} from 'react-router-dom'
import Container from '../components/Container'
import Text from '../components/Text'
import {useDispatch,useSelector} from 'react-redux'
import companyActions from '../redux/actions/companyActions'

export default function GetCompanies() {
    const dispatch = useDispatch()
    useEffect( () => {
        dispatch(companyActions.getCompanies())
    },[])
    const companies = useSelector(store => store.companyReducer.companies)

    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)' padding='20px 0'>
            {companies.map(everyCompany => (
                everyCompany.nameCompany!=='non' &&
                <Container  key={everyCompany._id} direction='column' margin='0 10px 20px 10px'>
                    <Text variant='h5' width='280px' padding='10px' bgColor='rgb(204,21,23)' color='rgb(224,224,224)' font='Paytone One'>
                        {everyCompany.nameCompany}</Text>
                    <img src={everyCompany.logoCompany} alt={everyCompany.nameCompany} className="list" />
                    <LinkRouter to={`/detailCompany/${everyCompany._id}`}>
                        <Text width='280px' padding='10px' bgColor='rgb(25,25,25)'color='rgb(224,224,224)'  hover='rgb(204,21,23)'  font='Paytone One'>
                            +info</Text>
                    </LinkRouter>
                </Container >
            ))}
        </Container >
    )

}