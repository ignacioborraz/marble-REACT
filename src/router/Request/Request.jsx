import { useEffect } from 'react'
import { useParams,useNavigate,Link as Anchor } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import j_codeActions from '../../store/jhonson-3-sink/actions'

import './request.css'

import CardSink from '../../components/CardSink/CardSink'
import CardPlate from '../../components/CardPlate/CardPlate'

export default function Request() {

    const { id_code } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { get_products } = j_codeActions
    const { token } = useSelector(store => store.auth)
    const { sinks,plates } = useSelector(store => store.codes)

    useEffect(() => {
        dispatch(get_products({token,id_code}))
        // eslint-disable-next-line
    }, [])

    //console.log({sinks,plates})
    return (
        <div className='req-container'>    
            {plates?.map(each=> <CardPlate key={each._id} data={each} />)}
            {sinks.length>0 ? (
                <div className='req-head'>
                    <h3 className='req-headers req-q'>CANT</h3>
                    <h3 className='req-headers req-p'>FOTO</h3>
                    <h3 className='req-headers req-c'>CODIGO</h3>
                    <h3 className='req-headers req-i'>INSTALACION</h3>
                    <h3 className='req-headers req-a'>ACCESORIOS</h3>
                    <h3 className='req-headers req-q'>ACCION</h3>
                </div>
            ) : (
                <>
                    <h3>solicitud sin stock o no existente</h3>
                    <button onClick={()=> navigate(-1)} className='req-button-back'>volver</button>
                </>
            )}
            {sinks?.map(each=> <CardSink key={each._id} data={each} />)}
            {(sinks.length>0 || plates.length>0) && (
                <div className='req-buttons'>
                    <Anchor to={`/add-plates/${id_code}`} className='req-button-1'>+placa</Anchor>
                    <Anchor to={`/add-jhonsons/${id_code}`} className='req-button-2'>+pileta</Anchor>
                    <Anchor to={'/index'} className='req-button-3'>listo!</Anchor>
                </div>
            )}
        </div>
    )

}