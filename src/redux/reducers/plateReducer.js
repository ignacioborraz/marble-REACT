const initialState = {
    plates: [],
    filterPlates: [],
    onePlate: {},
}

const plateReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_PLATES':
            return {
                ...state,
                plates: action.payload
            }
        case 'GET_ONE_PLATE':
            return {
                ...state,
                onePlate: action.payload
            }
/*         case 'FILTER_PLATES':
            let filter = state.plates.filter(everyJob => everyJob.nameJob.toLowerCase().startsWith(action.payload.trim().toLowerCase()))
            return {
                ...state,
                filterCity: filter
            } */
        default:
            return state
    }
}
export default plateReducer