const initialState = { //defino el estado inicial del reductor
    types: [],
    filterTypes: [],
    oneType: {}
}

const typeReducer = (state = initialState, action) => { //defino el reductor, que va a depender del estado inicial y de una accion
    //console.log(action)
    //console.log(state)
    switch(action.type) {
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        case 'GET_ONE_TYPE':
            return {
                ...state,
                oneType: action.payload
            }
        default:
            return state
    }
}
export default typeReducer