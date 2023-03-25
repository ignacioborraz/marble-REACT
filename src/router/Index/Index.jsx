import { Link as LinkRouter } from 'react-router-dom'

import './index.css'

import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle'
import InventoryIcon from '@mui/icons-material/Inventory'
import LayersIcon from '@mui/icons-material/Layers'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'

export default function Index() {
    return (
        <div className='index-container'>
            <div className='index-box'>
                <LinkRouter className='index-link' to={'/new'}>
                    <PlaylistAddCircleIcon className='index-icon' />
                    <h2>CARGAR</h2>
                </LinkRouter>
                <LinkRouter className='index-link' to={'/editPlate'}>
                    <LayersIcon className='index-icon' />
                    <h2>RECORTAR</h2>
                </LinkRouter>
            </div>
            <div className='index-box'>
                <LinkRouter className='index-link' to={'/johnson'}>
                    <AccessibilityNewIcon className='index-icon' />
                    <h2>USUARIOS</h2>
                </LinkRouter>
                <LinkRouter className='index-link' to={'/stocks'}>
                    <InventoryIcon className='index-icon' />
                    <h2>CONSULTAR</h2>
                </LinkRouter>
            </div>
        </div>
    )

}