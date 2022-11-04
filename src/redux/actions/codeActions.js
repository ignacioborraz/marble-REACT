import axios from "axios";
import apiUrl from "../../url";

const codeActions = {
  createCode: (data) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      try {
        const res=await axios.post(apiUrl + "api/marble/code", data, {
          headers: { Authorization: "Bearer " + token },
        })
        console.log("🚀 ~ file: stockActions.js ~ line 12 ~ return ~ res", res)
        dispatch({type:'CODE'});
      } catch (error) {
        console.log(error);
      }
    };
  },
  getCode: () => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(apiUrl + "api/marble/code", {
          headers: { Authorization: "Bearer " + token },
        });
        console.log("🚀 ~ file: stockActions.js ~ line 12 ~ return ~ res", res);
        dispatch({ type: "GET_CODE", payload: res.data.response});
      } catch (error) {
        console.log(error);
      }
    };
  },
  internalCode: () => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(apiUrl + "api/marble/code?internal=true", {
          headers: { Authorization: "Bearer " + token },
        });
        console.log(
          "🚀 ~ file: plateActions.js ~ line 53 ~ return ~ res",
          res.data.response
        );
        dispatch({ type: "INTERNAL_CODE", payload: res.data.response });
      } catch (error) {
        console.log(error);
      }
    };
  },
  noteCode: () => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(apiUrl + "api/marble/code?note=true", {
          headers: { Authorization: "Bearer " + token },
        });
        console.log(
          "🚀 ~ file: plateActions.js ~ line 53 ~ return ~ res",
          res.data.response
        );
        dispatch({ type: "NOTE_CODE", payload: res.data.response });
      } catch (error) {
        console.log(error);
      }
    };
  },
  filterInternalCode: (input) => {
    const token = localStorage.getItem("token");
    return (dispatch, getState) => {
      try {
        dispatch(
          { type: "FILTER_INTERNAL_CODE", payload: input },
          { headers: { Authorization: "Bearer " + token } }
        );
      } catch (error) {
        console.log(error);
      }
    };
  },
  filterNoteCode: (input) => {
    const token = localStorage.getItem("token");
    return (dispatch, getState) => {
      try {
        dispatch(
          { type: "FILTER_NOTE_CODE", payload: input },
          { headers: { Authorization: "Bearer " + token } }
        );
      } catch (error) {
        console.log(error);
      }
    };
  },
};
export default codeActions;
