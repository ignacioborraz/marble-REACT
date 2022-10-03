const initialState = {
    plate: {
        company: null,
        color: null,
        type: null,
    },
    sink: {}
}

const newNew = (state = initialState, action) => {
    switch(action.type) {
        case 'PLATE_CIA':
            return {
                ...state,
                plate: {
                    ...state.plate,
                    company: action.payload
                }
            }
        case 'PLATE_COLOR':
            return {
                ...state,
                plate: {
                    ...state.plate,
                    color: action.payload
                }
        }
        case 'PLATE_TYPE':
            return {
                ...state,
                plate: {
                    ...state.plate,
                    type: action.payload
                }
        }
        case 'PLATE':
            return {
                ...state,
                plate: {
                    company: null,
                    color: null,
                    type: null,
                },
        }
        default:
            return state
    }
}
export default newNew