import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}
const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.AUTH_START:
      return updateObject(state, {error: null, loading: true});
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
      });
    case actionTypes.AUTH_FAILURE:
      return updateObject(state, {
        error: action.error,
        loading: false
      });
    case actionTypes.LOGOUT:
      return updateObject(state, {
        token: null,
        userId: null
      });
    default:
      return state;
  }
};

export default reducer;
