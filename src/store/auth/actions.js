import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import apiUrl from '../../url'

const registrar_usuario = createAsyncThunk('registrar_usuario', async (data) => {
    let url = `${apiUrl}auth/signup`
    try {
        let res = await axios.post(url,data)
        return { 
            success: true,
            response: res.data.response
        }
    } catch (error) {
        //console.log(error)
        return {
            success: false,
            response: error.response.data
        }
    }
})

const iniciar_sesion = createAsyncThunk('iniciar_sesion', async (data) => {
    let url = `${apiUrl}auth/signin`
    try {
        let res = await axios.post(url,data)
        return { 
            success: true,
            response: res.data.response
        }
    } catch (error) {
        //console.log(error)
        return {
            success: false,
            response: error.response.data.response
        }
    }
})

const iniciar_sesion_con_token = createAsyncThunk('iniciar_sesion_con_token', async (token) => {
    let url = `${apiUrl}auth/token`
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    try {
        let res = await axios.post(url,null,headers)
        //console.log(res)
        return { 
            success: true,
            response: {
                ...res.data.response,
                token
            }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            response: error.response.data
        }
    }
})

const cerrar_sesion = createAsyncThunk('cerrar_sesion', async (token) => {
    let url = `${apiUrl}auth/signout`
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    try {
        await axios.post(url,null,headers)
        return { 
            success: true,
            response: null
        }
    } catch (error) {
        //console.log(error)
        return {
            success: false,
            response: error.response.data
        }
    }
})

const authActions= { registrar_usuario,iniciar_sesion,iniciar_sesion_con_token,cerrar_sesion }

export default authActions