import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import alertActions from './../../store/alert/actions'
import j_codeActions from './../../store/jhonson-4-notes/actions'
const { close } = alertActions
const { upd_code,delete_product } = j_codeActions

export default function Alerts() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    let { visible,messages,success,options,navigation,id_code,data } = useSelector(store => store.alert)
    let { token } = useSelector(store => store.auth)
    //let success = useSelector(store => store.alert.success)

    if(visible){
        if (options==='redirect') {
            Swal.fire({
                title: 'continuar solicitud?',
                text: data,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: '+placa',
                denyButtonText: `+pileta`,
                cancelButtonText: 'listo!'
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    navigate(navigation.isConfirmed,{ replace:true })
                } else if (result.isDenied) {
                    navigate(navigation.isDenied,{ replace:true })
                } else {
                    navigate(navigation.else,{ replace:true })
                }
                dispatch(close())
            })
        } else if (options==='update') {
            Swal.fire({
                title: 'confirmar?',
                showConfirmButton: false,
                showDenyButton: true,
                showCancelButton: true,
                denyButtonText: `actualizar`,
                cancelButtonText: 'cancelar'
            }).then(result => {
                if (result.isDenied) {
                    dispatch(upd_code({ id: id_code,token,data }))
                }
            }).then(res => dispatch(close())
            )
        } else if (options==='delete') {
            Swal.fire({
                title: 'confirmar?',
                showConfirmButton: false,
                showDenyButton: true,
                showCancelButton: true,
                denyButtonText: `eliminar`,
                cancelButtonText: 'cancelar'
            }).then(result => {
                if (result.isDenied) {
                    dispatch(delete_product({ token,id_code }))
                }
            }).then(res => dispatch(close())
            )
        } else {
            Swal.fire({
                icon: `${success ? "success" : "error"}`,
                text: `${success ? (typeof messages === "string") ? messages :  messages.map(message => message.message).join() : messages}`,
            }).then(res => dispatch(close()))
        }        
    }

    return (
        <>
        </>
    )
}