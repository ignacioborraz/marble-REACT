import { useEffect,useState,useRef } from 'react'
import { useParams,useNavigate,Link as LinkRouter } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

import './johnson-3-accesory.css'

import AccesoryCheck from './../../components/AccesoryCheck/AccesoryCheck'
import j_accesoryActions from '../../store/jhonson-2-acc/actions'
const { read_accesories } = j_accesoryActions

export default function JAccesory() {

    const { token } = useSelector(store => store.auth)
    const { accesories,codes } = useSelector(store => store.accesories)
    const { code } = useParams()
    const [reload, setReload] = useState(false)
    const code_acc = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()    
    console.log(codes)
    useEffect(() => {
        let code = code_acc.current?.value || ""
        dispatch(read_accesories({ code,token }))
        // eslint-disable-next-line
    }, [reload])

/*     const addAccesory = (id) => {
        if (accesorysAdd.includes(id)) {
            console.log("ya esta en la lista")
            //setAccesorysAdd(accesorysAdd.filter(x => x !== id))
        }
        else {
            //setAccesorysAdd([...accesorysAdd, id])
            console.log("agregado")
        }

    } */

    return (
        <div className='acc-container' >
        <h2>ACCESORIOS</h2>
        <input ref={code_acc} onChange={()=>setReload(!reload)} className='acc-input' type="text" placeholder='Buscar por codigo' />
        {(accesories && accesories.length > 0) ?
            <div className='acc-box'>
                {accesories?.map(type => <AccesoryCheck key={type._id} data={type} />)}
            </div>
            : <h2 className='acc-h'>no hay resultados</h2>
        }
    </div>
    )

}