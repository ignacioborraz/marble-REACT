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
        return {
            success: false,
            response: error.response.data
        }
    }
})

const get_all = createAsyncThunk('get_all', async ({ token,text }) => {
    let url = `${apiUrl}note/all?text=${text}`
    if (!token) {
        token = localStorage.getItem('token')
    }
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    try {
        let res = await axios.get(url,headers)
        //console.log(res.data.response)
        return { 
            success: true,
            response: {
                accesories:  {
                    stock_1: res.data.response.accesories.stock_1,
                    stock_2: res.data.response.accesories.stock_2,
                    stock_3: res.data.response.accesories.stock_3
                },
                ksinks: {
                    stock_1: res.data.response.ksinks.stock_1,
                    stock_2: res.data.response.ksinks.stock_2,
                    stock_3: res.data.response.ksinks.stock_3
                },
                plates: {}
            }
        }
    } catch (error) {
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
        await axios.delete(url,headers)
        //console.log(res.data.response)
        return {
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
        await axios.put(url,data,headers)
        //console.log(res.data.response)
        return {
            success: true,
            response: { id,data }
        }
    } catch (error) {
        //console.log(error)
        return {
            success: false,
            response: error.response.data
        }
    }
})

const get_stocks = createAsyncThunk('get_stocks', async ({ token,type,comments }) => {
    let url = `${apiUrl}note?type=${type}&comments=${comments}`
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

const j_codeActions= { get_products,get_all,delete_product,upd_code,get_stocks }

export default j_codeActions