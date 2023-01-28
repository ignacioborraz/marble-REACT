import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import alertActions from './../../store/alert/actions'
const { close } = alertActions

export default function Alerts() {

    const dispatch = useDispatch()

    let visible = useSelector(store => store.alert.visible)
    let messages = useSelector(store => store.alert.messages)
    let success = useSelector(store => store.alert.success)

    if(visible){
        Swal.fire({
            icon: `${success ? "success" : "error"}`,
            text: `${success ? (typeof messages === "string") ? messages :  messages.map(message => message.message).join() : messages}`,
        }).then(res => dispatch(close()))
    }

    return (
        <>
        </>
    )
}