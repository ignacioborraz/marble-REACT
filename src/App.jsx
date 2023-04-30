import { useEffect } from 'react'

import { router } from './router/index.jsx'
import { out } from './router/out.jsx'
import { RouterProvider} from "react-router-dom"

import './App.css'
import { useDispatch,useSelector } from 'react-redux'
import authActions from "./store/auth/actions"
const { iniciar_sesion_con_token } = authActions

export default function App() {

    let dispatch = useDispatch()
    let { is_online } = useSelector(store => store.auth)
  
    useEffect(() => {
        let token = localStorage.getItem('token')
        //console.log(token)
        if (token) {
            dispatch(iniciar_sesion_con_token(token))
        }
    },[is_online])

    return is_online ? (
        <RouterProvider router={ router } />
    ) : (
        <RouterProvider router={ out } />
    )

}