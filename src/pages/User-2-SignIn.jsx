import {useDispatch} from 'react-redux'
import {useRef} from 'react'
import {useNavigate} from 'react-router-dom'

import KeyIcon from '@mui/icons-material/Key'
import WorkIcon from '@mui/icons-material/Work'

import userActions from '../redux/actions/userActions'

export default function SignIn() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const nick = useRef()
    const pass = useRef()

    let allInputs = {}
    
    async function handleLogin(event) {
        event.preventDefault()
        allInputs = {
            nick: nick.current.value.trim(),
            password: pass.current.value.trim()
        }
        console.log(allInputs)
        try {
            await dispatch(userActions.signIn(allInputs))
                .then(navigate("/",{replace:true}))
        } catch(error) {
            console.error(error)
            return allInputs //debo returnarlos para no perder los datos
        }
    }

    return (
        <div className='form-container'>
            <form onSubmit={handleLogin} className='newForm'>
                <fieldset className='input-container'>
                    <label className='inputLabel' htmlFor='nick'><WorkIcon sx={{
                        width: '40px',
                        height: '40px',
                        padding: '5px',
                        color: '#C82832',
                        backgroundColor: 'rgb(230,230,230)',
                        borderRadius: '5px'}} /></label>
                    <input name='nick' id='nick' placeholder='Nick' type="text" className='inputForm' ref={nick} required/>
                </fieldset>
                <fieldset className='input-container'>
                    <label className='inputLabel' htmlFor='pass'><KeyIcon sx={{
                        width: '40px',
                        height: '40px',
                        padding: '5px',
                        color: '#C82832',
                        backgroundColor: 'rgb(230,230,230)',
                        borderRadius: '5px'}} /></label>
                    <input name='pass' id='pass' placeholder='Contraseña' type="password" className='inputForm' ref={pass} required/>            
                </fieldset>
                <input type="submit" className='buttonForm' required value='INGRESAR' />
            </form>
        </div>
    )
    
}