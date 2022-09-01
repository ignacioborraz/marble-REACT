import axios from "axios";
import apiUrl from "../../url";

const colorActions = {
  createColor: (name, photo, company) => {
    return async (dispatch, getState) => {
      try {
        await axios.post(apiUrl + "api/marble/color", { name, photo, company });
      } catch (error) {
        console.log(error);
      }
    };
  },

  getColors: (id) => {
    //console.log(id);
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(apiUrl + "api/marble/colors/" + id);
        //console.log(res.data.response)
        dispatch({ type: "GET_COLORS", payload: res.data.response });
      } catch (error) {
        console.log(error);
      }
    };
  },
  // filterc: (input,id) => {
  //   //console.log(id);
  //   return async (dispatch, getState) => {
  //     try {
  //       const res = await axios.get("http://localhost:8000/api/marble/colors/" +id+"?color=" + input);
  //       //console.log(res.data.response)
  //       dispatch({ type: "F_COLORS", payload: res.data.response });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  // },
  filterColors: (input) => {
    return (dispatch, getState) => {
      try {
        dispatch({ type: "FILTER_COLORS", payload: input });
      } catch (error) {
        console.log(error);
      }
    };
  },

  getOneColor: (id) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(apiUrl + "api/marble/color" + id);
        dispatch({ type: "GET_ONE_COLOR", payload: res.data.response });
      } catch (error) {
        console.log(error);
      }
    };
  },

  putColor: (id, data) => {
    return async (dispatch, getState) => {
      try {
        await axios.put(apiUrl + "api/marble/color" + id, data);
      } catch (error) {
        console.log(error);
      }
    };
  },

  deleteColor: (id) => {
    return async (dispatch, getState) => {
      try {
        await axios.delete(apiUrl + "api/marble/color" + id);
      } catch (error) {
        console.log(error);
      }
    };
  },
};

export default colorActions;
