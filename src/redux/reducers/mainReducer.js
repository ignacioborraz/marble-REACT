//importo los componentes de REDUX:
import {combineReducers} from 'redux'

//importo los redutores de REDUX que se van a combinar:
import companyReducer from './companyReducer'
import plateReducer from './plateReducer'
import userReducer from './userReducer'

const mainReducer = combineReducers({companyReducer,plateReducer,userReducer})

export default mainReducer
