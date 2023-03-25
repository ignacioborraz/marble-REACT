import { Link as LinkRouter } from 'react-router-dom'

import './ca01Tipo.css'

import LayersIcon from '@mui/icons-material/Layers'
import WashIcon from '@mui/icons-material/Wash'

export default function Ca01Tipo() {
    return (
        <div className='type-container' >
            <div className='type-box' >
                <LinkRouter className='type-link' to={'/new/plates'}>
                    <LayersIcon className='type-icon' />
                    <h2>PLACAS</h2>
                </LinkRouter>
                <LinkRouter className='type-link' to={'/new/jhonson'}>
                    <WashIcon className='type-icon' />
                    <h2>JHONSON</h2>
                </LinkRouter>
            </div>
        </div>        
    )

}