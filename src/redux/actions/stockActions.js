import axios from "axios";
import apiUrl from "../../url";

const stockActions = {
  createStock: (data) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      try {
        const res=await axios.post(apiUrl + "api/marble/stock", data, {
          headers: { Authorization: "Bearer " + token },
        })
        console.log("🚀 ~ file: stockActions.js ~ line 12 ~ return ~ res", res)
        dispatch({type:'STOCK'});
      } catch (error) {
        console.log(error);
      }
    };
  },
internalStock: () => {
  const token = localStorage.getItem("token");
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(apiUrl + "api/marble/stock?internal=true", {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(
        "🚀 ~ file: plateActions.js ~ line 53 ~ return ~ res",
        res.data.response
      );
      dispatch({ type: "INTERNAL_STOCK", payload: res.data.response });
    } catch (error) {
      console.log(error);
    }
  };
},
noteStock: () => {
  const token = localStorage.getItem("token");
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(apiUrl + "api/marble/stock?note=true", {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(
        "🚀 ~ file: plateActions.js ~ line 53 ~ return ~ res",
        res.data.response
      );
      dispatch({ type: "NOTE_STOCK", payload: res.data.response });
    } catch (error) {
      console.log(error);
    }
  };
},
doneStock: () => {
  const token = localStorage.getItem("token");
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(apiUrl + "api/marble/stock?done=true", {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(
        "🚀 ~ file: plateActions.js ~ line 53 ~ return ~ res",
        res.data.response
      );
      dispatch({ type: "DONE_STOCK", payload: res.data.response });
    } catch (error) {
      console.log(error);
    }
  };
},
filterInternalStock: (input) => {
  const token = localStorage.getItem("token");
  return (dispatch, getState) => {
    try {
      dispatch(
        { type: "FILTER_INTERNAL_STOCK", payload: input },
        { headers: { Authorization: "Bearer " + token } }
      );
    } catch (error) {
      console.log(error);
    }
  };
},
filterNoteStock: (input) => {
  const token = localStorage.getItem("token");
  return (dispatch, getState) => {
    try {
      dispatch(
        { type: "FILTER_NOTE_STOCK", payload: input },
        { headers: { Authorization: "Bearer " + token } }
      );
    } catch (error) {
      console.log(error);
    }
  };
},
filterDoneStock: (input) => {
  const token = localStorage.getItem("token");
  return (dispatch, getState) => {
    try {
      dispatch(
        { type: "FILTER_DONE_STOCK", payload: input },
        { headers: { Authorization: "Bearer " + token } }
      );
    } catch (error) {
      console.log(error);
    }
  };
},
putStock: (id, data) => {
  const token = localStorage.getItem("token");
  return async (dispatch, getState) => {
    try {
      const resp = await axios.put(apiUrl + "api/marble/stock/" + id, data, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log("🚀 ~ file: stockActions.js ~ line 86 ~ return ~ resp", resp)
    } catch (error) {
      console.log(error);
    }
  };
},
deleteStock: (id) => {
  const token = localStorage.getItem("token");
  return async (dispatch, getState) => {
    try {
      await axios.delete(apiUrl + "api/marble/stock/" + id, {
        headers: { Authorization: "Bearer " + token },
      });
    } catch (error) {
      console.log(error);
    }
  };
},
}
export default stockActions;