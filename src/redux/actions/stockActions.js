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
 }
 export default stockActions;