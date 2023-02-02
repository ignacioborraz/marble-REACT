import { useEffect,useState,useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

import './johnson-2-model.css'

import CardJhonson from './../../components/CardJhonson/CardJhonson'
import j_typeActions from '../../store/jhonson-1-type/actions'
const { read_types,filter_types } = j_typeActions

export default function JModel() {
    
    const { token } = useSelector(store => store.auth)
    const types = useSelector(store => store.types)
    const { type } = useParams()
    const [reload,setReload] = useState(false)
    const code = useRef(types[`code_${type}`])
    const dispatch = useDispatch()
    console.log(types)

    useEffect(() => {
        if (types[`sinks_${type}`].length===0) {
            dispatch(read_types({ type,token }))
        }        
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        dispatch(filter_types({ type,code:code.current.value,token }))
        // eslint-disable-next-line
    }, [reload])
        
    return (
        <div className='model-container' >
            <h2>{type}</h2>
            <input ref={code} onChange={()=>setReload(!reload)} className='model-input' type="text" placeholder='Buscar por codigo' defaultValue={types[`code_${type}`]} />
            <div className='model-box'>
                {(types[`filtered_${type}`]) ? (
                        (types[`filtered_${type}`]).map((type,index) => <CardJhonson type={type} key={index} />)
                            ) : (
                        <h2 className='model-h'>no hay resultados</h2>
                    )
                }
            </div>
        </div>
    )

}