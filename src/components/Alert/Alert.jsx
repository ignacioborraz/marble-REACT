import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import alertActions from './../../store/alert/actions'
const { close } = alertActions

export default function Alerts() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    let { visible,messages,success,options,id_code,navigation } = useSelector(store => store.alert)
    //let messages = useSelector(store => store.alert.messages)
    //let success = useSelector(store => store.alert.success)

    if(visible){
        if (options==='redirect') {
            Swal.fire({
                title: 'continuar solicitud?',
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