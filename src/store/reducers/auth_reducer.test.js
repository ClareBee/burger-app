import reducer from './auth_reducer';
import * as actionTypes from '../actions/actionTypes';

describe('authReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });

  it('should store the token on login', () => {
    expect(reducer({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    }, {
      type: actionTypes.AUTH_SUCCESS,
      token: 'some-token',
      userId: 'some-userId'
    })).toEqual({
      token: 'some-token',
      userId: 'some-userId',
      error: null,
      loading: false,
      authRedirectPath: '/'
    })
  })
});
