import { Link as LinkRouter } from 'react-router-dom'

import './co01Tipo.css'

import SquareIcon from '@mui/icons-material/Square'
import HexagonIcon from '@mui/icons-material/Hexagon'
import TokenIcon from '@mui/icons-material/Token'

export default function Co01Tipo() {
    return (
        <div className='type-container' >
            <div className='type-box' >
                <LinkRouter className='type-link' to={'/stocks/internal'}>
                    <HexagonIcon className='type-icon' />
                    <h2>INTERNOS</h2>
                </LinkRouter>
                <LinkRouter className='type-link' to={'/stocks/note'}>
                    <TokenIcon className='type-icon' />
                    <h2>PEDIDOS</h2>
                </LinkRouter>
                <LinkRouter className='type-link' to={'/stocks/done'}>
                    <SquareIcon className='type-icon' />
                    <h2>ENTREGADOS</h2>
                </LinkRouter>
            </div>
        </div>        
    )

}