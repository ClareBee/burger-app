import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index';
// function* turns function into generator ie can be executed incrementally
// ability to pause works well w async code
export function* logoutSaga(action) {
  // using call makes this testable via mocks
  yield call([localStorage, 'removeItem'], "token");
  yield call([localStorage, 'removeItem'], "expirationDate");
  yield call([localStorage, 'removeItem'], "userId");
  yield put(actions.logoutSucceed());
}


export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.REACT_APP_API}`;
  if(!action.isSignUp){
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.REACT_APP_API}`;
  }
  // execution pauses until resolved/rejected thanks to yield
  try {
  const response = yield axios.post(url, authData)
  const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
  yield localStorage.setItem('token', response.data.idToken);
  yield localStorage.setItem('expirationDate', expirationDate);
  yield localStorage.setItem('userId', response.data.localId);
  yield put(actions.checkAuthTimeout(response.data.expiresIn));
  yield put(actions.authSuccess(response.data.idToken, response.data.localId));
} catch (error) {
    yield put(actions.authFailure(error.response.data.error))
  }
}

export function* authCheckStateSaga(action){
  const token = yield localStorage.getItem('token');
  if(!token){
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()){
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem('userId')
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/ 1000 ))
    }
  }
}
