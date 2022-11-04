const initialState = {
   code: [],
   noteCode: [],
   internalCode: [],
   internalStock: [],
   filterInternalCode: [],
   filterNoteCode: [],
   sinkCreate: [],
   filterDoneStock: [],
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
      default:
         return state;
   }
};
export default codeReducer;
