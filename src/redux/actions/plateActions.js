import axios from "axios";
import apiUrl from "../../url";

const plateActions = {
  createPlate: (plate) => {
    const token = localStorage.getItem("token")
    return async (dispatch, getState) => {
      try {
        const res= await axios.post(apiUrl + "api/marble/plate", plate, {
          headers: { Authorization: "Bearer " + token },
        })
        console.log("🚀 ~ file: plateActions.js ~ line 12 ~ return ~ res", res)
        dispatch({type:'PLATE',  payload: res.data.response})
        return res.data.response
      } catch (error) {
        console.log(error);
      }
    };
  },
  filterInternalPlates: (input) => {
    const token = localStorage.getItem("token");
    return (dispatch, getState) => {
      try {
        dispatch(
          { type: "FILTER_INTERNAL_PLATES", payload: input },
          { headers: { Authorization: "Bearer " + token } }
        );
      } catch (error) {
        console.log(error);
      }
    };
  },
  filterNotePlates: (input) => {
    const token = localStorage.getItem("token");
    return (dispatch, getState) => {
      try {
        dispatch(
          { type: "FILTER_NOTE_PLATES", payload: input },
          { headers: { Authorization: "Bearer " + token } }
        );
      } catch (error) {
        console.log(error);
      }
    };
  },
  filterDonePlates: (input) => {
    const token = localStorage.getItem("token");
    return (dispatch, getState) => {
      try {
        dispatch(
          { type: "FILTER_DONE_PLATES", payload: input },
          { headers: { Authorization: "Bearer " + token } }
        );
      } catch (error) {
        console.log(error);
      }
    };
  },

  getPlates: () => {
    return async (dispatch, getState) => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(apiUrl + "api/marble/plates", {
          headers: { Authorization: "Bearer " + token },
        });
        dispatch({ type: "GET_PLATES", payload: res.data.response });
      } catch (error) {
        console.log(error);
      }
    };
  },
  internalPlate: () => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(apiUrl + "api/marble/plate?internal=true" , {
          headers: { Authorization: "Bearer " + token },
        });
        dispatch({ type: "INTERNAL_PLATE", payload: res.data.response });
      } catch (error) {
        console.log(error);
      }
    };
  },
  notePlate: () => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(apiUrl + "api/marble/plate?note=true", {
          headers: { Authorization: "Bearer " + token },
        });
        dispatch({ type: "NOTE_PLATE", payload: res.data.response });
      } catch (error) {
        console.log(error);
      }
    };
  },
  donePlate: () => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(apiUrl + "api/marble/plate?done=true", {
          headers: { Authorization: "Bearer " + token },
        });
        dispatch({ type: "DONE_PLATE", payload: res.data.response });
      } catch (error) {
        console.log(error);
      }
    };
  },

  getOnePlate: (id) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(apiUrl + "api/marble/plate/" + id, {
          headers: { Authorization: "Bearer " + token },
        });
        dispatch({ type: "GET_ONE_PLATE", payload: res.data.response });
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

  deletePlate: (id) => {
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

export default plateActions;
