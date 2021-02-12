// @ts-ignore
import {all, put, call, takeLatest} from 'redux-saga/effects';
import api from '../../helpers/sendsay';

import {ActionTypes} from '../constants';
import {authenticateSuccess, authenticateFailure} from '../actions/auth';
import {loginFailure} from '../actions/error';
import {resetFailure} from '../actions';
import {AuthPayload} from '../reducers/auth';

interface Payload {
  payload: AuthPayload
}

export function* authenticateCheckSaga() {
  try {
    yield api.sendsay.request({
      action: 'pong',
    });
  } catch (error) {
    if (error.id === 'error/auth/failed') {
      yield call(logoutSaga);
    }
  }
}

export function* authenticateSaga({payload}: Payload) {
  yield put(resetFailure());
  sessionStorage.setItem('logError', '');

  yield api.sendsay
    .login({
      login: payload.login,
      sublogin: payload.sublogin,
      password: payload.password,
    })
    .then(() => {
      document.cookie = `sendsay_session=${api.sendsay.session}`;
    })
    .catch((err: {id: any, explain: any}) => {
      sessionStorage.setItem('logError', JSON.stringify({id: err.id, explain: err.explain}));
    });

  if(sessionStorage.getItem('logError')) {
    yield put(loginFailure(sessionStorage.getItem('logError')));
    document.cookie = '';
    yield call(logoutSaga);
  } else {
    yield put(
      authenticateSuccess({
        sessionKey: api.sendsay.session,
        login: payload.login,
        sublogin: payload.sublogin,
      })
    );
  }
}

export function* logoutSaga() {
  yield put(authenticateFailure());
  document.cookie = '';
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.AUTHENTICATE, authenticateSaga),
    takeLatest(ActionTypes.AUTHENTICATE_CHECK, authenticateCheckSaga),
    takeLatest(ActionTypes.LOGOUT, logoutSaga),
  ]);
}
