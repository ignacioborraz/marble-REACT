import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import StoreIcon from '@mui/icons-material/Store'
import WorkIcon from '@mui/icons-material/Work'
import './us03Client.css'
import axios from 'axios'
import apiUrl from '../../../url'
import Swal from 'sweetalert2'

export default function Us03Client({role}) {

    const navigate = useNavigate()
    const { token } = useSelector(store=>store.auth)
    const nick = useRef()
    const company = useRef()
    
    async function handleCreation(event) {
        event.preventDefault()
        let data = {
            name: nick.current.value.trim(),
            company: company.current.value.trim()
        }
        let headers = {headers: {'Authorization': `Bearer ${token}`}}
        try {
            Swal.fire({ title: 'CONFIRMAR?',showConfirmButton: true })
                .then(response => {
                    let res
                    if (response.isConfirmed) {
                        res = axios.post(apiUrl+'clients',data,headers)
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
                        <input name='nick' id='nick' placeholder='Cliente' type="text" className='inputForm' ref={nick} />
                    </fieldset>
                    <fieldset className='input-container'>
                        <label className='inputLabel' htmlFor='company'><StoreIcon sx={{
                            width: '40px',
                            height: '40px',
                            padding: '5px',
                            backgroundColor: '#C82832',
                            color: 'white',
                            borderRadius: '5px'}} /></label>
                        <input name='company' id='company' placeholder='Empresa' type="Empresa" className='inputForm' ref={company} />            
                    </fieldset>
                    <input type="submit" className='buttonForm' value='REGISTRAR' />
                </form>
            </div>
    )
    
}