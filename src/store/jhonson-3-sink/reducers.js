import { createReducer } from '@reduxjs/toolkit'
import j_codeActions from './actions'
import axios from 'axios'
import apiUrl from '../../url'

const { get_sinks,delete_sink,upd_code,get_stocks } = j_codeActions

const initialState = {
    sinks: [],
    plates: [],
    messages: "",
    all: []
}

const codeReducer = createReducer(initialState,
    (builder) => {
        builder
        .addCase(get_sinks.fulfilled, (state, action) => {
            const { success,response } = action.payload
            //console.log(action.payload)
            let newState = {}
            if (success) {
                newState = {
                    ...state,
                    sinks: response.sinks,
                    plates: response.plates
                }
            } else {
                if (typeof response.response === "string") {
                    newState = {
                        ...state,
                        messages: [response.response]
                    }
                } else {
                    newState = {
                        ...state,
                        messages: response.response.map(mes => mes.message)
                    }
                }
            }
            //console.log(newState)
            return newState
        })
        .addCase(delete_sink.fulfilled, (state, action) => {
            const { id_code,success,response,token } = action.payload
            //console.log(action.payload)
            let newState = {}
            if (success) {
                newState = {
                    ...state,
                    sinks: state.sinks.filter(each => each._id !== response.stock),
                    plates: state.plates.filter(each => each._id !== response.stock)
                }
                console.log(newState.plates.length)
                console.log(newState.sinks.length)
                if (newState.sinks.length===0 && newState.plates.length===0) {
                    let url = `${apiUrl}code/${id_code}`
                    let headers = {headers: {'Authorization': `Bearer ${token}`}}
                    axios.delete(url,headers)
                }
            } else {
                if (typeof response.response === "string") {
                    newState = {
                        ...state,
                        messages: [response.response]
                    }
                } else {
                    newState = {
                        ...state,
                        messages: response.response.map(mes => mes.message)
                    }
                }
            }
            //console.log(newState)
            return newState
        })
        .addCase(upd_code.fulfilled, (state, action) => {
            const { response,success } = action.payload
            //console.log(response)
            let newState = {}
            if (success) {
                newState = {
                    ...state,
                    sinks: state.sinks.map(each => {
                        if (each._id === response._id) {
                            each = response
                        }
                        return each
                    }),
                    plates: state.plates.map(each => {
                        if (each._id === response._id) {
                            each = response
                        }
                        return each
                    })
                }
                //console.log(newState.sinks)
            } else {
                if (typeof response.response === "string") {
                    newState = {
                        ...state,
                        messages: [response.response]
                    }
                } else {
                    newState = {
                        ...state,
                        messages: response.response.map(mes => mes.message)
                    }
                }
            }
            //console.log(newState)
            return newState
        })
        .addCase(get_stocks.fulfilled, (state, action) => {
            const { success,response } = action.payload
            //console.log(response)
            let newState = {}
            if (success) {
                newState = {
                    ...state,
                    all: response,
                }
            } else {
                if (typeof response.response === "string") {
                    newState = {
                        ...state,
                        messages: [response.response]
                    }
                } else {
                    newState = {
                        ...state,
                        messages: response.response.map(mes => mes.message)
                    }
                }
            }
            //console.log(newState)
            return newState
        })
    }
)

export default codeReducer