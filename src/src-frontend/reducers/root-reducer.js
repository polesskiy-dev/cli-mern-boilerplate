import { combineReducers } from 'redux-immutable';

/**combine reducers*/
const rootReducer = combineReducers({
  example: (data = {}, action)=> {
    switch (action.type) {
      default:
        return data
    }
  },
});

export default rootReducer;
