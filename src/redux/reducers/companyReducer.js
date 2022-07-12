const initialState = { //defino el estado inicial del reductor
    companies: [],
    filterCompanies: [],
    oneCompany: {}
}

const companyReducer = (state = initialState, action) => { //defino el reductor, que va a depender del estado inicial y de una accion
    //console.log(action)
    //console.log(state)
    switch(action.type) {
        case 'GET_COMPANIES':
            return {
                ...state,
                companies: action.payload
            }
        case 'GET_ONE_COMPANY':
            return {
                ...state,
                oneCompany: action.payload
            }
        default:
            return state
    }
}
export default companyReducer