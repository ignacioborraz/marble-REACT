import { Link as LinkRouter } from 'react-router-dom'

import './johnson-1-type.css'

import HexagonIcon from '@mui/icons-material/Hexagon'

export default function JType() {
    return (
        <div className='type-container' >
            <div className='type-box' >
                <LinkRouter className='type-link' to={'/johnson/type/A304'}>
                    <HexagonIcon className='type-icon' />
                    <h2>A304</h2>
                </LinkRouter>
                <LinkRouter className='type-link' to={'/johnson/type/A430'}>
                    <HexagonIcon className='type-icon' />
                    <h2>A430</h2>
                </LinkRouter>
            </div>
        </div>        
    )

}