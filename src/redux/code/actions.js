import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import apiUrl from '../../url'

const createCode = createAsyncThunk('createCode', async (data) => {
    const token = localStorage.getItem("token")
    try {
        const response = await axios.post(
            apiUrl+"api/marble/code",
            data,
            { headers: { Authorization: "Bearer " + token } }
        )
        //console.log(response)
        if (response) {
            return {
                success: true,
                response: response.data.response
            }
        } else {
            return {
                success: false,
                response: 'no se pudo'
            }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            response: 'ocurrió un error'
        }
    }
})