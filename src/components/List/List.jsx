import { useState } from 'react'
import { useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import Alert2 from '../Alert2/Alert2'
import ListStock from '../Inputs/ListStock/ListStock'
import axios from 'axios'
import apiUrl from '../../url'

export default function List({ product,id,stock,name,photo,color,reload,setReload }) {

    const { token } = useSelector(store => store.auth)
    const [newStock,setNewStock] = useState(stock)
    const [showEdit,setShowEdit] = useState(false)
    const [visible,setVisible] = useState(false)

    async function handleUpd() {
        let data = {
            stock: newStock,
        }
        let url = `${apiUrl+product}/${id}`
        if (!token) {
            token = localStorage.getItem('token')
        }
        let headers = {headers: {'Authorization': `Bearer ${token}`}}
        try {
            await axios.put(url,data,headers)
            setShowEdit(!showEdit)
            setReload(!reload)
            return {
                success: true
            }
        } catch (error) {
            //console.log(error)
            return {
                success: false
            }
        }
    }

    return (
        <>
            <div className='co-stock-head'>
                <ListStock showEdit={showEdit} stock={newStock} setStock={setNewStock} />
                <img src={photo} className={`co-stock-headers-${color} co-stock-img fs w-40`} />
                <p className={`co-stock-headers-${color} fs w-200`}>{name}</p>
                <span className='card-sink-buttons w-20'>
                {showEdit ? (<>
                    <CheckIcon sx={{ width:'25px',height:'25px', color: '#313131' }} onClick={()=>setVisible(true)} />
                </>) : (<>
                    <EditIcon sx={{ width:'25px',height:'25px', color: '#313131' }} onClick={()=>setShowEdit(!showEdit)} />
                </>)}                    
                </span>
            </div>
            {visible && <Alert2 visible={visible} setVisible={setVisible} title={'confirmar?'} showDenyButton={true} denyButtonText={'actualizar'} fnDenied={handleUpd} showCancelButton={true} cancelButtonText={'volver'} />}
        </>
    )

}
