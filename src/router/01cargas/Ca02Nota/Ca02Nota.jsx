import { useParams } from 'react-router-dom'
import { Link as LinkRouter } from 'react-router-dom'

import './ca02Nota.css'

import HexagonIcon from '@mui/icons-material/Hexagon'
import TokenIcon from '@mui/icons-material/Token'

export default function Ca02Nota() {
    const { type } = useParams()
    return (
        <div className='type-container' >
            <div className='type-box' >
                <LinkRouter className='type-link' to={`/new/${type}/intern`}>
                    <HexagonIcon className='type-icon' />
                    <h2>INTERNOS</h2>
                </LinkRouter>
                <LinkRouter className='type-link' to={`/new/${type}/note`}>
                    <TokenIcon className='type-icon' />
                    <h2>PEDIDOS</h2>
                </LinkRouter>
            </div>
        </div>        
    )
}