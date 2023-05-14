import { useEffect,useRef,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams,useNavigate } from 'react-router-dom'
import j_codeActions from '../../../store/jhonson-4-notes/actions'

import './co02Nota.css'

import CardCodes from '../../../components/CardCodes/CardCodes'

export default function Stocks() {

    const { type } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { get_stocks } = j_codeActions
    const { token } = useSelector(store => store.auth)
    const { all } = useSelector(store => store.notes)
    const [reload,setReload] = useState(false)
    const text = useRef()
    
    useEffect(() => {
        dispatch(get_stocks({
            token,
            type,
            comments: text?.current.value,
        }))
        // eslint-disable-next-line
    }, [reload])

    return (
        <>
            <div className='co-note-inputs'>
                <input type="text" className='co-note-size' placeholder='buscar' ref={text} onChange={()=>setReload(!reload)} />
                <button onClick={()=> navigate(-1)} className='co-note-button'>volver</button>
            </div>
            <div className='co-note-container'>
                {all.length ? (
                    <div className='co-note-box'>
                        {/* {console.log(all)} */}
                        {all.map(each=> <CardCodes id_client={each.id_client} key={each.number_code} products={each.products} client={each.client} id={each.number_code} />)}
                    </div>
                ) : (
                    <div className='co-note-nobox'>
                        <h3 className='co-note-title'>sin stock o inexistente</h3>
                    </div>
                )}
            </div>
        </>
    )

}