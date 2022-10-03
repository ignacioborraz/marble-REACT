import axios from "axios";
import apiUrl from "../../url";

const colorActions = {
  createColor: (name, photo, company) => {
    const token = localStorage.getItem('token')    
    return async (dispatch, getState) => {
      try {
        await axios.post(apiUrl + "api/marble/color", { name, photo, company }, {headers: {'Authorization': 'Bearer '+token}});
      } catch (error) {
        console.log(error);
      }
    };
  },

  getColors: (id,input) => {
    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(apiUrl + `api/marble/color?cia=${id}&&name=${input}`, {headers: {'Authorization': 'Bearer '+token}}
        );
        dispatch({ type: "GET_COLORS", payload: res.data.response });
      } catch (error) {
        console.log(error);
      }
    };
  },

  getOneColor: (id) => {
    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(apiUrl + "api/marble/color" + id);
        dispatch({ type: "GET_ONE_COLOR", payload: res.data.response }, {headers: {'Authorization': 'Bearer '+token}});
      } catch (error) {
        console.log(error);
      }
    };
  },

  putColor: (id, data) => {
    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {
      try {
        await axios.put(apiUrl + "api/marble/color" + id, data, {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
  },

  deleteColor: (id) => {
    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {
      try {
        await axios.delete(apiUrl + "api/marble/color" + id, {headers: {'Authorization': 'Bearer '+token}});
      } catch (error) {
        console.log(error);
      }
    };
  },

  newPlate: (id) => {
    return async(dispatch, getState) => {
      dispatch({type:'PLATE_COLOR', payload: id})
    }
  }

};

export default colorActions;
