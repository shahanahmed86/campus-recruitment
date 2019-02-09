import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from "./reducer";

const store = createStore(reducer, applyMiddleware(thunk));

// store.subscribe(() => console.log(store.getState()));

export default store;