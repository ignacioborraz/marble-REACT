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
    
    useEffect(() => {
        //console.log(text?.current.value)
        //console.log(isNaN(text?.current.value))
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
            comments
        }))
        // eslint-disable-next-line
    }, [reload])

    return (
        <div className='stock-container'>
            <div className='stock-inputs'>
                <input type="text" className='stock-size' placeholder='buscar' ref={text} onChange={()=>setReload(!reload)} />
            </div>
            <div className='stock-box'>
                {all.length>0 ? (
                    all?.map(each=> <CardCodes key={each.number_code} products={each.products} client={each.client} id={each.number_code} />)
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