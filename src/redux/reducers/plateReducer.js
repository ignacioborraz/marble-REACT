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
                plates: action.payload,
                filterPlates:action.payload,
            }
        case 'GET_ONE_PLATE':
            return {
                ...state,
                onePlate: action.payload
            }
         case 'FILTER_PLATES':
            
            let filter = state.plates.filter(plate => plate.color.name.toLowerCase().startsWith(action.payload.trim().toLowerCase()) || plate.internal?.startsWith(action.payload.trim()) || plate.note?.startsWith(action.payload.trim()) || plate.company.nameCompany.toLowerCase().startsWith(action.payload.trim().toLowerCase()))
            return {
               
                ...state,
                
                filterPlates: filter
            } 
        default:
            return state
    }
}
export default plateReducer