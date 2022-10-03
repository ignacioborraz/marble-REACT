import axios from 'axios'
import apiUrl from '../../url'

const typeActions = {

    getTypes: (id) => {
        const token = localStorage.getItem('token')
        return async(dispatch, getState) => {
            try {
                const res = await axios.get(apiUrl+`api/marble/type?cia=${id}`, {headers: {'Authorization': 'Bearer '+token}})
                dispatch({type:'GET_TYPES', payload: res.data.response})
            } catch(error) {
                console.log(error)
            }
        }
    },

    newPlate: (id) => {
        return async(dispatch, getState) => {
            dispatch({type:'PLATE_TYPE', payload: id})
        }
    }

}

export default typeActions