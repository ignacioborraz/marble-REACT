import { useEffect,useState,useRef,useParams } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../../url'

import logo_j from '../../../../media/logo_j.png'

import './jh01interno.css'

import InputCheck from '../../../../components/InputCheck/InputCheck'
import j_accesoryActions from '../../../../store/jhonson-2-acc/actions'
import j_typeActions from '../../../../store/jhonson-1-type/actions'
import alertActions from '../../../../store/alert/actions'
import ModalAccesories from '../../../../components/ModalAccesories/ModalAccesories'
import FormKsink from '../../../../components/FormKsinks/FormKsink'

const { read_accesories } = j_accesoryActions
const { read_types,read_one_type } = j_typeActions
const { open } = alertActions

export default function Jh01interno() {

    const { new_int } = useParams()
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
     * @type is the selected type of sink
     */
    const [type, setType] = useState("")
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
        axios.get(`${apiUrl}note/next`,headers).then(res => setNote(res.data.response.internal))
        // eslint-disable-next-line
    }, [type])

    async function selectJhonson(event) {
        let one = jhonsons.find(each => each._id === event.target.value)
        setKsink(event.target.value)
        setPhoto_j(one.photo)
        quantity.current.value = 1
    }

    async function create() {
        if ('ksink') {
            let request = {
                number_code: String(note),
                internal: true,
                comments: comments.current.value,
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
                <span className="jhonson-note jhonson-size">STOCK INTERNO: I-{note.toString().padStart(8,'0')}</span>
                {new_int==='ksink' && <FormKsink setType={setType} quantity={quantity} selectJhonson={selectJhonson} jhonsons={jhonsons} />}
                
                {/* {currentAccesories.length ? (
                    <span onClick={()=>setModal(!modal)} className='jhonson-size jhonson-checks j-accs'>{currentAccesories.length} accesorios</span>
                ) : (
                    <span onClick={()=>setModal(!modal)} className='jhonson-size jhonson-checks j-accs'>seleccionar accesorios</span>
                )}
                {modal && <ModalAccesories currentAccesories={currentAccesories} setCurrentAccesories={setCurrentAccesories} modal={modal} setModal={setModal} />} */}
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