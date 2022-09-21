import axios from 'axios'
import apiUrl from '../../url'

const typeActions = {

    getTypes: (id) => {
        const token = localStorage.getItem('token')
        //console.log(id);
        return async(dispatch, getState) => {
            try {
                const res = await axios.get(apiUrl+'api/marble/types/'+id, {headers: {'Authorization': 'Bearer '+token}})
                dispatch({type:'GET_TYPES', payload: res.data.response})
            } catch(error) {
                console.log(error)
            }
        }
    },
    putType: (id, data) => {
        const token = localStorage.getItem("token");
        return async (dispatch, getState) => {
          try {
            await axios.put(apiUrl + 'api/marble/type/' + id, data, {
              headers: { Authorization: "Bearer " + token },
            });
          } catch (error) {
            console.log(error);
          }
        };
      },

}

export default typeActions