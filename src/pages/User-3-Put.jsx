import {useNavigate,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {useRef,useEffect, useState} from 'react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import KeyIcon from '@mui/icons-material/Key'
import WorkIcon from '@mui/icons-material/Work'

import userActions from '../redux/actions/userActions'

export default function PutUser() {

    const {id} = useParams()    
    const dispatch = useDispatch()
    const [reload,setReload] = useState(false)
    const nick = useRef()
    const pass = useRef()
    const photo = useRef()

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
        if (photo.current.value) {
            allInputs['photo'] = photo.current.value.trim()
        }
        if(localStorage.getItem('token')!== null) {
            let token = localStorage.getItem("token")
            dispatch(userActions.putUser(id,token,allInputs))
            nick.current.value = ""
            pass.current.value = ""
            photo.current.value = ""
            setReload(!reload)
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
                        <input name='photo' id='photo' placeholder={user.photo} type="text" className='inputForm' ref={photo} />
                    </fieldset>
                    <input type="submit" className='buttonForm' required value='EDITAR' />
                </form>
            </div>
    )
    
}