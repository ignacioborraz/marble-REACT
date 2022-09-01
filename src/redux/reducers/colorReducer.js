const initialState = { //defino el estado inicial del reductor
    colors: [],
    filterColors: [],
    filt:[],
    oneColor: {}
}

const colorReducer = (state = initialState, action) => { //defino el reductor, que va a depender del estado inicial y de una accion
    //console.log(action)
    //console.log(state)
    switch(action.type) {
        case 'GET_COLORS':
            return {
                ...state,
                colors: action.payload,
                filterColors: action.payload
            }
        case 'GET_ONE_COLOR':
            return {
                ...state,
                oneColor: action.payload,
                
            }
        case 'FILTER_COLORS':
            let filter = state.colors.filter(color => color.name.trim().toLowerCase().startsWith(action.payload.trim().toLowerCase()))
            return {
                ...state,
                filterColors: filter,
                
            }
            case 'F_COLORS':
                
                return {
                    ...state,
                    filt: action.payload,
                    
                }
        default:
            return state
    }
}
export default colorReducer