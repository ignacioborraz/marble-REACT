import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import apiUrl from '../../url'

const read_accesories = createAsyncThunk('read_accesories', async ({ token }) => {
    let url = `${apiUrl}accesory`
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
        console.log(error)
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

const j_accesoryActions= { read_accesories,capture_accesories }

export default j_accesoryActions