import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
// function* turns function into generator ie can be executed incrementally
// ability to pause works well w async code
export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}


export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime);
  yield put(actions.logout());
}
