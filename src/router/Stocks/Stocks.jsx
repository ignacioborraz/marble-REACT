import { useEffect,useRef,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams,useNavigate } from 'react-router-dom'
import j_codeActions from '../../store/jhonson-3-sink/actions'

import './stocks.css'

import CardCodes from './../../components/CardCodes/CardCodes'

export default function Stocks() {

    const { type } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { get_stocks } = j_codeActions
    const { token } = useSelector(store => store.auth)
    const { all } = useSelector(store => store.codes)
    const [reload,setReload] = useState(false)
    const text = useRef()
<<<<<<< HEAD
    
    useEffect(() => {
        //console.log(text?.current.value)
        //console.log(isNaN(text?.current.value))
=======
    const done = useRef()
    
    useEffect(() => {
        console.log(text?.current.value)
        console.log(isNaN(text?.current.value))
>>>>>>> a2272dc2261b82ebfb7a687ba122c16f1216b8ff
        let note = ''
        let comments = ''
        if (isNaN(text?.current.value)) {
            comments = text?.current.value
        } else {
            note = text?.current.value
        }
        dispatch(get_stocks({
            token,
            type,
            note,
<<<<<<< HEAD
            comments
=======
            comments,
            done: done?.current?.checked || false
>>>>>>> a2272dc2261b82ebfb7a687ba122c16f1216b8ff
        }))
        // eslint-disable-next-line
    }, [reload])

    return (
        <div className='stock-container'>
            <div className='stock-inputs'>
                <input type="text" className='stock-size' placeholder='buscar' ref={text} onChange={()=>setReload(!reload)} />
<<<<<<< HEAD
            </div>
            <div className='stock-box'>
                {all.length>0 ? (
                    all?.map(each=> <CardCodes key={each.number_code} products={each.products} client={each.client} id={each.number_code} />)
=======
                {type==='note' && (
                    <div className='stock-checkbox'>
                        <label className='stock-label' htmlFor="done">entregados</label>
                        <input type="checkbox" name="done" id="done" ref={done} onChange={()=>setReload(!reload)} />
                    </div>
                )}
            </div>
            <div className='stock-box'>
                {all.length>0 ? (
                    all?.map(each=> <CardCodes key={each._id} internal={each.internal} note={each.note} stock={each.stock} comments={each.comments} id={each._id} />)
>>>>>>> a2272dc2261b82ebfb7a687ba122c16f1216b8ff
                ) : (
                    <div className='stock-nobox'>
                        <h3>solicitud sin stock o no existente</h3>
                        <button onClick={()=> navigate(-1)} className='stock-button-back'>volver</button>
                    </div>
                )}
            </div>
        </div>
    )

}