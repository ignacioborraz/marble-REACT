import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useRef} from 'react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import KeyIcon from '@mui/icons-material/Key'
import WorkIcon from '@mui/icons-material/Work'

import userActions from '../redux/actions/userActions'

export default function NewUser() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const nick = useRef()
    const pass = useRef()
    const photo = useRef()
    //const role = useRef()
    let allInputs = {}
    
    async function handleCreation(event) {
        event.preventDefault()
        allInputs = {
            nick: nick.current.value.trim(),
            password: pass.current.value.trim(),
            photo: photo.current.value.trim(),
            role: 'admin'
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
            <form onSubmit={handleCreation} className='newForm'>
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
                    <input name='pass' id='pass' placeholder='Contraseña' type="text" className='inputForm' ref={pass} required/>            
                </fieldset>
                <fieldset className='input-container'>
                    <label className='inputLabel' htmlFor='photo'><AddAPhotoIcon sx={{
                        width: '40px',
                        height: '40px',
                        padding: '5px',
                        color: '#C82832',
                        backgroundColor: 'rgb(230,230,230)',
                        borderRadius: '5px'}} /></label>
                    <input name='photo' id='photo' placeholder='Foto' type="text" className='inputForm' ref={photo} required/>
                </fieldset>
                <input type="submit" className='buttonForm' required value='registrar!' />
            </form>
        </div>
    )
    
}