import { useEffect,useState,useRef } from 'react'
import { useParams,Link as LinkRouter} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

import './johnson-2-model.css'

import j_typeActions from '../../store/jhonson-1-type/actions'
const { read_types } = j_typeActions

export default function JModel() {
    
    const { token } = useSelector(store => store.auth)
    const { types } = useSelector(store => store.types)
    const { type } = useParams()
    const [reload,setReload] = useState(false)
    const code = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(read_types({ type,code:code.current.value,token }))
        // eslint-disable-next-line
    }, [])
        
    return (
        <div className='model-container' >
            <h2>{type}</h2>
            <input ref={code} onChange={()=>setReload(!reload)} className='model-input' type="text" placeholder='Buscar por codigo' />
            {(types && types.length > 0) ?
                <div className='model-box'>
                    {types?.map(type => (
                        <LinkRouter className='model-link' to={`/johnson/acce/${type._id}`} key={type._id} id={type._id}>
                            <h2 className='model-h'>{type.code}</h2>
                            <img src={type.photo} alt={type._id} className='model-img' id={type._id} />
                            <h2 className='model-h'>{type.x} x {type.y} × {type.z} </h2>
                        </LinkRouter>
                    ))}
                </div>
                : <h2 className='model-h'>no hay resultados</h2>
            }
        </div>
    )

}