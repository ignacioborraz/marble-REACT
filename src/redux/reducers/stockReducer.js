const initialState = {
  stock: [],
  internalStock: [],
  filterInternalStock: [],
  filterNoteStock: [],
  noteStock: [],
  sinkCreate: [],
  doneStock: [],
  filterDoneStock: [],
};

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SINK":
      return {
        ...state,
        sinkCreate: action.payload,
      };
      case "GET_STOCK":
      return {
        ...state,
        stock: action.payload,
      };
    case "INTERNAL_STOCK":
      return {
        ...state,
        internalStock: action.payload,
        filterInternalStock: action.payload,
      };
    case "NOTE_STOCK":
      return {
        ...state,
        noteStock: action.payload,
        filterNoteStock: action.payload,
      };
      case "DONE_STOCK":
        return {
          ...state,
          doneStock: action.payload,
          filterDoneStock: action.payload,
        };
    case "FILTER_INTERNAL_STOCK":
      let internalfilter = state.internalStock.filter(
        (sink) =>
          sink.internal?.includes(action.payload.trim().toLowerCase())
      );
      return {
        ...state,
        filterInternalStock: internalfilter,
      };
    case "FILTER_NOTE_STOCK":
      let notefilter = state.noteStock.filter(
        (sink) =>sink.note?.includes(action.payload.trim().toLowerCase())
      );
      return {
        ...state,
        filterNoteStock: notefilter,
      };
      case "FILTER_DONE_STOCK":
      let donefilter = state.doneStock.filter(
        (sink) =>sink.note?.includes(action.payload.trim().toLowerCase())
      );
      return {
        ...state,
        filterDoneStock: donefilter,
      };

    default:
      return state;
  }
};
export default stockReducer;
