import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/reducers'
import alertReducer from './alert/reducers'
import typeReducer from './jhonson-1-type/reducers'
import accReducer from './jhonson-2-acc/reducers'
import codeReducer from './jhonson-3-sink/reducers'

const store = configureStore({
    reducer: {
        auth: authReducer,
        alert: alertReducer,
        jhonsons: typeReducer,
        accesories: accReducer,
        codes: codeReducer
    }
})

export default store