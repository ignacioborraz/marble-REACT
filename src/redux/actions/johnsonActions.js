import axios from "axios";
import apiUrl from "../../url";

const johnsonActions = {
  createSink: (sink) => {
    const token = localStorage.getItem("token");
    console.log(sink);
    return async (dispatch, getState) => {
      try {
        let res = await axios.post(apiUrl + "api/marble/sink", sink, {
          headers: { Authorization: "Bearer " + token },
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
  },
  getJohnsonType: (type) => {
    const token = localStorage.getItem("token");
    //console.log(token)
    //console.log(id);
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(
          apiUrl + "api/marble/jhonson?type=" + type,
          { headers: { Authorization: "Bearer " + token } }
        );
        //console.log(res.data.response)
        dispatch({ type: "GET_JOHNSON_TYPE", payload: res.data.response });
      } catch (error) {
        console.log(error);
      }
    };
  },
  filterJohnsonType: (input, type) => {
    const token = localStorage.getItem("token");
    //console.log(id);
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(apiUrl + "api/marble/jhonson?type=" + type + "&code=" + input, 
        { headers: { Authorization: "Bearer " + token } });
        //console.log(res.data.response)
        dispatch({ type: "F_JOHNSON_TYPE", payload: res.data.response });
      } catch (error) {
        console.log(error);
      }
    };
  },
  getAccesory: () => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(
          apiUrl + "api/marble/accesory?" ,
          { headers: { Authorization: "Bearer " + token } }
        );
        //console.log(res.data.response)
        dispatch({ type: "GET_ACCESORY", payload: res.data.response });
      } catch (error) {
        console.log(error);
      }
    };
  },
  filterAccesory: (input) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(
          apiUrl + "api/marble/accesory?code=" + input,
          { headers: { Authorization: "Bearer " + token } }
        );
        //console.log(res.data.response)
        dispatch({ type: "FILTER_ACCESORY", payload: res.data.response });
      } catch (error) {
        console.log(error);
      }
    };
  },

  getOneJohnson: (id) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(apiUrl + "api/marble/jhonson/" + id, {
          headers: { Authorization: "Bearer " + token },
        });
        dispatch({ type: "GET_ONE_JOHNSON", payload: res.data.response });
      } catch (error) {
        console.log(error);
      }
    };
  },

  putPlate: (id, data) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      try {
        await axios.put(apiUrl + "api/marble/plate/" + id, data, {
          headers: { Authorization: "Bearer " + token },
        });
      } catch (error) {
        console.log(error);
      }
    };
  },

  deleteJohnson: (id) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      try {
        await axios.delete(apiUrl + "api/marble/plate/" + id, {
          headers: { Authorization: "Bearer " + token },
        });
      } catch (error) {
        console.log(error);
      }
    };
  },
};

export default johnsonActions;
