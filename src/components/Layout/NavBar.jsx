import { useState } from 'react'
import { Link as LinkRouter, useNavigate } from 'react-router-dom'

import './layout.css'
import logo_portaro from '../../media/logo_portaro.png'
import logo from '../../media/logo.png'
import Button from '../Button/Button'

import { useSelector, useDispatch } from 'react-redux'
import authActions from './../../store/auth/actions'
const { cerrar_sesion } = authActions

const arrow = "data:image/png;base64,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"
    
let options = [
    { to: '/usuario', name: 'nuevo' },
    { to: '/', name: 'salir' }
]

export default function NavBar() {

    const { photo,token } = useSelector(store => store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [anchorElUser, setAnchorElUser] = useState(null)

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null)

    async function signout(event) {
        await dispatch(cerrar_sesion(token))
            .then(navigate("/ingresar", { replace: true }))
    }

    const back = () => navigate(-1)

    let prev = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAAAAXNSR0IArs4c6QAAA3xJREFUeF7t3MvLTVEYx/Hv6xZCSkkZKJEMDBQTAwYkkYmRSzFAuUQUhYiQS24lTCSXECN/gBFT8Q/4L1zm+mXt2u95z3nPWeusvddelzV533rX3uc8n/fZ+zx7Xc4EpVkJTFj1Lp0pYJZJUMAKmKWAZfeSYQVsisBRYBfwFXgO/LY0mtQ95QxbDXwE1tci/gZsA365oqUKdgq4C8zrA3MduFrA/gssB16ZLBpkoktzSwGD/cBTYPEQjO/AhpzBBPQC2DMiQtZgO4CXwLIRsdQtS7D5wH3guAVU1TU7sI3AB2ClA1ZWGTYLuAZcAGY6YmUDthZ411OEupolfUmqsD4D3ALmugr1HJcsmIrQ98BmT1BJ3/QPAY+BRZ6xkruHLTF11e4GoJLLMBWhr4GlDWIlkWELgEfAkYahksiwTebGvqIlrGgzbDZwAzgPzGgRK0qwdaYI1c8QLZo6TJl0zmTWnBBS5jWjANM9SkWo7lmhW+fBDptPwYWhpbqeYaqnVFepvupS62SGqVLXSKgq9661ToGpCH0C6Fmwq60zYBpVeAO0WYS6/FOCg6lEuA2chSiWTwUFU/Gp6XiNiMbSgoFdNCOhsUBV7zMImC6/h7FJharD9Ijz1+MYe9vurWfYKuBn21F6fL3WwZRhfwYsJfIYV2Onah1MkewF3o45odqYyJATBwHTewoxWuoDORiY3nzb4/HRg1UBtDXjkwyYAmljTjEpsCqYJmetkwRTUE2ti0gWTIE1sfImabAqOI1kaEQj1LRaL3LQsmLU/7gmbrWZYNzVg6O+3nT9ogCrAhh3fWp2YApYK6AfAMd8RO9wjqgyrB6fyxp7B58ph0QLpkhsd3FkD1YBHDDTc8P2CRWwmoCKXc2Ub/WhMs05or4k+8V1GrjT4ABlcmBC7Leb1lfiJQkmHG2VuQJcMr8XsBEFVOxq24yyzkdLNsPqONo2cw846WE5QhZgFZ4+QTX5YrOhNMqHbx+XUnUO1WrPgH2OJ80qw+pG2uOtvd62xW62YMLTpalL1KbYzRqsyrgT5kNBIyHDWgEzQtoDrr3gKkOmawWsR+ey2TwxCO0zsH1YGg76e6rfvaMvKNI8Qr9iV08PNwvYVAEVu9orrsV/VfsEHDSrj5zMUs2wOsYaYCfwBfjhpFQ7KAewcY0mHV/ALDkLWAGzFLDsXjLMEuwfN1yFTfavIaUAAAAASUVORK5CYII="

    return (
        <div className='navbar-container'>
            <Button icon={prev} onClick={back} />
            <LinkRouter to={`/index`}>
                <img className='navbar-img' src={logo_portaro} alt="logo"/>
                <img className='navbar-img-mobile' src={logo} alt="logo"/>
            </LinkRouter>
            <Button icon={photo} options={options} extra={signout} />
        </div>
    )
}