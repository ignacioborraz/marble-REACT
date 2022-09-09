const initialState = {
  plates: [],
  internalPlate: [],
  notePlate: [],
  donePlate: [],
  filterInternalPlates: [],
  filterNotePlates: [],
  filterDonePlates: [],
  onePlate: {},
};

const plateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PLATES":
      return {
        ...state,
        plates: action.payload,
      };
    case "GET_ONE_PLATE":
      return {
        ...state,
        onePlate: action.payload,
      };
    case "INTERNAL_PLATE":
      return {
        ...state,
        internalPlate: action.payload,
        filterInternalPlates: action.payload,
      };
    case "NOTE_PLATE":
      return {
        ...state,
        notePlate: action.payload,
        filterNotePlates: action.payload,
      };
    case "DONE_PLATE":
      return {
        ...state,
        donePlate: action.payload,
        filterDonePlates: action.payload,
      };

    case "FILTER_INTERNAL_PLATES":
      let internalfilter = state.internalPlate.filter(
        (plate) =>
          plate.color.name
            .toLowerCase()
            .startsWith(action.payload.trim().toLowerCase()) ||
          plate.internal?.startsWith(action.payload.trim()) ||
          plate.company.nameCompany
            .toLowerCase()
            .startsWith(action.payload.trim().toLowerCase())
      );
      return {
        ...state,
        filterInternalPlates: internalfilter,
      };
    case "FILTER_NOTE_PLATES":
      let noteFilter = state.notePlate.filter(
        (plate) =>
          plate.color.name
            .toLowerCase()
            .startsWith(action.payload.trim().toLowerCase()) ||
          plate.note?.startsWith(action.payload.trim()) ||
          plate.company.nameCompany
            .toLowerCase()
            .startsWith(action.payload.trim().toLowerCase())
      );
      return {
        ...state,
        filterNotePlates: noteFilter,
      };
    case "FILTER_DONE_PLATES":
      let doneFilter = state.donePlate.filter(
        (plate) =>
          plate.color.name
            .toLowerCase()
            .startsWith(action.payload.trim().toLowerCase()) ||
          plate.internal?.startsWith(action.payload.trim()) ||
          plate.note?.startsWith(action.payload.trim()) ||
          plate.company.nameCompany
            .toLowerCase()
            .startsWith(action.payload.trim().toLowerCase())
      );
      return {
        ...state,

        filterDonePlates: doneFilter,
      };

    default:
      return state;
  }
};
export default plateReducer;
