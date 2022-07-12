import {useRef} from 'react'

import PersonIcon from '@mui/icons-material/Person'

import Container from './Container'
import StyledIcon from './StyledIcon'

export default function SelectRole({allInputs,label}) {

    const input = useRef()
    let id='role'

    const roles = ['admin','owner','user']

    function toAdd(event) {
        //console.log(input)
        allInputs[id] = input.current?.value
        //console.log(allInputs)
    }

    return (
        <Container width='100%' color='rgb(224,224,224)' bgColor='rgb(2,0,3)' paddding='2px' margin='2px'>
            {label && <label htmlFor={id}><StyledIcon><PersonIcon /></StyledIcon></label>}
            <select defaultValue="" name={id} id={id} className='inputForm' onChange={toAdd} ref={input} required>
                <option disabled value="">select role</option>
                {roles.map((everyRole,index) => <option key={index} value={everyRole}>{everyRole}</option>)}
            </select>
        </Container>
    )

}