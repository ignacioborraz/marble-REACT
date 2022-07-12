const initialState = { //defino el estado inicial del reductor
    jobs: [], //para contener todos los trabajos
    filterJobs: [], //para contener todos los trabajos filtrados
    oneJob: {}, //para contener un unico trabajo
}

const jobReducer = (state = initialState, action) => { //defino el reductor, que va a depender del estado inicial y de una accion
    //console.log(action)
    //console.log(state)
    switch(action.type) {
        case 'GET_JOBS':
            return {
                ...state,
                jobs: action.payload
            }
        case 'GET_ONE_JOB':
            return {
                ...state,
                oneJob: action.payload
            }
        case 'FILTER_JOBS':
            let filter = state.jobs.filter(everyJob => everyJob.nameJob.toLowerCase().startsWith(action.payload.trim().toLowerCase()))
            //console.log(action.payload)
            return {
                ...state,
                filterCity: filter
            }
        default:
            return state
    }
}
export default jobReducer