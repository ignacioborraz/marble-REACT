import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import j_codeActions from '../../store/jhonson-3-sink/actions'

import './request.css'

import CardSink from '../CardSink/CardSink'
import CardPlate from '../CardPlate/CardPlate'

export default function Request() {

    const { id_code } = useParams()
    const dispatch = useDispatch()
    const { get_sinks } = j_codeActions
    const { token } = useSelector(store => store.auth)
    const { sinks,plates } = useSelector(store => store.codes)

    useEffect(() => {
        dispatch(get_sinks({token,id_code}))
        // eslint-disable-next-line
    }, [])

    //console.log({sinks,plates})
    return (
        <div className='req-container'>    
                {plates?.map(each=> <CardPlate key={each._id} data={each} />)}
            {sinks.length>0 && (
                <div className='req-head'>
                    <h3 className='req-headers req-q'>CANT</h3>
                    <h3 className='req-headers req-p'>FOTO</h3>
                    <h3 className='req-headers req-c'>CODIGO</h3>
                    <h3 className='req-headers req-i'>INSTALACION</h3>
                    <h3 className='req-headers req-a'>ACCESORIOS</h3>
                    <h3 className='req-headers req-q'>ED-EL</h3>
                </div>
            )}
                {sinks?.map(each=> <CardSink key={each._id} id_code={id_code} data={each} />)}
        </div>
    )

}