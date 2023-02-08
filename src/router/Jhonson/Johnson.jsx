import { useEffect,useState,useRef } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../url'

import logo_j from '../../media/logo_j.png'

import './johnson.css'

import AccesoryCheck from '../../components/AccesoryCheck/AccesoryCheck'
import InputCheck from '../../components/InputCheck/InputCheck'
import j_accesoryActions from '../../store/jhonson-2-acc/actions'
import j_typeActions from '../../store/jhonson-1-type/actions'
import alertActions from './../../store/alert/actions'
const { read_accesories } = j_accesoryActions
const { read_types,read_one_type } = j_typeActions
const { open } = alertActions

export default function Jhonson() {

    const { A304,A430,jhonsons } = useSelector(store => store.jhonsons)
    const { accesories } = useSelector(store => store.accesories)
    const { token } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [reload, setReload] = useState(false)
    const [data_note,setData_note] = useState(1)
    const [data_internal,setData_internal] = useState(1)
    const [viewAccs,setViewAccs] = useState(true)
    const [quantity,setQuantity] = useState(0)
    const [openModal,setOpenModal] = useState(false)
    const [close_modal,setClose_modal] = useState(true)
    const [note_ja,setNote_ja] = useState(null)
    const [type, setType] = useState("")
    const [id_j, setId_j] = useState("")
    const [photo_j, setPhoto_j] = useState(logo_j)
    const [inst_j,setInst_j] = useState([])
    const stock_ja = useRef()
    const checks_j = useRef()
    const checks_a = useRef()
    const ref_code_acc = useRef()
    const comments = useRef()

    useEffect(() => {
        if (A304.length === 0 || A430.length === 0) {
            dispatch(read_types({ token }))
        }
        if (accesories.length === 0) {
            dispatch(read_accesories({ token }))
        }
        if (type) {
            dispatch(read_one_type({ type }))
        }
        let headers = {headers: {'Authorization': `Bearer ${token}`}}
        axios.get(`${apiUrl}code/next`,headers).then(res => {
            setData_internal(res.data.response.codes.internal)
            setData_note(res.data.response.codes.note)
        })
        // eslint-disable-next-line
    }, [type,reload])

    async function selectJhonson(event) {
        let one = jhonsons.find(each => each._id === event.target.value)
        setId_j(event.target.value)
        setPhoto_j(one.photo)
        setInst_j(one.instalation)
    }

    function modal() {
        setOpenModal(!openModal)
        setViewAccs(!viewAccs)
    }

    function totalAccs() {
        setQuantity(Object.values(checks_a?.current).filter(each=> each.checked).map(each => each.id).length)
    }

    async function create() {
        let stock = ""
        let selected_instalation = []
        let selected_accesories = []
        if (stock_ja.current) { stock = Number(stock_ja.current.value) }
        if (checks_j.current) {
            selected_instalation = Object.values(checks_j.current).filter(each=> each.checked).map(each => each.value)
            if (selected_instalation.length===0) {
                selected_instalation = Object.values(checks_j.current)[0].value
            }
        }
        if (checks_a.current) { selected_accesories = Object.values(checks_a?.current).filter(each=> each.checked).map(each => each.id) }
        try {
            let headers = {headers: {'Authorization': `Bearer ${token}`}}
            let sink = {
                jhonson: id_j,
                accesories: selected_accesories,
                instalation: selected_instalation
            }
            if (id_j && selected_instalation.length > 0 && stock) {
                let response_sink = await axios.post(`${apiUrl}sink`,sink,headers)
                let id_sink = response_sink.data.response
                let response_stock = await axios.post(`${apiUrl}stock`,{ stock, sink: id_sink },headers)
                let id_stock = response_stock.data.response
                let response_code = await axios.post(`${apiUrl}code`,{ stock: [id_stock], [note_ja]: data_internal || data_note, comments: comments?.current.value },headers)
                let id_code = response_code.data.response
                let data = 'solicitud creada'
                let navigation = {
                    isConfirmed: `/add-plate/${id_code}`,
                    isDenied: `/add-jhonson/${id_code}`,
                    else: "/index"
                }
                dispatch(open({ data,success:true,options:'redirect',navigation,id_code }))
                /* redirigir hacia el detalle del pedido en la alerta*/
            } else {
                let data = 'complete todos los campos'
                dispatch(open({ data,success:false }))
            }
        } catch(error) {
            console.log(error)
            let data = 'error'
            dispatch(open({ data,success:false }))
        }
    }    

    return (
        <div className='jhonson-container'>
            <div className='jhonson-container-button'>
                <form className='jhonson-jhonson'>
                    <div className='jhonson-size'>
                        <span className="jhonson-span jhonson-size-1">{note_ja === "internal" ? data_internal : (note_ja === "note" ? data_note : 'seleccionar')}</span>
                        <select defaultValue="" name="note" onChange={event=> setNote_ja(event.target.value)} className="jhonson-size-2" >
                            <option disabled value="">tipo de nota</option>
                            <option value="internal">interna</option>
                            <option value="note">pedido</option>
                        </select>
                    </div>
                    <select className="jhonson-size" defaultValue="" name="type" onChange={event=> setType(event.target.value)}>
                        <option disabled value="">seleccionar acero</option>
                        <option value="A304">A304</option>
                        <option value="A430">A430</option>
                    </select>
                    <div className='jhonson-size'>
                        <input className="jhonson-span jhonson-size-1" type="number" ref={stock_ja} name="stock" id="stock" min="1" defaultValue="1" />
                        <select className="jhonson-size-2" defaultValue="" name="code" onChange={selectJhonson}>
                            <option disabled value="">seleccionar pileta</option>
                            {jhonsons?.map((each,index) => <option key={index} value={each._id}>{each.code} - {each.x}×{each.y}×{each.z}</option>)}
                        </select>
                    </div>
                </form>
                {(inst_j.length > 0) ? (
                    <form ref={checks_j} className='jhonson-size jhonson-checks'>
                        {inst_j?.map(each => <InputCheck key={each} each={each} />)}
                    </form>
                ) : (
                    <p className='jhonson-size jhonson-checks'>
                        seleccionar instalacion
                    </p>
                )}
                {viewAccs && <div onClick={modal} className='jhonson-size jhonson-checks j-accs'>accesorios</div>}
                {openModal && (
                    <>
                        <div className={`accesory-form modal-${close_modal}`}>
                            <div className='acc-form'>
                                <p className='acc-options'>{quantity} accesorios</p>
                                <input ref={ref_code_acc} onChange={()=>setReload(!reload)} className='acc-options' type="text" placeholder='Buscar por codigo' />
                                <p onClick={(()=>setClose_modal(!close_modal))} className='acc-options a-opt'>finalizar</p>
                            </div>                            
                            <form ref={checks_a} onChange={totalAccs} className='accesory-form-box'>
                                {accesories?.map(accesory => <AccesoryCheck key={accesory._id} data={accesory} modal={close_modal} inputText={ref_code_acc.current?.value || ""} />)}
                            </form>
                        </div>
                        {!close_modal && <p className='jhonson-size jhonson-checks j-accs' onClick={(()=>setClose_modal(!close_modal))}>{quantity} accesorios</p>}
                    </>
                )}
                <input className="jhonson-span jhonson-size" type="text" ref={comments} name="comment" id="comment" placeholder='comentario' />
                <div className='jhonson-buttons'>
                    <button onClick={create} className='jhonson-button-1'>agregar!</button>
                    <button onClick={()=>navigate(-1)} className='jhonson-button-2'>cancelar</button>
                </div>
            </div>
            <img className='jhonson-img' src={photo_j} alt="photo_j" />
        </div>
    )

}