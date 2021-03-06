import {all, put, takeLatest} from 'redux-saga/effects';
import api from 'src/helpers/sendsay';

import {ActionTypes} from 'src/store/constants';
import {jsonError, jsonSuccess, resetFailure} from 'src/store/actions';

export function* jsonPoke({payload}) {
  yield put(resetFailure());

  const idx = payload.json.findIndex(el => Object.values(el.query)[0] === Object.values(JSON.parse(payload.value))[0] );

  let newPayload = idx >= 0 ? payload.json.filter((el, i) => i != idx) : payload.json;
  newPayload = newPayload.slice(0, 14);

  try {
    const result = yield api.sendsay.request(JSON.parse(payload.value));
    yield put(jsonSuccess({result, payload: newPayload, value: payload.value}));
  } catch (error) {
    yield put(jsonError({error, payload: newPayload, value: payload.value}));
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.JSON_POKE, jsonPoke),
  ]);
}
