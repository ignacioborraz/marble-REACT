import { Link as LinkRouter } from 'react-router-dom'

import './co01Tipo.css'

import SquareIcon from '@mui/icons-material/Square'
import HexagonIcon from '@mui/icons-material/Hexagon'
import TokenIcon from '@mui/icons-material/Token'
import InventoryIcon from '@mui/icons-material/Inventory'

export default function Co01Tipo() {
    return (
        <div className='types-container'>
            <div className='types-box'>
                <LinkRouter className='types-link' to={'/stocks/internal'}>
                    <HexagonIcon className='types-icon' />
                    <h2>INTERNOS</h2>
                </LinkRouter>
                <LinkRouter className='types-link' to={'/stocks/note'}>
                    <TokenIcon className='types-icon' />
                    <h2>PEDIDOS</h2>
                </LinkRouter>
            </div>
            <div className='types-box'>
                <LinkRouter className='types-link' to={'/stocks/done'}>
                    <SquareIcon className='types-icon' />
                    <h2>ENTREGADOS</h2>
                </LinkRouter>
                <LinkRouter className='types-link' to={'/all/sinks'}>
                    <InventoryIcon className='types-icon' />
                    <h2>STOCK</h2>
                </LinkRouter>
            </div>
        </div>        
    )

}