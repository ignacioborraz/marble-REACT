import { useParams } from 'react-router-dom'
import { Link as LinkRouter } from 'react-router-dom'

import './us01Rol.css'

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'

export default function Ca02Nota() {
    const { type } = useParams()
    return (
        <div className='role-container' >
            <div className='role-box' >
                <LinkRouter className='role-link' to={`/admin`}>
                    <SupervisedUserCircleIcon className='role-icon' />
                    <h2>ADMINISTRADOR</h2>
                </LinkRouter>
                <LinkRouter className='role-link' to={`/client`}>
                    <InsertEmoticonIcon className='role-icon' />
                    <h2>CLIENTE</h2>
                </LinkRouter>
            </div>
        </div>        
    )
}