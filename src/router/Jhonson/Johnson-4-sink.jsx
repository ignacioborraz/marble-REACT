import { useEffect,useState,useRef } from 'react'
import { useParams,Link as LinkRouter } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

import './johnson-4-sink.css'

import Button from '../../components/Button/Button'
import AccesoryCheck from '../../components/AccesoryCheck/AccesoryCheck'
import j_accesoryActions from '../../store/jhonson-2-acc/actions'
const { read_accesories } = j_accesoryActions

export default function JSink() {

    const { token } = useSelector(store => store.auth)
    const { types } = useSelector(store => store.types)
    const { jhonson } = useParams()
    const { acc } = useParams()
    const [reload, setReload] = useState(false)
    const code_acc = useRef()
    const dispatch = useDispatch()
    console.log(jhonson)
    console.log(types)
    const instalation = types?.find(e => e._id === jhonson)
    console.log(instalation)
    
/*     useEffect(() => {
        let code = code_acc.current?.value || ""
        dispatch(read_accesories({ code,token }))       
        // eslint-disable-next-line
    }, [reload,codes]) */

    return (
        <div className='acc-container' >
            <h2>SOLICITUD</h2>
{/*             <input ref={code_acc} onChange={()=>setReload(!reload)} className='acc-input' type="text" placeholder='Buscar por codigo' />
            <LinkRouter to={`/j/${code}/a/${codes?.join(',')}`} className='acc-button'><Button icon={next} color='true' /></LinkRouter>
        {(accesories && accesories.length > 0) ?
            <div className='acc-box'>
                {accesories?.map(type => <AccesoryCheck key={type._id} data={type} />)}
            </div>
            : <h2 className='acc-h'>no hay resultados</h2>
        } */}
    </div>
    )

}