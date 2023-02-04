import { useEffect,useState,useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios'
import apiUrl from '../../url'

import logo_j from '../../media/logo_j.png'

import './jhonsonAdd.css'

import AccesoryCheck from '../../components/AccesoryCheck/AccesoryCheck'
import InputCheck from '../../components/InputCheck/InputCheck'
import j_accesoryActions from '../../store/jhonson-2-acc/actions'
import j_typeActions from '../../store/jhonson-1-type/actions'
import alertActions from '../../store/alert/actions'
const { read_accesories } = j_accesoryActions
const { read_types,read_one_type } = j_typeActions
const { open } = alertActions

export default function JhonsonAdd() {

    const { id_code } = useParams()
    const { A304,A430,jhonsons } = useSelector(store => store.jhonsons)
    const { accesories } = useSelector(store => store.accesories)
    const { token } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const [reload, setReload] = useState(false)
    const [viewAccs,setViewAccs] = useState(true)
    const [quantity,setQuantity] = useState(0)
    const [openModal,setOpenModal] = useState(false)
    const [close_modal,setClose_modal] = useState(true)
    const [type, setType] = useState("")
    const [id_j, setId_j] = useState("")
    const [photo_j, setPhoto_j] = useState(logo_j)
    const [inst_j,setInst_j] = useState([])
    const stock_ja = useRef()
    const checks_j = useRef()
    const checks_a = useRef()
    const ref_code_acc = useRef()

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
        if (checks_j.current) { selected_instalation = Object.values(checks_j.current).filter(each=> each.checked).map(each => each.value) }
        if (checks_a.current) { selected_accesories = Object.values(checks_a?.current).filter(each=> each.checked).map(each => each.id) }
        try {
            let headers = {headers: {'Authorization': `Bearer ${token}`}}
            let sink = {
                jhonson: id_j,
                accesories: selected_accesories,
                instalation: selected_instalation
            }
            if (id_j && selected_instalation.length > 0 && stock && id_code) {
                let response_sink = await axios.post(`${apiUrl}sink`,sink,headers)
                let id_sink = response_sink.data.response
                let response_stock = await axios.post(`${apiUrl}stock`,{ stock, sink: id_sink },headers)
                let id_stock = response_stock.data.response
                await axios.put(`${apiUrl}code/${id_code}`,{ stock: id_stock },headers)
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
        }
    }    

    return (
        <div className='add-container'>
            <div>
                <form className='add-form'>
                    <select defaultValue="" name="type" onChange={event=> setType(event.target.value)} className="add-select" >
                        <option disabled value="">seleccione acero</option>
                        <option value="A304">A304</option>
                        <option value="A430">A430</option>
                    </select>
                    <input type="number" ref={stock_ja} name="stock" id="stock" min="1" defaultValue="1" className="add-select add-s-1" />
                    <select defaultValue="" name="code" onChange={selectJhonson} className="add-select add-s-2" >
                        <option disabled value="">seleccionar pileta</option>
                        {jhonsons?.map((each,index) => <option key={index} value={each._id}>{each.code} - {each.x}×{each.y}×{each.z}</option>)}
                    </select>
                </form>
                {(inst_j.length > 0) ? (
                    <form ref={checks_j} className='add-checks'>
                        {inst_j?.map(each => <InputCheck key={each} each={each} />)}
                    </form>
                ) : (
                    <p className='add-checks'>
                        seleccionar instalacion
                    </p>
                )}
                {viewAccs && <div onClick={modal} className='add-checks j-accs'>accesorios</div>}
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
                        {!close_modal && <p className='add-checks j-accs' onClick={(()=>setClose_modal(!close_modal))}>{quantity} accesorios</p>}
                    </>
                )}
                
                <button onClick={create} className='add-select jhonson-button'>agregar!</button>
            </div>
            <img className='add-img' src={photo_j} alt="photo_j" />
        </div>
    )

}