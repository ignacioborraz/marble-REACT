import { useParams } from 'react-router-dom'
import StockIntern from '../../../components/StockIntern/StockIntern'

import './ca02Interna.css'

export default function Ca02Interna() {

    const { code } = useParams()

    return (
        <div className='intern-container'>
            <div className='intern-middle'>
                <span className="intern-size">NOTA INTERNA: I-{code.toString().padStart(8,'0')}</span>
                <StockIntern />
            </div>
        </div>
    )
}