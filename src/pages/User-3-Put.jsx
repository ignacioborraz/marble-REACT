import {useNavigate,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {useRef,useEffect, useState} from 'react'
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

export default function PutUser() {
    const {id} = useParams()    
    const dispatch = useDispatch()
    const [reload,setReload] = useState(false)
    const nick = useRef()
    const pass = useRef()
    const navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('token')!== null) {
            let token = localStorage.getItem("token")
            dispatch(userActions.getUser(id,token))
        }
    },[reload])
    
    const user = useSelector(store => store.userReducer.user.user)
    async function handleEdition(event) {
        event.preventDefault()
        let allInputs = {}
        if (nick.current.value) {
            allInputs['nick'] = nick.current.value.trim()
        }
        if (pass.current.value) {
            allInputs['password'] = pass.current.value.trim()
        }
        if (event.target[6].id) {
            allInputs['photo'] = event.target[6].id
        }
        if(localStorage.getItem('token')!== null) {
            let token = localStorage.getItem("token")
            dispatch(userActions.putUser(id,token,allInputs))
            navigate('/',{replace:true})
        }
    }

    return (
            <div className='form-container'>
                <h3 className='new-form new-title'>EDITAR USUARIO</h3>
                <form onSubmit={handleEdition} className='new-form'>
                    <fieldset className='input-container'>
                        <label className='inputLabel' htmlFor='nick'><WorkIcon sx={{
                            width: '40px',
                            height: '40px',
                            padding: '5px',
                            backgroundColor: '#C82832',
                            color: 'white',
                            borderRadius: '5px'}} /></label>
                        <input name='nick' id='nick' placeholder={user.nick} type="text" className='inputForm' ref={nick} />
                    </fieldset>
                    <fieldset className='input-container'>
                        <label className='inputLabel' htmlFor='pass'><KeyIcon sx={{
                            width: '40px',
                            height: '40px',
                            padding: '5px',
                            backgroundColor: '#C82832',
                            color: 'white',
                            borderRadius: '5px'}} /></label>
                        <input name='pass' id='pass' placeholder='nueva contraseña' type="text" className='inputForm' ref={pass} />            
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
                    <input type="submit" className='buttonForm' required value='EDITAR' />
                </form>
            </div>
    )
    
}