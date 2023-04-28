import { useState } from 'react'
import ModalAccesory from '../ModalAccesory/ModalAccesory'
import ShowerIcon from '@mui/icons-material/Shower'

import './stock.css'

export default function StockInternAcc() {

    const [selected,setSelected] = useState(null)
    const [modal,setModal] = useState(false)

    return (
        <>
        {selected ? (
            <span onClick={()=>setModal(!modal)} className='jhonson-size jhonson-checks j-accs'>{selected.name}</span>
        ) : (
            <ShowerIcon id='accesory' className='stock-intern-button-3' onClick={()=>setModal(true)} />
        )}
        {modal && <ModalAccesory selected={selected} setSelected={setSelected} modal={modal} setModal={setModal} />}
        </>
    )
}