import { useEffect,useState } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import apiUrl from '../../../url'

import './ca01Tipo.css'

import HexagonIcon from '@mui/icons-material/Hexagon'
import TokenIcon from '@mui/icons-material/Token'

export default function Ca01Tipo() {

    /**
     * @note is the number of the note
     */
    const [internal,setInternal] = useState(1)
    const [note,setNote] = useState(1)
    const { token } = useSelector(store => store.auth)
    useEffect(() => {
        let headers = {headers: {'Authorization': `Bearer ${token}`}}
        axios.get(`${apiUrl}note/next`,headers).then(res => {
            setNote(res.data.response.note)
            setInternal(res.data.response.internal)
            //console.log({ note:res.data.response.note,internal:res.data.response.internal })     
        })
        // eslint-disable-next-line
    }, [])

    return (
        <div className='type-container' >
            <div className='type-box' >
                <LinkRouter className='type-link' to={`/internal/${internal}`}>
                    <HexagonIcon className='type-icon' />
                    <h2>INTERNOS</h2>
                </LinkRouter>
                <LinkRouter className='type-link' to={`/note/${note}`}>
                    <TokenIcon className='type-icon' />
                    <h2>PEDIDOS</h2>
                </LinkRouter>
            </div>
        </div>        
    )

}