import { useEffect,useState,useRef } from 'react'
import { useParams,Link as LinkRouter } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import logo_j from '../../media/logo_j.png'

import './johnson.css'

import Button from '../../components/Button/Button'
import AccesoryCheck from '../../components/AccesoryCheck/AccesoryCheck'
import j_accesoryActions from '../../store/jhonson-2-acc/actions'
import j_typeActions from '../../store/jhonson-1-type/actions'
const { read_accesories } = j_accesoryActions
const { read_types,read_one_type } = j_typeActions

export default function Jhonson() {

    const { A304,A430,jhonsons } = useSelector(store => store.jhonsons)
    const { accesories } = useSelector(store => store.accesories)
    const { token } = useSelector(store => store.auth)
    const dispatch = useDispatch() 
    const [type, setType] = useState("")
    const [id_j, setId_j] = useState("")
    const [photo_j, setPhoto_j] = useState(logo_j)
    const [xyz_j, setXyz_j] = useState("")
    const [inst_j,setInst_j] = useState([])
    const [id_acc, setId_acc] = useState([])
    const [photo_acc, setPhoto_acc] = useState([""])
    const [inst, setInst] = useState([])

    //const [reload, setReload] = useState(false)
    //const code_acc = useRef()
    
/*     useEffect(() => {
        let code = code_acc.current?.value || ""
        dispatch(read_accesories({ code,token }))       
        // eslint-disable-next-line
    }, [reload,codes]) */

    //const code = useRef(types[`code_${type}`])

    useEffect(() => {
        if (A304.length === 0 || A430.length === 0) {
            dispatch(read_types({ token }))
        }
        if (accesories.length === 0) {
            dispatch(read_accesories({ token }))
        }
        console.log('cambio',type)
        if (type) {
            dispatch(read_one_type({ type }))
        }
        // eslint-disable-next-line
    }, [type])

    async function selectJhonson(event) {
        let one = jhonsons.find(each => each._id === event.target.value)
        setId_j(event.target.value)
        setPhoto_j(one.photo)
        setXyz_j(`${one.x}×${one.y}×${one.z}`)
        setInst_j(one.instalation)
    }

    async function selectAcc(event) {
        let one = accesories.find(each => each._id === event.target.value)
        setId_acc(event.target.value)
        setPhoto_acc(one.photo)
    }

    console.log(type, id_j , inst , id_acc)

    return (
        <div className='jhonson-container'>
            <form className='jhonson-form' onSubmit={console.log('ok')}>
                <select defaultValue="" name="type" onChange={event=> setType(event.target.value)} className="jhonson-select" >
                    <option disabled value="">select</option>
                    <option value="A304">A304</option>
                    <option value="A430">A430</option>
                </select>
                <select defaultValue="" name="code" onChange={selectJhonson} className="jhonson-select" >
                    <option disabled value="">select</option>
                    {jhonsons?.map((each,index) => <option key={index} value={each._id}>{each.code} - {each.x}×{each.y}×{each.z}</option>)}
                </select>
                <select defaultValue="" name="instalation" onChange={event=> setInst(event.target.value)} className="jhonson-select" >
                    <option disabled value="">select</option>
                    {inst_j?.map(each => <option key={each} value={each}>{each}</option>)}
                </select>
                <select defaultValue="" name="accs" onChange={selectAcc} className="jhonson-select" >
                    <option disabled value="">select</option>
                    {accesories?.map((each,index) => <option key={index} value={each._id}>{each.code}</option>)}
                </select>
                <input type="number" name="stock" id="stock" />
            </form>
            <div className='jhonson-box'>
                <img className='jhonson-img' src={photo_j} alt="photo" />
            </div>
        </div>
    )

}