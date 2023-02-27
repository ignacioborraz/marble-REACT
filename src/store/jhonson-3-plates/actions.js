import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import apiUrl from '../../url'

const get_products = createAsyncThunk('get_products', async ({ token,id_code }) => {
    let url = `${apiUrl}note/${id_code}`
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

const delete_product = createAsyncThunk('delete_product', async ({ token,id_code }) => {
    let url = `${apiUrl}note/${id_code}`
    if (!token) {
        token = localStorage.getItem('token')
    }
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    try {
        let res = await axios.delete(url,headers)
        //console.log(res.data.response)
        return {
            id_code,
            success: true,
            response: id_code,
            token
        }
    } catch (error) {
        //console.log(error)
        return {
            success: false,
            response: error.response.data
        }
    }
})

const upd_code = createAsyncThunk('upd_code', async ({ id,token,data }) => {
    let url = `${apiUrl}note/${id}`
    if (!token) {
        token = localStorage.getItem('token')
    }
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    try {
        let response = await axios.put(url,data,headers)
        return {
            success: true,
            response: response.data.response
        }
    } catch (error) {
        //console.log(error)
        return {
            success: false,
            response: error.response.data
        }
    }
})

const get_stocks = createAsyncThunk('get_stocks', async ({ token,type,note,comments }) => {
    let url = `${apiUrl}note?type=${type}&note=${note}&comments=${comments}`
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

const j_codeActions= { get_products,delete_product,upd_code,get_stocks }

export default j_codeActions