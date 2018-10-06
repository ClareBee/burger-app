import { put } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

// function* turns function into generator ie can be executed incrementally
// ability to pause works well w async code
export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put({
    type: actionTypes.AUTH_LOGOUT,
  });
}
