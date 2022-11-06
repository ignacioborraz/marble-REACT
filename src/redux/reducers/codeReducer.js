const initialState = {
  code: [],
  noteCode: [],
  internalCode: [],
  doneCode: [],
  internalStock: [],
  filterInternalCode: [],
  filterNoteCode: [],
  sinkCreate: [],
  filterDoneCode: [],
};

const codeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CODE":
      return {
        ...state,
        code: action.payload,
      };
    case "NOTE_CODE":
      return {
        ...state,
        noteCode: action.payload,
        filterNoteCode: action.payload,
      };
    case "DONE_CODE":
      return {
        ...state,
        doneCode: action.payload,
        filterDoneCode: action.payload,
      };
    case "INTERNAL_CODE":
      return {
        ...state,
        internalCode: action.payload,
        filterInternalCode: action.payload,
      };
    case "FILTER_INTERNAL_CODE":
      let internalfilter = state.internalCode.filter((item) =>
        item.internal?.includes(action.payload.trim().toLowerCase())
      );
      return {
        ...state,
        filterInternalCode: internalfilter,
      };
    case "FILTER_NOTE_CODE":
      let notefilter = state.noteCode.filter((item) =>
        item.note?.includes(action.payload.trim().toLowerCase())
      );
      return {
        ...state,
        filterNoteCode: notefilter,
      };
      case "FILTER_DONE_STOCK":
         let donefilter = state.doneCode.filter((item) =>
           item.note?.includes(action.payload.trim().toLowerCase())
         );
         return {
           ...state,
           filterDoneCode: donefilter,
         };
    default:
      return state;
  }
};
export default codeReducer;
