import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Alert from '../../components/Alert/Alert'
import KeyIcon from '@mui/icons-material/Key'
import WorkIcon from '@mui/icons-material/Work'

import './signIn.css'
import authActions from '../../store/auth/actions'
import alertActions from './../../store/alert/actions';
const { iniciar_sesion } = authActions
const { open } = alertActions

export default function SignIn() {

	const dispatch = useDispatch()
	
    const nick = useRef("")
	const password = useRef("")
    
    const navigate = useNavigate()
    
    async function handleLogin(event) {
        event.preventDefault()
        let data = {
            nick: nick.current.value.trim(),
            password: password.current.value.trim()
        }
        try {
            let response = await dispatch(iniciar_sesion(data))
            if (response.payload.success) {
                navigate("/index",{ replace:true })
            } else {
                let data = response.payload.response
                dispatch(open({ data,success:false }))
            }
        } catch(error) {
            let data = error.data.response
            dispatch(open({ data,success:false }))
        }
    }

    return (
        <>
            <img src="https://images.unsplash.com/photo-1554755229-ca4470e07232?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80" alt="fondo_rojo" className="signin-img" />
            <div className='form-container'>
                <form onSubmit={handleLogin}>
                    <fieldset className='signin-fset'>
                        <label className='signin-label' htmlFor='nick'>
                            <WorkIcon sx={{ width: '40px', height: '40px', padding: '5px', color: '#C82832', backgroundColor: 'white', borderRadius: '5px' }} />
                        </label>
                        <input name='nick' id='nick' placeholder='Usuario' type="text" className='signin-input' ref={nick} required/>
                    </fieldset>
                    <fieldset className='signin-fset'>
                        <label className='signin-label' htmlFor='pass'>
                            <KeyIcon sx={{ width: '40px', height: '40px', padding: '5px', color: '#C82832', backgroundColor: 'white', borderRadius: '5px' }} />
                        </label>
                        <input name='pass' id='pass' placeholder='Contraseña' type="password" className='signin-input' ref={password} required/>            
                    </fieldset>
                    <input type="submit" className='signin-button' required value='INGRESAR' />
                </form>
            </div>
            <Alert />
        </>
    )
}