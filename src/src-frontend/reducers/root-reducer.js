import {combineReducers} from 'redux-immutable';

/**combine reducers*/
const rootReducer = combineReducers({example: (data = {}, action)=>data});

export default rootReducer;
