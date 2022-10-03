const initialState = { //defino el estado inicial del reductor
    colors: [],
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
        default:
            return state
    }
}
export default colorReducer