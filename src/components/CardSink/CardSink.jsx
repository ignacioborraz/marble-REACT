import { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'

import './cardSink.css'

import j_codeActions from '../../store/jhonson-4-notes/actions'
import j_accesoryActions from '../../store/jhonson-2-acc/actions'
import j_typeActions from '../../store/jhonson-1-type/actions'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import ReqInputStock from '../Inputs/ReqInputStock/ReqInputStock'
import ReqInputSink from '../Inputs/ReqInputSink/ReqInputSink'
import ReqInputAccesory from '../Inputs/ReqInputAccesory/ReqInputAccesory'
import Alert2 from './../Alert2/Alert2'

const { upd_code,delete_product } = j_codeActions
const { read_accesories } = j_accesoryActions
const { read_types } = j_typeActions

export default function CardSink({ data }) {
    //console.log(data)
    const { _id,stock,ksink,instalation,accesory } = data
    const { all } = useSelector(store => store.jhonsons)
    const { accesories } = useSelector(store => store.accesories)
    const { token } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        if (all.length === 0) {
            dispatch(read_types({ token }))
        }
        if (accesories.length === 0) {
            dispatch(read_accesories({ token }))
        }
        // eslint-disable-next-line
    }, [])
    /**
     * @showEdit shows edition settings
     */
    const [showEdit,setShowEdit] = useState(false)
    /**
     * @currenStock is the current stock of the note
     */
    const [currentStock,setCurrentStock] = useState(stock)
    /**
     * @ksinkStock is the current stock of the sink
     */
    const [ksinkStock,setKsinkStock] = useState(ksink.stock)
    /**
     * @currenInstalation is the current instalation of the note
     */
    const [currentInstalation,setCurrentInstalation] = useState(instalation)
    /**
     * @ksinkInstalation is the instalation of the sink
     */
    const [ksinkInstalation,setKsinkInstalation] = useState(ksink.instalation)
    /**
     * @currenAccesories is the current accesories of the note
     */
    const [currentAccesories,setCurrentAccesories] = useState(accesory)
    /**
     * @visible shows de alert
     */
    const [visible,setVisible] = useState(false)
    const [visibleDel,setVisibleDel] = useState(false)

    async function handleDel() {
        console.log(_id)
        await dispatch(delete_product({ token,id_code: _id }))
    }

    async function handleUpd() {
        let data = {
            stock: currentStock,
            instalation: currentInstalation,
            accesory: currentAccesories.map(each => each._id),
            accesories_data: currentAccesories
        }
        await dispatch(upd_code({ id: _id,token,data }))
        setShowEdit(!showEdit)
    }

    return (
        <>        
            <div className='card-sink-container'>
                <ReqInputStock
                    showEdit={showEdit}
                    stock={stock}
                    ksinkStock={ksinkStock}
                    currentStock={currentStock}
                    setCurrentStock={setCurrentStock}
                />
                <ReqInputSink
                    showEdit={showEdit}
                    instalation={instalation}
                    name={data?.ksink.name}
                    photo={data?.ksink.photo}
                    ksinkInstalation={ksinkInstalation}
                    currentInstalation={currentInstalation}
                    setCurrentInstalation={setCurrentInstalation}
                />
                <ReqInputAccesory
                    showEdit={showEdit}
                    accesory={accesory}
                    currentAccesories={currentAccesories}
                    setCurrentAccesories={setCurrentAccesories}
                />
                <span className='card-sink-buttons w-20'>
                    {showEdit ? (<>
                        <CheckIcon sx={{ width:'25px',height:'25px', color: '#313131' }} onClick={()=>setVisible(true)} />
                        <CloseIcon sx={{ width:'25px',height:'25px', color: 'rgb(200, 40, 50)' }} onClick={()=>setShowEdit(!showEdit)} />
                    </>) : (<>
                        <EditIcon sx={{ width:'25px',height:'25px', color: '#313131' }} onClick={()=>setShowEdit(!showEdit)} />
                        <DeleteForeverIcon sx={{ width:'25px',height:'25px', color: 'rgb(200, 40, 50)' }} onClick={()=>setVisibleDel(true)} />
                    </>)}                    
                </span>
            </div>
            {visible && <Alert2 visible={visible} setVisible={setVisible} title={'confirmar?'} showDenyButton={true} denyButtonText={'actualizar'} fnDenied={handleUpd} showCancelButton={true} cancelButtonText={'volver'} />}
            {visibleDel && <Alert2 visible={visibleDel} setVisible={setVisibleDel} title={'confirmar?'} showDenyButton={true} denyButtonText={'eliminar'} fnDenied={handleDel} showCancelButton={true} cancelButtonText={'volver'} />}
        </>
    )

}