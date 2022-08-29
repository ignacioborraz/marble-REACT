import axios from 'axios'
import apiUrl from '../../url'

const typeActions = {

    getTypes: (id) => {
        //console.log(id);
        return async(dispatch, getState) => {
            try {
                const res = await axios.get(apiUrl+'api/marble/types/'+id)
                dispatch({type:'GET_TYPES', payload: res.data.response})
            } catch(error) {
                console.log(error)
            }
        }
    }

}

export default typeActions