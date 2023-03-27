import { useEffect } from 'react'
import { useParams,useNavigate,Link as Anchor } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import j_codeActions from '../../../store/jhonson-4-notes/actions'

import './co03Detalle.css'

import CardSink from '../../../components/CardSink/CardSink'
import CardPlate from '../../../components/CardPlate/CardPlate'

export default function Co03Detalle() {

    const { id_code } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { get_products } = j_codeActions
    const { token } = useSelector(store => store.auth)
    const { sinks,plates } = useSelector(store => store.notes)

    useEffect(() => {
        dispatch(get_products({token,id_code}))
        // eslint-disable-next-line
    }, [id_code])

    //console.log({sinks,plates})
    return (
        <div className='co-det-container'>    
            {plates?.map(each=> <CardPlate key={each._id} data={each} />)}
            {sinks.length ? (
                <>
                    <div className='co-det-head'>
                        <h3 className='co-det-headers fs w-40'>CANT</h3>
                        <h3 className='co-det-headers fs w-40'>FOTO</h3>
                        <h3 className='co-det-headers fs w-80'>CODIGO</h3>
                        <h3 className='co-det-headers fs w-80'>INSTALACION</h3>
                        <h3 className='co-det-headers fs w-80 w-full'>ACCESORIOS</h3>
                        <h3 className='co-det-headers fs w-20'>EE</h3>
                    </div>
                    {sinks?.map(each=> <CardSink key={each._id} data={each} />)}
                </>
            ) : (
                <>
                    <h3 className='co-det-title'>sin stock o inexistente</h3>
                    <button onClick={()=> navigate('/stocks')} className='co-det-button'>volver</button>
                </>
            )}
            {(sinks.length>0 || plates.length>0) && (
                <div className='co-det-buttons'>
                    <Anchor to={`/add-plates/${id_code}`} className='co-det-button-1'>+placa</Anchor>
                    <Anchor to={`/add-jhonsons/${id_code}`} className='co-det-button-2'>+pileta</Anchor>
                    <Anchor to={'/stocks'} className='co-det-button-3'>volver</Anchor>
                </div>
            )}
        </div>
    )

}