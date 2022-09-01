import axios from 'axios'
import apiUrl from '../../url'

const companyActions = {

    createCompany: (nameCompany,logoCompany,detailCompany) => {
        return async(dispatch,getState) => {
            try {
                await axios.post(apiUrl+'api/marble/company',{nameCompany,logoCompany,detailCompany})    
            } catch(error) {
                console.log(error)
            }            
        }
    },

    getCompanies: () => {
        return async(dispatch, getState) => {
            try {
                const res = await axios.get(apiUrl+'api/marble/company')
                dispatch({type:'GET_COMPANIES', payload: res.data.response})
            } catch(error) {
                console.log(error)
            }
        }
    },

    getOneCompany: (id) => {
        return async(dispatch, getState) => {
            try {
                const res = await axios.get(apiUrl+'api/marble/company/'+id)
                dispatch({type:'GET_ONE_COMPANY', payload: res.data.response})
            } catch(error) {
                console.log(error)
                
            }
        }
    },

    putCompany: (id,data) => {
        return async(dispatch, getState) => {
            try {
                await axios.put(apiUrl+'api/marble/company'+id,data)
            } catch(error) {
                console.log(error)
            }
        }
    },

    deleteCompany: (id) => {
        return async(dispatch, getState) => {
            try {
                await axios.delete(apiUrl+'api/marble/company'+id)
            } catch(error) {
                console.log(error)
            }
        }
    }

}

export default companyActions