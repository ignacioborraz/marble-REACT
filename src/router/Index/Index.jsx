import { Link as LinkRouter } from 'react-router-dom'

import './index.css'

import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle'
import InventoryIcon from '@mui/icons-material/Inventory'
import LayersIcon from '@mui/icons-material/Layers'
import WashIcon from '@mui/icons-material/Wash'

export default function Index() {
    return (
        <div className='index-container' >
            <div className='index-box' >
                <LinkRouter className='index-link' to={'/nueva'}>
                    <PlaylistAddCircleIcon className='index-icon' />
                    <h2>NUEVA PLACA</h2>
                </LinkRouter>
                <LinkRouter className='index-link' to={'/editPlate'}>
                    <LayersIcon className='index-icon' />
                    <h2>USAR PLACA</h2>
                </LinkRouter>
            </div>
            <div className='index-box' >
                <LinkRouter className='index-link' to={'/johnson'}>
                    <WashIcon className='index-icon' />
                    <h2>JOHNSON</h2>
                </LinkRouter>
                <LinkRouter className='index-link' to={'/stocks'}>
                    <InventoryIcon className='index-icon' />
                    <h2>STOCK</h2>
                </LinkRouter>
            </div>
        </div>
    )

}