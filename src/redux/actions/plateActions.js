import axios from 'axios'
import apiUrl from '../../url'

const plateActions = {

    createPlate: (name,type,photo,height,heightSquare,width,widthSquare,thickness,lot,state,company) => {
        return async(dispatch,getState) => {
            try {
                await axios.post(apiUrl+'api/marble/plate',{name,type,photo,height,heightSquare,width,widthSquare,thickness,lot,state,company})    
            } catch(error) {
                console.log(error)
            }            
        }
    },

    getPlates: () => {
        return async(dispatch, getState) => {
            try {
                const res = await axios.get(apiUrl+'api/marble/plate')
                //console.log(res)
                let sortedRes = res.data.response.sort((a,b)=>b.nameCompany-a.nameCompany)
                dispatch({type:'GET_PLATES', payload: sortedRes})
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