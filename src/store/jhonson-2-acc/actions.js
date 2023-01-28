import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import apiUrl from '../../url'

const read_accesories = createAsyncThunk('read_accesories', async ({ code,token }) => {
    let url = `${apiUrl}accesory?code=${code}`
    if (!token) {
        token = localStorage.getItem('token')
    }
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    try {
        let res = await axios.get(url,headers)
        //console.log(res.data.response)
        return { 
            success: true,
            response: res.data.response.accesories
        }
    } catch (error) {
        //console.log(error)
        return {
            success: false,
            response: error.response.data
        }
    }
})

const capture_accesories = createAction('capture_accesories', ({ code,status }) => {
    try {
        return {
            payload: { 
                success: true,
                response: { code,status }
            }
        }
    } catch (error) {
        //console.log(error)
        return {
            payload: { 
                success: false,
                response: 'error'
            }
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

const j_accesoryActions= { read_accesories,capture_accesories }

export default j_accesoryActions