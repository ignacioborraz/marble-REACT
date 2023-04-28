import React from 'react'
import { Link as Anchor } from 'react-router-dom'

import LayersIcon from '@mui/icons-material/Layers'
import WashIcon from '@mui/icons-material/Wash'
import StockInternAcc from '../StockInternAccs/StockInternAcc'

import './stockIntern.css'

export default function StockIntern() {
  return (
    <div className='stock-intern-box'>
        <p className="stock-intern-option">Cargar Stock:</p>
        <div className='stock-intern-panel'>
            <Anchor to={'/intern/plate'} id='plate' className='stock-intern-button-1'>
                <LayersIcon />
            </Anchor>
            <Anchor to={'/intern/ksink'} id='ksink' className='stock-intern-button-2'>
                <WashIcon />
            </Anchor>
            <StockInternAcc />
        </div>
    </div>
  )
}
