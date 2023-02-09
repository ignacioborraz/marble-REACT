import { createReducer } from '@reduxjs/toolkit'
import j_typeActions from './actions'

const { read_types,read_one_type } = j_typeActions

const initialState = {
    A304: [],
    A430: [],
    jhonsons: [],
    all: []
}

const typeReducer = createReducer(initialState,
    (builder) => {
        builder
        .addCase(read_types.fulfilled, (state, action) => {
            const { success,response } = action.payload
            const { A304,A430 } = response
            //console.log(action.payload)
            let newState = {}
            if (success) {
                newState = {
                    ...state,
                    A304,
                    A430,
                    all: [...A304,...A430]
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
        .addCase(read_one_type, (state, action) => {
            const { success,response } = action.payload
            //console.log(action.payload)
            let newState = {}
            if (success) {
                newState = {
                    ...state,
                    jhonsons: state[response]
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
        })/* 
        .addCase(filter_types.fulfilled, (state, action) => {
            const { success,type,code,response } = action.payload
            //console.log(action.payload)
            let newState = {}
            if (success && type==='A304') {
                newState = {
                    ...state,
                    filtered_A304: response,
                    code_A304: code
                }
            } else if (success && type==='A430') {
                newState = {
                    ...state,
                    filtered_A430: response,
                    code_A430: code
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
        .addCase(iniciar_sesion.fulfilled, (state, action) => {
            const { success,response } = action.payload
            console.log(action.payload)
            let newState = {}
            if (success) {
                const { user,token } = response
                localStorage.setItem('token',token)
                newState = {
                    ...state,
                    nick: user.nick,
                    photo: user.photo,
                    is_online: true,
                    messages: ['welcome!'],
                    token: token
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
        })
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

export default typeReducer