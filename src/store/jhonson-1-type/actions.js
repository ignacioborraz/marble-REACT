import { createAsyncThunk,createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import apiUrl from '../../url'

const read_types = createAsyncThunk('read_types', async ({ token }) => {
    let url304 = `${apiUrl}jhonson?type=A304`
    let url430 = `${apiUrl}jhonson?type=A430`
    if (!token) {
        token = localStorage.getItem('token')
    }
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    try {
        let res304 = await axios.get(url304,headers)
        let res430 = await axios.get(url430,headers)
        return { 
            success: true,
            response: {
                A304: res304.data.response.jhonsons,
                A430: res430.data.response.jhonsons
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

const read_one_type = createAction('read_one_type', ({ type }) => {
    return { 
        payload: {
            success: true,
            response: type
        }
    }
})

/* const iniciar_sesion = createAsyncThunk('iniciar_sesion', async (data) => {
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
        console.log(res)
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
}) */

const j_typeActions= { read_types,read_one_type }

export default j_typeActions