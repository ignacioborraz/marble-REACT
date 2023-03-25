import { useEffect,useState,useRef } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../../url'

import logo_j from '../../../../media/logo_j.png'

import './jh01formulario.css'

import InputCheck from '../../../../components/InputCheck/InputCheck'
import j_accesoryActions from '../../../../store/jhonson-2-acc/actions'
import j_typeActions from '../../../../store/jhonson-1-type/actions'
import alertActions from '../../../../store/alert/actions'
import ModalAccesories from './../../../../components/ModalAccesories/ModalAccesories'
const { read_accesories } = j_accesoryActions
const { read_types,read_one_type } = j_typeActions
const { open } = alertActions

export default function Jh01formulario() {

    const { A304,A430,jhonsons } = useSelector(store => store.jhonsons)
    const { accesories } = useSelector(store => store.accesories)
    const { token } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    /**
     * @note is the number of the note
     */
    const [note,setNote] = useState(1)
    /**
     * @clients shows all clients
     */
    const [clients,setClients] = useState([])
    /**
     * @client is the selected client
     */
    const [client,setClient] = useState('')
    /**
     * @maxStock is the max stock of the selected sink
     */
    const [maxStock,setMaxStock] = useState(1)
    /**
     * @type is the selected type of sink
     */
    const [type, setType] = useState("")
    /**
     * @checks_instalation is the selected instalation
     */
    const checks_instalation = useRef(null)
    /**
     * @quantity is de quantity of sinks
     */
    const quantity = useRef(1)
    /**
     * @ksink is the id of the selected sink
     * @photo_j is the photo of the selected sink
     * @instTypes is the types of instalation
     */
    const [ksink, setKsink] = useState("")
    const [photo_j, setPhoto_j] = useState(logo_j)
    const [instTypes,setInstTypes] = useState([])
    /**
     * @modal is the boolean that handle de modal
     */
    const [modal,setModal] = useState(false)
    /**
     * @currentAccesories are the selected accesories
     */
    const [currentAccesories,setCurrentAccesories] = useState([])
    /**
    /**
     * @comments is the comment of the admin
     */
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
        axios.get(`${apiUrl}note/next`,headers).then(res => setNote(res.data.response.note))
        axios.get(`${apiUrl}clients`,headers).then(res => setClients(res.data.response.clients))
        // eslint-disable-next-line
    }, [type])

    async function selectJhonson(event) {
        let one = jhonsons.find(each => each._id === event.target.value)
        setKsink(event.target.value)
        setPhoto_j(one.photo)
        setInstTypes(one.instalation)
        setMaxStock(one.stock)
        quantity.current.value = 1
    }

    async function create() {
        let selected_instalation = []
        if (checks_instalation.current) {
            selected_instalation = Object.values(checks_instalation?.current)?.filter(each=> each.checked)?.map(each => each.value)
            if (selected_instalation.length===0) {
                selected_instalation = [Object.values(checks_instalation?.current)[0].value]
            }    
        }
        if (ksink && client) {
            let request = {
                number_code: String(note),
                internal: false,
                client,
                comments: comments.current.value,
                accesory: currentAccesories.map(each=>each._id),
                instalation: selected_instalation,
                stock: Number(quantity.current?.value),
                ksink
            }
            try {
                let headers = {headers: {'Authorization': `Bearer ${token}`}}
                let response = await axios.post(`${apiUrl}note`,request,headers)
                if (response.data.response===true) {
                    let data = 'solicitud creada'
                    let navigation = {
                        isConfirmed: `/add-plate/${note}`,
                        isDenied: `/add-jhonson/${note}`,
                        else: "/index"
                    }
                    dispatch(open({ data,success:true,options:'redirect',navigation,id_code:note }))
                } else {
                    let data = response.data.response
                    let navigation = {
                        isConfirmed: `/add-plate/${note}`,
                        isDenied: `/add-jhonson/${note}`,
                        else: "/index"
                    }
                    dispatch(open({ data,success:false,options:'redirect',navigation,id_code:note }))
                }

                
            } catch(error) {
                console.log(error)
                let data = 'error'
                dispatch(open({ data,success:false }))
            }
        } else {
                let data = 'complete todos los campos'
                dispatch(open({ data,success:false }))
        }
    }    

    return (
        <div className='jhonson-container'>
            <div className='jhonson-middle jh-form'>
                <span className="jhonson-note jhonson-size">NOTA DE PEDIDO: P-{note.toString().padStart(8,'0')}</span>
                <form className='jhonson-jhonson'>
                    <select className="jhonson-size" defaultValue="" name="client" onChange={event=> setClient(event.target.value)}>
                        <option disabled value="">seleccionar cliente</option>
                        {clients.map(each=><option key={each._id} value={each._id}>{each.name}</option>)}
                    </select>
                    <select className="jhonson-size" defaultValue="" name="type" onChange={event=> setType(event.target.value)}>
                        <option disabled value="">seleccionar acero</option>
                        <option value="A304">A304</option>
                        <option value="A430">A430</option>
                    </select>
                    <div className='jhonson-size'>
                        <input className="jhonson-span jhonson-size-1" type="number" ref={quantity} name="stock" id="stock" min="1" defaultValue='1' max={maxStock} />
                        <select className="jhonson-size-2" defaultValue="" name="code" onChange={selectJhonson}>
                            <option disabled value="">seleccionar pileta</option>
                            {jhonsons?.map((each,index) => <option key={index} value={each._id}>{each.name} - {each.x}×{each.y}×{each.z}</option>)}
                        </select>
                    </div>
                </form>
                {(instTypes.length > 0) ? (
                    <form ref={checks_instalation} className='jhonson-size jhonson-checks'>
                        {instTypes?.map(each => <InputCheck key={each} each={each} />)}
                    </form>
                ) : (
                    <p className='jhonson-size jhonson-checks'>
                        seleccionar instalacion
                    </p>
                )}
                {currentAccesories.length ? (
                    <span onClick={()=>setModal(!modal)} className='jhonson-size jhonson-checks j-accs'>{currentAccesories.length} accesorios</span>
                ) : (
                    <span onClick={()=>setModal(!modal)} className='jhonson-size jhonson-checks j-accs'>seleccionar accesorios</span>
                )}
                {modal && <ModalAccesories currentAccesories={currentAccesories} setCurrentAccesories={setCurrentAccesories} modal={modal} setModal={setModal} />}
                <input className="jhonson-span jhonson-size" type="text" ref={comments} name="comment" id="comment" placeholder='comentario' />
                <div className='jhonson-buttons'>
                    <button onClick={create} className='jhonson-button-1'>agregar!</button>
                    <button onClick={()=>navigate(-1)} className='jhonson-button-2'>cancelar</button>
                </div>
            </div>
            <img className='jhonson-middle jh-img' src={photo_j} alt="photo_j" />
        </div>
    )

}