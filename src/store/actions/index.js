import actionsTypes from '../actions/types';

const actions = {
    fetchData: data => {
        return dispatch => {
            dispatch({ type: actionsTypes.FETCHDATA, payload: data });
        }
    }
}

export default actions;