const initialState = {
  internalSink: [],
  filterInternalSink: [],
  filterNoteSink: [],
  noteSink: [],
  sinkCreate: [],
};

const sinkReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SINK":
      return {
        ...state,
        sinkCreate: action.payload,
      };
    case "INTERNAL_SINK":
      return {
        ...state,
        internalSink: action.payload,
        filterInternalSink: action.payload,
      };
    // case "FILTER_INTERNAL_SINK":
    //   return {
    //     ...state,
    //     filterInternalSink: action.payload,
    //   };
    case "NOTE_SINK":
      return {
        ...state,
        noteSink: action.payload,
        filterNoteSink: action.payload,
      };
    case "FILTER_INTERNAL_SINK":
      let internalfilter = state.internalSink.filter(
        (sink) =>
          sink.jhonson.code
            .toLowerCase()
            .includes(action.payload.trim().toLowerCase()) ||
          sink.internal?.includes(action.payload.trim()) 
      );
      return {
        ...state,
        filterInternalSink: internalfilter,
      };
      case "FILTER_NOTE_SINK":
      let notefilter = state.noteSink.filter(
        (sink) =>
          sink.jhonson.code
            .toLowerCase()
            .includes(action.payload.trim().toLowerCase()) ||
          sink.note?.includes(action.payload.trim()) 
      );
      return {
        ...state,
        filterNoteSink: notefilter,
      };

    default:
      return state;
  }
};
export default sinkReducer;
