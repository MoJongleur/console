import {createActions} from 'redux-actions';

import {ActionTypes} from '../constants';
import {AuthPayload} from '../reducers/auth';

export const {authenticate, authenticateSuccess, authenticateCheck, authenticateFailure, logout} = createActions({
  [ActionTypes.AUTHENTICATE]: (payload: AuthPayload) => payload,
  [ActionTypes.AUTHENTICATE_CHECK]: (payload: AuthPayload) => payload,
  [ActionTypes.AUTHENTICATE_SUCCESS]: (payload: AuthPayload) => payload,
  [ActionTypes.AUTHENTICATE_FAILURE]: (payload: AuthPayload) => payload,
  [ActionTypes.LOGOUT]: (payload: AuthPayload) => payload,
});
