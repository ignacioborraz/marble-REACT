import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useRef} from 'react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import KeyIcon from '@mui/icons-material/Key'
import WorkIcon from '@mui/icons-material/Work'
import userActions from '../redux/actions/userActions'
import FileUpload from '../components/FileUpload'
import { initializeApp } from "firebase/app";

initializeApp({
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTH,
    projectId: process.env.REACT_APP_PROYECT,
    storageBucket: process.env.REACT_APP_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASURE
})

export default function NewUser({role}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const nick = useRef()
    const pass = useRef()
    let allInputs = {}
    async function handleCreation(event) {
        console.log(event.target[6])
        event.preventDefault()
        allInputs = {
            nick: nick.current.value.trim(),
            password: pass.current.value.trim(),
            photo: event.target[6].id,
            role: role
        }
        console.log(allInputs)
        let res = await dispatch(userActions.signUp(allInputs))
        if (res.data.success) {
            try {
                navigate("/",{replace:true})
            } catch(error) {
                console.log(error)
            }
        } else {
            console.log(res)
            return allInputs
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
                        <input name='nick' id='nick' placeholder='Usuario' type="text" className='inputForm' ref={nick} required/>
                    </fieldset>
                    <fieldset className='input-container'>
                        <label className='inputLabel' htmlFor='pass'><KeyIcon sx={{
                            width: '40px',
                            height: '40px',
                            padding: '5px',
                            backgroundColor: '#C82832',
                            color: 'white',
                            borderRadius: '5px'}} /></label>
                        <input name='pass' id='pass' placeholder='Contraseña' type="password" className='inputForm' ref={pass} required/>            
                    </fieldset>
                    <fieldset className='input-container'>
                        <label className='inputLabel' htmlFor='photo'><AddAPhotoIcon sx={{
                            width: '40px',
                            height: '40px',
                            padding: '5px',
                            backgroundColor: '#C82832',
                            color: 'white',
                            borderRadius: '5px'}} /></label>
                        <FileUpload name='photo' id='photo' type="text" required/>
                    </fieldset>
                    <input type="submit" className='buttonForm' required value='REGISTRAR' />
                </form>
            </div>
    )
    
}