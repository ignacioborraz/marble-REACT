import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import apiUrl from '../../url'

const get_sinks = createAsyncThunk('get_sinks', async ({ token,id_code }) => {
    let url = `${apiUrl}code/${id_code}`
    if (!token) {
        token = localStorage.getItem('token')
    }
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    try {
        let res = await axios.get(url,headers)
        //console.log(res.data.response)
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

const delete_sink = createAsyncThunk('delete_sink', async ({ token,id_code,stock,sink }) => {
    let url = `${apiUrl}code/pull/${id_code}`
    let delete_stock_url = `${apiUrl}stock/${stock}`
    let delete_sink_url = `${apiUrl}sink/${sink}`
    if (!token) {
        token = localStorage.getItem('token')
    }
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    try {
        let res = await axios.patch(url,{stock},headers)
        await axios.delete(delete_stock_url,headers)
        await axios.delete(delete_sink_url,headers)
        //console.log(res.data.response)
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

const j_codeActions= { get_sinks,delete_sink }

export default j_codeActions