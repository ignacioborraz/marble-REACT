import { createReducer } from '@reduxjs/toolkit'
import j_codeActions from './actions'

const { get_sinks,delete_sink } = j_codeActions

const initialState = {
    sinks: [],
    plates: [],
    messages: ""
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
            const { success,response } = action.payload
            //console.log(action.payload)
            let newState = {}
            if (success) {
                newState = {
                    ...state,
                    sinks: state.sinks.filter(each => each._id !== response.stock),
                    plates: state.plates.filter(each => each._id !== response.stock)
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