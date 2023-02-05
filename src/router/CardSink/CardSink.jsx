import { useEffect,useState,useRef } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../url'

import logo_j from '../../media/logo_j.png'

import './cardSink.css'

import AccesoryCheck from '../../components/AccesoryCheck/AccesoryCheck'
import InputCheck from '../../components/InputCheck/InputCheck'
import j_accesoryActions from '../../store/jhonson-2-acc/actions'
import j_typeActions from '../../store/jhonson-1-type/actions'
import alertActions from '../../store/alert/actions'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
const { read_accesories } = j_accesoryActions
const { read_types,read_one_type } = j_typeActions
const { open } = alertActions

export default function CardSink({ data,id_code }) {
    const { _id,stock,sink } = data
    const dispatch = useDispatch()

    let inst = sink?.instalation?.map(each=><p key={each}>{each}</p>)
    let accs = sink?.accesories?.map((each,index)=> <img className='ts-photo' src={each.photo} alt="accs" key={index} />)

    async function deleteSink() {
        await dispatch(open({ options:'delete', id_code, ids: { id_stock: _id, id_sink: sink._id } }))
    }

    return (
        <>
            <div className={`ts-container`}>
                <p className='ts-data ts-stock'>{stock}</p>
                <img className='ts-data ts-img' src={sink?.jhonson.photo} alt="jphoto" />
                <p className='ts-data ts-code'>{sink?.jhonson.code}</p>
                <span className='ts-data ts-inst'>
                    {inst}
                </span>
                <span className='ts-data ts-acc'>
                    {accs}
                </span>
                <span className='ts-data ts-buttons'>
                    <EditIcon sx={{ width:'25px',height:'25px', color: '#313131' }} />
                    <DeleteForeverIcon sx={{ width:'25px',height:'25px', color: 'rgb(200, 40, 50)' }} onClick={deleteSink} />
                </span>

            </div>
        </>
    )

}