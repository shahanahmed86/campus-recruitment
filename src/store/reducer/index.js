import actionsTypes from '../actions/types';

const initialState = {
    profiles: {},
    currentUser: {},
    isLoading: false,
    isSignUp: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.FETCHDATA: {
            return {
                ...state,
                profiles: action.payload
            }
        }
        case actionsTypes.ISLOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case actionsTypes.ISSIGNUP: {
            return {
                ...state,
                isSignUp: action.payload
            }
        }
        case actionsTypes.CURRENTUSER: {
            return {
                ...state,
                currentUser: action.payload
            }
        }
        case actionsTypes.CLEAR: {
            return {
                ...state,
                currentUser: {},
                profiles: {}
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