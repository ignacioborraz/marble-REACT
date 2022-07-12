//importo los componentes de REDUX:
import {combineReducers} from 'redux'

//importo los redutores de REDUX que se van a combinar:
import companyReducer from './companyReducer'
import jobReducer from './jobReducer'
import userReducer from './userReducer'

const mainReducer = combineReducers({companyReducer,jobReducer,userReducer})

export default mainReducer
