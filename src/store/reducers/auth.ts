import {Action, handleActions} from 'redux-actions';

import {ActionTypes} from '../constants';

export interface AuthProps {
  loading: boolean;
  sessionKey: string | unknown;
  login: string | unknown;
  sublogin: string | unknown;
}

export interface AuthPayload {
  loading: boolean;
  sessionKey: string | unknown;
  login: string | unknown;
  sublogin: string | unknown;
  password: string | unknown;
}

export const initialState = {
  loading: false,
  sessionKey: null,
  login: null,
  sublogin: null,
};

export default {
  auth: handleActions<AuthProps, AuthPayload>(
    {
      [ActionTypes.AUTHENTICATE]: (state: AuthProps) => {
        return {
          ...state,
          loading: true,
        };
      },
      [ActionTypes.AUTHENTICATE_SUCCESS]: (state: AuthProps, {payload}: Action<AuthPayload>) => {
        return {
          ...state,
          loading: false,
          sessionKey: payload.sessionKey,
          login: payload.login,
          sublogin: payload.sublogin,
        };
      },
      [ActionTypes.AUTHENTICATE_FAILURE]: (state: AuthProps) => {
        return {
          ...state,
          sessionKey: null,
          login: null,
          sublogin: null,
          loading: false,
        };
      },
      [ActionTypes.LOGOUT]: (state: AuthProps) => {
        return {
          ...state,
          loading: false,
          sessionKey: null,
        };
      },
    },
    initialState
  ),
};
