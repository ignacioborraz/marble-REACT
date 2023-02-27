import { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'

import './cardSink.css'

import j_codeActions from '../../store/jhonson-4-notes/actions'
import j_accesoryActions from '../../store/jhonson-2-acc/actions'
import j_typeActions from '../../store/jhonson-1-type/actions'
import alertActions from '../../store/alert/actions'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import ReqInputStock from '../Inputs/ReqInputStock/ReqInputStock'
import ReqInputSink from '../Inputs/ReqInputSink/ReqInputSink'
import ReqInputAccesory from '../Inputs/ReqInputAccesory/ReqInputAccesory'
const { upd_code } = j_codeActions
const { read_accesories } = j_accesoryActions
const { read_types } = j_typeActions
const { open } = alertActions

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

    async function deleteProduct() {
        console.log(_id)
        await dispatch(open({ options:'delete', id_code: _id }))
    }

    function handleEdit() {
        setShowEdit(!showEdit)
    }

    function handleUpd() {
        setShowEdit(!showEdit)
        let data = {
            stock: currentStock,
            instalation: currentInstalation,
            accesory: currentAccesories.map(each => each._id),
            accesories_data: currentAccesories
        }
        //console.log(data)
        dispatch(upd_code({ id: _id,token,data }))
    }

    return (
        <>        
            <div className={`ts-container`}>
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
                <span className='ts-data ts-buttons'>
                    {showEdit ? (<>
                        <CheckIcon sx={{ width:'25px',height:'25px', color: '#313131' }} onClick={handleUpd} />
                        <CloseIcon sx={{ width:'25px',height:'25px', color: 'rgb(200, 40, 50)' }} onClick={()=>setShowEdit(!showEdit)} />
                    </>) : (<>
                        <EditIcon sx={{ width:'25px',height:'25px', color: '#313131' }} onClick={handleEdit} />
                        <DeleteForeverIcon sx={{ width:'25px',height:'25px', color: 'rgb(200, 40, 50)' }} onClick={deleteProduct} />
                    </>)}                    
                </span>
            </div>
        </>
    )

}