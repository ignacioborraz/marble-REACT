import { useEffect,useState,useRef } from 'react'
import { useDispatch,useSelector } from 'react-redux'

import './cardSink.css'

import AccesoryCheck from '../AccesoryCheck/AccesoryCheck2'
import InputCheck from '../InputCheck/InputCheck2'
import j_codeActions from '../../store/jhonson-3-sink/actions'
import j_accesoryActions from '../../store/jhonson-2-acc/actions'
import j_typeActions from '../../store/jhonson-1-type/actions'
import alertActions from '../../store/alert/actions'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close';
const { upd_code } = j_codeActions
const { read_accesories } = j_accesoryActions
const { read_types } = j_typeActions
const { open } = alertActions

export default function CardSink({ data,id_code }) {
    const { _id,stock,sink } = data
    const { all } = useSelector(store => store.jhonsons)
    const { accesories } = useSelector(store => store.accesories)
    const { token } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const [edit,setEdit] = useState(true)
    const [codeJh,setCodeJh] = useState(sink?.jhonson._id)
    const [newPhoto,setNewPhoto] = useState(sink?.jhonson.photo)
    const checks_j = useRef()
    const [inst_j,setInst_j] = useState(sink?.jhonson.instalation)
    const stock_ja = useRef()
    const [close_modal,setClose_modal] = useState(false)
    const [modal,setModal] = useState(false)
    const [reload, setReload] = useState(false)
    const checks_a = useRef()
    const ref_code_acc = useRef()

    useEffect(() => {
        if (all.length === 0) {
            dispatch(read_types({ token }))
        }
        if (accesories.length === 0) {
            dispatch(read_accesories({ token }))
        }
        // eslint-disable-next-line
    }, [reload])

    let inst = sink?.instalation?.map(each=><p key={each}>{each}</p>)
    let accs = sink?.accesories?.map((each,index)=> <img className='ts-photo' src={each.photo} alt="accs" key={index} />)    

    async function deleteSink() {
        await dispatch(open({ options:'delete', id_code, ids: { id_stock: _id, id_sink: sink._id } }))
    }

    function changeCode(event) {
        setCodeJh(event.target.value)
        let one = all.find(each => each._id === event.target.value)
        setNewPhoto(one.photo)
        setInst_j(one.instalation)
    }

    function updateSink() {
        let selected_instalation = []
        if (checks_j.current) {
            selected_instalation = Object.values(checks_j.current).filter(each=> each.checked).map(each => each.value)
            if (selected_instalation.length===0) {
                selected_instalation = inst_j
            }
        }
        let selected_accesories = []
        if (checks_a.current) { selected_accesories = Object.values(checks_a.current).filter(each=> each.checked).map(each => each.value) }
        const data = {
            id_sink: sink._id,
            upd_stock: stock_ja?.current.value,
            upd_jhonson: codeJh,
            upd_instalation: selected_instalation,
            upd_accesories: selected_accesories
        }
        //console.log(data)
        dispatch(upd_code({ id_stock: _id,token,data }))
        setReload(!reload)
        setEdit(!edit)
    }

    return (
        <>
            <div className={`ts-container show-${!edit}`}>
                <input className="ts-data ts-stock" type="number" ref={stock_ja} name="stock" id="stock" min="1" defaultValue={stock} />
                <img className='ts-data ts-img' src={newPhoto} alt="jphoto" />
                <select className="ts-data ts-code" defaultValue="" name="type" onChange={changeCode}>
                        <option disabled value="">seleccionar pileta</option>
                        {all?.map((each,index) => <option key={index} value={each._id}>{each.code} - {each.x}×{each.y}×{each.z}</option>)}
                </select>
                <form ref={checks_j} className='ts-data ts-inst'>
                    {inst_j?.map(each => <InputCheck key={each} each={each} selected={sink?.instalation} />)}
                </form>
                
                {modal && <span className='ts-data ts-acc' onClick={()=>{setClose_modal(!close_modal);setModal(false)}}>{accs}</span>}
                <div className={`accesory-form modal-${close_modal}`}>
                    <div className='acc-form'>
                        <input ref={ref_code_acc} onChange={()=>setReload(!reload)} className='acc-options' type="text" placeholder='Buscar por codigo' />
                        <p onClick={(()=>setClose_modal(!close_modal))} className='acc-options a-opt'>finalizar</p>
                    </div>
                    <form ref={checks_a} className='accesory-form-box'>
                        {accesories?.map(accesory => <AccesoryCheck key={accesory._id} data={accesory} modal={close_modal} selected={sink?.accesories} inputText={ref_code_acc.current?.value || ""} id_stock={_id} />)}
                    </form>
                </div>
                {!modal && (
                    <span className='ts-data ts-acc' onClick={()=>setClose_modal(!close_modal)}>
                        {checks_a?.current && Object.values(checks_a?.current)?.filter(each=> each.checked).map(each=> accesories.find(every=> every._id==each.value))?.map((each,index)=> <img className='ts-photo' src={each.photo} alt="accs" key={index} />)}
                    </span>
                )}
                <span className='ts-data ts-buttons'>
                    <CheckIcon sx={{ width:'25px',height:'25px', color: '#313131' }} onClick={updateSink} />
                    <CloseIcon sx={{ width:'25px',height:'25px', color: 'rgb(200, 40, 50)' }} onClick={()=>setEdit(!edit)} />
                </span>
            </div>

            <div className={`ts-container show-${edit}`}>
                <p className='ts-data ts-stock'>{stock}</p>
                <img className='ts-data ts-img' src={sink?.jhonson.photo} alt="jphoto" />
                <p className='ts-data ts-code'>{sink?.jhonson.code}</p>
                <span className='ts-data ts-inst'>{inst}</span>
                <span className='ts-data ts-acc'>{accs}</span>
                <span className='ts-data ts-buttons'>
                    <EditIcon sx={{ width:'25px',height:'25px', color: '#313131' }} onClick={()=>setEdit(!edit)} />
                    <DeleteForeverIcon sx={{ width:'25px',height:'25px', color: 'rgb(200, 40, 50)' }} onClick={deleteSink} />
                </span>
            </div>
        </>
    )

}