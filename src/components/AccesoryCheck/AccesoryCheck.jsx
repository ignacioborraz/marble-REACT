import { useState } from 'react'
import { useDispatch } from 'react-redux'

import './accesoryCheck.css'

import j_accesoryActions from '../../store/jhonson-2-acc/actions'
const { capture_accesories } = j_accesoryActions

const AccesoryCheck = ({ data }) => {

    const [check, setCheck] = useState(false)
    const dispatch = useDispatch()

    const handleCheck = (event) => {
        setCheck(!check)
        let boolean = event.target.className.slice(16,21).trim()
        if (boolean === "true") {
            boolean = false
        } else {
            boolean = true
        }
        let checkAcc = {
            code: data._id,
            status: boolean
        }
        dispatch(capture_accesories(checkAcc))
    }

    return (
        <div onClick={handleCheck} className='check-link' to={`/johnson/acce/${data._id}`} key={data._id} id={data._id}>
            <h2 className='check-h'>{data.code}</h2>
            <img src={data.photo} alt={data._id} className={`check-img check-${check}`} id={data._id} />
        </div>
    )
    
}

export default AccesoryCheck