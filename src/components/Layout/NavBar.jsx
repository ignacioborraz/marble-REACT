import { useState } from 'react'
import { Link as LinkRouter, useNavigate } from 'react-router-dom'

import './layout.css'
import logo_portaro from '../../media/logo_portaro.png'
import logo from '../../media/logo.png'
import Button from '../Button/Button'

import { useSelector, useDispatch } from 'react-redux'
import authActions from './../../store/auth/actions'
const { cerrar_sesion } = authActions

const hamburgerIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAAXNSR0IArs4c6QAAAI9JREFUWEftllEKwCAMQ+PJtqPsJttuPvyeFJ4otJCCf1HrMwabklZL2pfcGL0ZEzMxSoDqS3rslHTQk07o39GciNgj6Z7YiE4Z9lCysUtSH7urW+ZXJc2/m1S4volR/BEx5xh9lWkD1jlGr5I+pKV65xjF6RwLiPk/Ru3k/xglNtQ7xyhGEzMxSoDq03rsA2K0DCfODRjvAAAAAElFTkSuQmCC"
const userIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAAXNSR0IArs4c6QAAAb1JREFUWEftmIEtBFEQhr+rABWgAjpABagAHVABKkEFqAAVoAMlUAH5k13Z29t3O/PvuWwuJrmc5N7b+e5/82b+M2GkMRkpFysNtg8cAruV+p/AA/AI6G8rhii2DtwDAusKQZ1VkGk4F2wLeAUE1xeCu+1b1P7cBXsDdhLJDoDnxHqr+E+Bm0ySCkpw4XAUU2Gr2LOxDXxENzlgKuq1aILGutRxOmDfBpS2pC6BAzZaxXT1TwzVNjIN11FMDfUpCXYH6DaHwwHTwzM386saV+EbqQQumDq+GmZfkxWUFFZDToULVie5Ai4LGV+AcwdqiGJNFql3BGh+1qGjTqvUfOhQxVLHk1m8smAyh/PG03umdw05St0wNVe9N2uq75RUc3qpn4UiepSCkNUpudVQsspdXERcbQRMMLLQEbcaBdRY01AvRh+YM34WAjcPLOProzDtddeAmvRMzAPTyNlzMyb2dTrbEthfHmGbudN5lMBcz5UQ6nepjKe82lSUwGRRNp0s5p7jdgspgbm+3uRi5hJ0gWnM6Ff2MiMEtszCr798CEz9K+XPFyCtWtPUvxD6Ov8CcnqP+AfL6jZaxX4Av05CJyhsS4sAAAAASUVORK5CYII="
    
let options = [
    { to: '/usuario', name: 'nuevo' },
    { to: '/', name: 'salir' }
]

export default function NavBar() {

    const { is_online,nick,photo,token } = useSelector(store => store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [anchorElUser, setAnchorElUser] = useState(null)

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null)

    async function signout(event) {
        await dispatch(cerrar_sesion(token))
            .then(navigate("/ingresar", { replace: true }))
    }

    return (
        <div className='navbar-container'>
            <Button icon={hamburgerIcon} />
            <LinkRouter to={`/index`}>
                <img className='navbar-img' src={logo_portaro} alt="logo"/>
                <img className='navbar-img-mobile' src={logo} alt="logo"/>
            </LinkRouter>
            <Button icon={userIcon} options={options} extra={signout} />
        </div>
    )
}