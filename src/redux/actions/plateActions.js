import axios from 'axios'
import apiUrl from '../../url'

const plateActions = {

    createPlate: (plate) => {
        const token = localStorage.getItem('token')
        console.log(plate)
        return async(dispatch,getState) => {
            try {
                let res = await axios.post('http://localhost:8000/api/marble/plates',plate, {headers: {'Authorization': 'Bearer '+token}})
                console.log(res.data.response);
            } catch(error) {
                console.log(error)
            }            
        }
    },

    getPlates: () => {
        return async(dispatch, getState) => {
            const token = localStorage.getItem('token')
            try {
                const res = await axios.get(apiUrl+'api/marble/plates', {headers: {'Authorization': 'Bearer '+token}})
                dispatch({type:'GET_PLATES', payload: res.data.response})
            } catch(error) {
                console.log(error)
            }
        }
    },

    getOnePlate: (id) => {
        const token = localStorage.getItem('token')
        return async(dispatch, getState) => {
            try {
                const res = await axios.get(apiUrl+'api/marble/plates/'+id, {headers: {'Authorization': 'Bearer '+token}})
                dispatch({type:'GET_ONE_PLATE', payload:res.data.response})
            } catch(error) {
                console.log(error)
            }
        }
    },

    putPlate: (id,data) => {
        const token = localStorage.getItem('token')
        return async(dispatch, getState) => {
            try {
                await axios.put(apiUrl+'api/marble/plates/'+id,data, {headers: {'Authorization': 'Bearer '+token}})
            } catch(error) {
                console.log(error)
            }
        }
    },

    deletePlate: (id) => {
        const token = localStorage.getItem('token')
        return async(dispatch, getState) => {
            try {
                await axios.delete(apiUrl+'api/marble/plates/'+id, {headers: {'Authorization': 'Bearer '+token}})
            } catch(error) {
                console.log(error)
            }
        }
    }

}

export default plateActions