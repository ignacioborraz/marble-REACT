import { createReducer } from '@reduxjs/toolkit'
import j_accesoryActions from './actions'

const { read_accesories,capture_accesories } = j_accesoryActions

const initialState = {
    accesories: [],
    codes: {},
    messages: ""
}

const accReducer = createReducer(initialState,
    (builder) => {
        builder
        .addCase(read_accesories.fulfilled, (state, action) => {
            const { success,response } = action.payload
            //console.log(action.payload)
            let newState = {}
            if (success) {
                newState = {
                    ...state,
                    accesories: response
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
        .addCase(capture_accesories, (state, action) => {
            const { success,response } = action.payload
            //console.log(action.payload)
            let newState = {}
            if (success) {
                newState = {
                    ...state,
                    codes: {
                        ...state.codes,
                        [response.code]: response.status
                    }
                }
            } else {
                if (typeof response === "string") {
                    newState = {
                        ...state,
                        messages: [response]
                    }
                } else {
                    newState = {
                        ...state,
                        messages: response.map(mes => mes.message)
                    }
                }
            }
            //console.log(newState)
            return newState
        })/* 
        .addCase(iniciar_sesion_con_token.fulfilled, (state, action) => {
            const { success,response } = action.payload
            //console.log(action.payload)
            let newState = {}
            if (success) {
                const { user,token } = response
                newState = {
                    ...state,
                    mail: user.mail,
                    photo: user.photo,
                    is_admin: user.is_admin,
                    is_author: user.is_admin,
                    is_company: user.is_company,
                    is_online: true,
                    messages: ['welcome back!'],
                    token
                }
            } else {
                newState = {
                    ...state,
                    messages: [response]
                }
            }
            //console.log(newState)
            return newState
        })
        .addCase(cerrar_sesion.fulfilled, (state, action) => {
            //console.log(action.payload)
            localStorage.removeItem('token')
            let newState = {
                ...initialState,
                messages: ['see you soon!']
            }
            return newState
        })
 */
    }
)

export default accReducer