import { takeEvery } from 'redux-saga';
import * as actionTypes from '../actions/actionTypes';
import { logoutSaga } from './auth';

export function* watchAuth(){
  // actions like a listener, 2nd param as the function to execute
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
}
