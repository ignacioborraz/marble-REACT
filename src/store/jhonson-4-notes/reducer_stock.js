import { createReducer } from '@reduxjs/toolkit'
import j_codeActions from './actions'

const { get_all } = j_codeActions

const initialState = {
    accesories_stock_1: [],
    accesories_stock_2: [],
    accesories_stock_3: [],
    ksinks_stock_1: [],
    ksinks_stock_2: [],
    ksinks_stock_3: [],
    plates: {}
}

const stockReducer = createReducer(initialState,
    (builder) => {
        builder
        .addCase(get_all.fulfilled, (state, action) => {
            //console.log(action.payload.response)
            const { success,response } = action.payload
            const { accesories,ksinks,plates } = response
            let newState = {}
            if (success) {
                newState = {
                    ...state,
                    accesories_stock_1: accesories.stock_1,
                    accesories_stock_2: accesories.stock_2,
                    accesories_stock_3: accesories.stock_3,
                    ksinks_stock_1: ksinks.stock_1,
                    ksinks_stock_2: ksinks.stock_2,
                    ksinks_stock_3: ksinks.stock_3,
                    plates: plates
                }
            } else {
                //console.log(response)
                newState = {
                    ...state,
                    accesories_stock_1: [],
                    accesories_stock_2: [],
                    accesories_stock_3: [],
                    ksinks_stock_1: [],
                    ksinks_stock_2: [],
                    ksinks_stock_3: [],
                    plates: {}
                }
            }
            //console.log(newState)
            return newState
        })
    }
)

export default stockReducer