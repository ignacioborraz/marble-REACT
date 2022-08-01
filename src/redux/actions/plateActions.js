import axios from 'axios'
import apiUrl from '../../url'

const plateActions = {

    createPlate: (plate) => {
        const {lot,company,color,type,comments} = plate
        console.log(plate)
        return async(dispatch,getState) => {
            try {
                let res = await axios.post(apiUrl+'api/marble/plate',{lot,company,color,type,comments})
                console.log(res.data.response);
            } catch(error) {
                console.log(error)
            }            
        }
    },

    getPlates: () => {
        return async(dispatch, getState) => {
            try {
                const res = await axios.get(apiUrl+'api/marble/plate')
                console.log(res.data.response)
                dispatch({type:'GET_PLATES', payload: res.data.response})
            } catch(error) {
                console.log(error)
            }
        }
    },

    getOnePlate: (id) => {
        return async(dispatch, getState) => {
            try {
                const res = await axios.get(apiUrl+'api/marble/plate'+id)
                dispatch({type:'GET_ONE_PLATE', payload:res.data.response})
            } catch(error) {
                console.log(error)
            }
        }
    },

    putPlate: (id,data) => {
        return async(dispatch, getState) => {
            try {
                await axios.put(apiUrl+'api/marble/plate'+id,data)
            } catch(error) {
                console.log(error)
            }
        }
    },

    deletePlate: (id) => {
        return async(dispatch, getState) => {
            try {
                await axios.delete(apiUrl+'api/marble/plate'+id)
            } catch(error) {
                console.log(error)
            }
        }
    }

}

export default plateActions