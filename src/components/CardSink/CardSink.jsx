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
import ReqInputStock from '../Inputs/ReqInputStock/ReqInputStock'
import ReqPhotoSink from './../Inputs/ReqPhotoSink/ReqPhotoSink';
const { upd_code } = j_codeActions
const { read_accesories } = j_accesoryActions
const { read_types } = j_typeActions
const { open } = alertActions

export default function CardSink({ data }) {
    const { _id,stock,ksink,instalation,accesory } = data
    console.log({ _id,stock,ksink,instalation,accesory } )
    const { all } = useSelector(store => store.jhonsons)
    const { accesories } = useSelector(store => store.accesories)
    const { token } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const [edit,setEdit] = useState(true)
    const [codeJh,setCodeJh] = useState(ksink?._id)
    const [newPhoto,setNewPhoto] = useState(ksink?.photo)

    const [inst_j,setInst_j] = useState(ksink?.instalation)
    const stock_ja = useRef()
    const [close_modal,setClose_modal] = useState(false)
    const [modal,setModal] = useState(false)
    const [reload, setReload] = useState(false)
    const checks_a = useRef()
    const ref_code_acc = useRef()

    const [showEdit,setShowEdit] = useState()
    const dataForm = useRef()
    const checks_j = useRef()

    useEffect(() => {
        if (all.length === 0) {
            dispatch(read_types({ token }))
        }
        if (accesories.length === 0) {
            dispatch(read_accesories({ token }))
        }
        // eslint-disable-next-line
    }, [reload])

    let inst = instalation?.map(each=><p key={each}>{each}</p>)
    let accs = accesory?.map((each,index)=> <img className='ts-photo' src={each.photo} alt="accs" key={index} />)    

    async function deleteProduct() {
        await dispatch(open({ options:'delete', id_code: _id }))
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
            id_sink: ksink._id,
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

    function handleEdit() {
        setShowEdit(!showEdit)
        let data = Object.values(dataForm.current).filter(each=> each.checked).map(each => each.value)
        console.log(data)
    }

    return (
        <>        
            <form ref={dataForm} className={`ts-container show-${edit}`}>
                <ReqInputStock stock={stock} showEdit={showEdit}/>
                <ReqPhotoSink photo={ksink?.photo} newPhoto={newPhoto} name={ksink?.name} showEdit={showEdit} onChange={changeCode} sinks={all} instalation={inst} checks_j={checks_j} inst_j={inst_j} ksink_instalation={ksink?.instalation} />
                <span className='ts-data ts-acc'>{accs}</span>
                <span className='ts-data ts-buttons'>
                    <EditIcon sx={{ width:'25px',height:'25px', color: '#313131' }} onClick={handleEdit} />
                    <DeleteForeverIcon sx={{ width:'25px',height:'25px', color: 'rgb(200, 40, 50)' }} onClick={deleteProduct} />
                </span>
            </form>
            {/* <div className={`ts-container show-${!edit}`}>

                
                
                {modal && <span className='ts-data ts-acc' onClick={()=>{setClose_modal(!close_modal);setModal(false)}}>{accs}</span>}
                <div className={`accesory-form modal-${close_modal}`}>
                    <div className='acc-form'>
                        <input ref={ref_code_acc} onChange={()=>setReload(!reload)} className='acc-options' type="text" placeholder='Buscar por codigo' />
                        <p onClick={(()=>setClose_modal(!close_modal))} className='acc-options a-opt'>finalizar</p>
                    </div>
                    <form ref={checks_a} className='accesory-form-box'>
                        {accesories?.map(accesory => <AccesoryCheck key={accesory._id} data={accesories} modal={close_modal} selected={accesory} inputText={ref_code_acc.current?.value || ""} id_stock={_id} />)}
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
            </div> */}
        </>
    )

}