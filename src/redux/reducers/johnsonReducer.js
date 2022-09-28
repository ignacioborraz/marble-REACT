const initialState = {
  johnsonType: [],
  filterJohnsonType: [],
  accesorys: [],
  filterAccesory: [],
  oneJohnson: {},
};

const johnsonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_JOHNSON_TYPE":
      return {
        ...state,
        johnsonType: action.payload,
        filterJohnsonType: action.payload,
      };
    case "F_JOHNSON_TYPE":
      return {
        ...state,
        filterJohnsonType: action.payload,
      };
    case "GET_ACCESORY":
      return {
        ...state,
        accesorys: action.payload,
        filterAccesory: action.payload,
      };
    case "FILTER_ACCESORY":
      return {
        ...state,
        filterAccesory: action.payload,
      };
    case "GET_ONE_JOHNSON":
      return {
        ...state,
        oneJohnson: action.payload,
      };
    default:
      return state;
  }
};
export default johnsonReducer;
