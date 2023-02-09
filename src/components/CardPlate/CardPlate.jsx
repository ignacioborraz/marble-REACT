import { useEffect,useState,useRef } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../url'

import logo_j from '../../media/logo_j.png'

import './cardPlate.css'

import AccesoryCheck from '../../components/AccesoryCheck/AccesoryCheck'
import InputCheck from '../../components/InputCheck/InputCheck'
import j_accesoryActions from '../../store/jhonson-2-acc/actions'
import j_typeActions from '../../store/jhonson-1-type/actions'
import alertActions from '../../store/alert/actions'
const { read_accesories } = j_accesoryActions
const { read_types,read_one_type } = j_typeActions
const { open } = alertActions

export default function CardSink({ data }) {
    const { stock,sink } = data
    //console.log(data)
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
        if (checks_j.current) { selected_instalation = Object.values(checks_j.current).filter(each=> each.checked).map(each => each.value) }
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
                let response_code = await axios.post(`${apiUrl}code`,{ stock: [id_stock], [note_ja]: data_internal || data_note },headers)
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
        <>
            <div className='ts-container'>
                <p className='ts-data ts-stock'>{stock}</p>
                <img className='ts-data ts-img' src={sink?.jhonson.photo} alt="photo" />
                <p className='ts-data ts-code'>{sink?.jhonson.code}</p>
                <p className='ts-data ts-inst'></p>
                {/* <p>{sink.accesories}</p> */}
                <p className='ts-data ts-acc'>accesorios</p>
            </div>
        </>
    )

}