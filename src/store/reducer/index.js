import actionsTypes from '../actions/types';

const initialState = {
    profile: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.FETCHDATA: {
            return {
                ...state,
                profile: action.payload
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default reducer;