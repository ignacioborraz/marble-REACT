import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import KeyIcon from '@mui/icons-material/Key'
import WorkIcon from '@mui/icons-material/Work'
import FileUpload from '../../../components/FileUpload'
import { initializeApp } from "firebase/app"
import './us02Admin.css'
import axios from 'axios'
import apiUrl from '../../../url'
import Swal from 'sweetalert2'

initializeApp({
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTH,
    projectId: process.env.REACT_APP_PROYECT,
    storageBucket: process.env.REACT_APP_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASURE
})

export default function Us02Admin({role}) {

    const navigate = useNavigate()
    const { token } = useSelector(store=>store.auth)
    const nick = useRef()
    const pass = useRef()
    
    async function handleCreation(event) {
        event.preventDefault()
        console.log(event.target[6].id)
        let data = {
            nick: nick.current.value.trim(),
            password: pass.current.value.trim(),
            photo: await event.target[6].id,
            admin: true,
            online: false
        }
        let headers = {headers: {'Authorization': `Bearer ${token}`}}
        try {
            Swal.fire({ title: 'CONFIRMAR?',showConfirmButton: true })
                .then(response => {
                    let res
                    if (response.isConfirmed) {
                        res = axios.post(apiUrl+'auth/signup',data,headers)
                    }
                    return res
                })
                .then(res => navigate("/",{ replace:true }))
                .catch(error => {
                    let errors = error.response.data.response.map(each=>`<p>${each}</p>`)
                    Swal.fire({ html: errors.join('') })
                })
        } catch(error) {
            console.log(error)
            Swal.fire({ title: 'OCURRIO UN ERROR', text: 'intente más tarde' })
        }
    }
    return (
            <div className='form-container'>
                <h3 className='new-form new-title'>NUEVO {role.toUpperCase()}</h3>
                <form onSubmit={handleCreation} className='new-form'>
                    <fieldset className='input-container'>
                        <label className='inputLabel' htmlFor='nick'><WorkIcon sx={{
                            width: '40px',
                            height: '40px',
                            padding: '5px',
                            backgroundColor: '#C82832',
                            color: 'white',
                            borderRadius: '5px'}} /></label>
                        <input name='nick' id='nick' placeholder='Administrador' type="text" className='inputForm' ref={nick} />
                    </fieldset>
                    <fieldset className='input-container'>
                        <label className='inputLabel' htmlFor='pass'><KeyIcon sx={{
                            width: '40px',
                            height: '40px',
                            padding: '5px',
                            backgroundColor: '#C82832',
                            color: 'white',
                            borderRadius: '5px'}} /></label>
                        <input name='pass' id='pass' placeholder='Contraseña' type="password" className='inputForm' ref={pass} />            
                    </fieldset>
                    <fieldset className='input-container uploadBox'>
                        <label className='inputLabel' htmlFor='photo'><AddAPhotoIcon sx={{
                            width: '40px',
                            height: '40px',
                            padding: '5px',
                            backgroundColor: '#C82832',
                            color: 'white',
                            borderRadius: '5px'}} /></label>
                        <FileUpload name='photo' id='photo' type="text" />
                    </fieldset>
                    <input type="submit" className='buttonForm' value='REGISTRAR' />
                </form>
            </div>
    )
    
}