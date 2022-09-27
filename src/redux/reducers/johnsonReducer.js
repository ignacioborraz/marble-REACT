const initialState = {
  plates: [],
  internalPlate: [],
  notePlate: [],
  donePlate: [],
  johnsonType: [],
  filterJohnsonType: [],
  accesorys: [],
  filterAccesory:[],
  oneJohnson: {},
};

const johnsonReducer = (state = initialState, action) => {
  switch (action.type) {
    //   case "GET_PLATES":
    //     return {
    //       ...state,
    //       plates: action.payload,
    //     };
    //   case "GET_ONE_PLATE":
    //     return {
    //       ...state,
    //       onePlate: action.payload,
    //     };
    case "GET_JOHNSON_TYPE":
      return {
        ...state,
        johnsonType: action.payload,
        filterJohnsonType: action.payload
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

    //   case "FILTER_INTERNAL_PLATES":
    //     let internalfilter = state.internalPlate.filter(
    //       (plate) =>
    //         plate.color.name
    //           .toLowerCase()
    //           .startsWith(action.payload.trim().toLowerCase()) ||
    //         plate.internal?.startsWith(action.payload.trim()) ||
    //         plate.company.nameCompany
    //           .toLowerCase()
    //           .startsWith(action.payload.trim().toLowerCase())
    //     );
    //     return {
    //       ...state,
    //       filterInternalPlates: internalfilter,
    //     };
    //   case "FILTER_NOTE_PLATES":
    //     let noteFilter = state.notePlate.filter(
    //       (plate) =>
    //         plate.color.name
    //           .toLowerCase()
    //           .startsWith(action.payload.trim().toLowerCase()) ||
    //         plate.note?.startsWith(action.payload.trim()) ||
    //         plate.company.nameCompany
    //           .toLowerCase()
    //           .startsWith(action.payload.trim().toLowerCase())
    //     );
    //     return {
    //       ...state,
    //       filterNotePlates: noteFilter,
    //     };
    //   case "FILTER_DONE_PLATES":
    //     let doneFilter = state.donePlate.filter(
    //       (plate) =>
    //         plate.color.name
    //           .toLowerCase()
    //           .startsWith(action.payload.trim().toLowerCase()) ||
    //         plate.internal?.startsWith(action.payload.trim()) ||
    //         plate.note?.startsWith(action.payload.trim()) ||
    //         plate.company.nameCompany
    //           .toLowerCase()
    //           .startsWith(action.payload.trim().toLowerCase())
    //     );
    //     return {
    //       ...state,

    //       filterDonePlates: doneFilter,
    //     };

    default:
      return state;
  }
};
export default johnsonReducer;
