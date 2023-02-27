import { createReducer } from '@reduxjs/toolkit'
import j_codeActions from './actions'
import axios from 'axios'
import apiUrl from '../../url'

const { get_products,delete_product,upd_code,get_stocks } = j_codeActions

const initialState = {
    sinks: [],
    plates: [],
    messages: "",
    all: []
}

const codeReducer = createReducer(initialState,
    (builder) => {
        builder
        .addCase(get_products.fulfilled, (state, action) => {
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
        .addCase(delete_product.fulfilled, (state, action) => {
            const { success,response,token } = action.payload
            console.log(action.payload)
            let newState = {}
            if (success) {
                newState = {
                    ...state,
                    sinks: state.sinks.filter(each => each._id !== response),
                    plates: state.plates.filter(each => each._id !== response)
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
            let newState = {}
            if (success) {
                const { id,data } = response
                newState = {
                    ...state,
                    sinks: state.sinks.map(each => {
                        if (each._id === id) {
                            let upd = { ...each }
                            upd.stock = Number(data.stock)
                            upd.instalation = data.instalation
                            upd.accesory = data.accesories_data
                            each = upd
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