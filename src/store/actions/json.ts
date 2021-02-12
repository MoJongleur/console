import {createActions} from 'redux-actions';

import {ActionTypes} from '../constants';
import {JsonPayload} from '../reducers/json';

export const {jsonPoke, jsonSuccess, jsonError, jsonDelete, jsonClear} = createActions({
  [ActionTypes.JSON_POKE]: (payload: JsonPayload) => payload,
  [ActionTypes.JSON_SUCCESS]: (payload: JsonPayload) => payload,
  [ActionTypes.JSON_ERROR]: (payload: JsonPayload) => payload,
  [ActionTypes.JSON_DELETE]: (payload: JsonPayload) => payload,
  [ActionTypes.JSON_CLEAR]: (payload: JsonPayload) => payload,
});
