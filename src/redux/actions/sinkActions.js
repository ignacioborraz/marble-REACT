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

  internalSink: () => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(apiUrl + "api/marble/sink?internal=true", {
          headers: { Authorization: "Bearer " + token },
        });
        console.log(
          "🚀 ~ file: plateActions.js ~ line 53 ~ return ~ res",
          res.data.response
        );
        dispatch({ type: "INTERNAL_SINK", payload: res.data.response });
      } catch (error) {
        console.log(error);
      }
    };
  },
  noteSink: () => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(apiUrl + "api/marble/sink?note=true", {
          headers: { Authorization: "Bearer " + token },
        });
        console.log(
          "🚀 ~ file: plateActions.js ~ line 53 ~ return ~ res",
          res.data.response
        );
        dispatch({ type: "NOTE_SINK", payload: res.data.response });
      } catch (error) {
        console.log(error);
      }
    };
  },
  // filterInternalSink: (input) => {
  //   const token = localStorage.getItem("token");
  //   return async (dispatch, getState) => {
  //     try {
  //       const res = await axios.get(
  //         apiUrl + "api/marble/sink?internal=" + input,
  //         { headers: { Authorization: "Bearer " + token } }
  //       );
  //       //console.log(res.data.response)
  //       dispatch({ type: "FILTER_INTERNAL_SINK", payload: res.data.response });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  // },
  filterInternalSink: (input) => {
    const token = localStorage.getItem("token");
    return (dispatch, getState) => {
      try {
        dispatch(
          { type: "FILTER_INTERNAL_SINK", payload: input },
          { headers: { Authorization: "Bearer " + token } }
        );
      } catch (error) {
        console.log(error);
      }
    };
  },
  filterNoteSink: (input) => {
    const token = localStorage.getItem("token");
    return (dispatch, getState) => {
      try {
        dispatch(
          { type: "FILTER_NOTE_SINK", payload: input },
          { headers: { Authorization: "Bearer " + token } }
        );
      } catch (error) {
        console.log(error);
      }
    };
  },
  filterSentSink: (input) => {
    const token = localStorage.getItem("token");
    return (dispatch, getState) => {
      try {
        dispatch(
          { type: "FILTER_SENT_SINK", payload: input },
          { headers: { Authorization: "Bearer " + token } }
        );
      } catch (error) {
        console.log(error);
      }
    };
  },
  deleteSink: (id) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      try {
        await axios.delete(apiUrl + "api/marble/sink/" + id, {
          headers: { Authorization: "Bearer " + token },
        });
      } catch (error) {
        console.log(error);
      }
    };
  },
  putSink: (id, data) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      try {
        await axios.put(apiUrl + "api/marble/sink/" + id, data, {
          headers: { Authorization: "Bearer " + token },
        });
      } catch (error) {
        console.log(error);
      }
    };
  },
};

export default johnsonActions;
