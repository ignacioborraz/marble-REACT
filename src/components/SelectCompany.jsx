import {useRef,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import WorkIcon from '@mui/icons-material/Work'

import Container from './Container'
import StyledIcon from './StyledIcon'

import companyActions from '../redux/actions/companyActions'

export default function SelectCompany({allInputs,label}) {

    const input = useRef()
    const dispatch = useDispatch()
    let id='company'
    
    useEffect( () => {
        dispatch(companyActions.getCompanies())
    },[])

    const companies = useSelector(store => store.companyReducer.companies)
    //console.log(companies)

    function toAdd(event) {
        //console.log(input)
        allInputs[id] = input.current?.value
        //console.log(allInputs)
    }

    return (
        <Container width='100%' color='rgb(224,224,224)' bgColor='rgb(2,0,3)' paddding='2px' margin='2px'>
            {label && <label htmlFor={id}><StyledIcon><WorkIcon /></StyledIcon></label>}
            <select defaultValue="" name={id} id={id} className='inputForm' onChange={toAdd} ref={input} required>
                <option disabled value="">select company</option>
                {companies.map(everyCompany => <option key={everyCompany._id} value={everyCompany._id}>{everyCompany.nameCompany}</option>)}
            </select>
        </Container>
    )

}