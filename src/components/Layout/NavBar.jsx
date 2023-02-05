import { Link as LinkRouter, useNavigate } from 'react-router-dom'

import './layout.css'
import logo_portaro from '../../media/logo_portaro.png'
import logo from '../../media/logo.png'
import Button from '../Button/Button'

import { useSelector, useDispatch } from 'react-redux'
import authActions from './../../store/auth/actions'
const { cerrar_sesion } = authActions
    
let options = [
    { to: '/usuario', name: 'nuevo' },
    { to: '/', name: 'salir' }
]

export default function NavBar() {

    const { photo,token } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function signout(event) {
        await dispatch(cerrar_sesion(token))
            .then(navigate("/ingresar", { replace: true }))
    }

    return (
        <div className='navbar-container'>
            <LinkRouter to={`/index`}>
                <img className='navbar-img' src={logo_portaro} alt="logo"/>
                <img className='navbar-img-mobile' src={logo} alt="logo"/>
            </LinkRouter>
            <Button icon={photo} options={options} extra={signout} />
        </div>
    )
}