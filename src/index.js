import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/index.css'

import App from './App'

import {BrowserRouter} from 'react-router-dom'

import {Provider} from 'react-redux'
import {configureStore as createStore} from '@reduxjs/toolkit'
import mainReducer from './redux/reducers/mainReducer'

const reduxStore = createStore({reducer: mainReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ //error de mutacion
        immutableCheck: false,
        serializableCheck: false,
   })})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <Provider store={reduxStore}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)