import {createActions} from 'redux-actions';

import {ActionTypes} from 'src/store/constants';

export const {jsonPoke, jsonSuccess, jsonError, jsonDelete, jsonClear} = createActions({
  [ActionTypes.JSON_POKE]: (payload) => payload,
  [ActionTypes.JSON_SUCCESS]: (payload) => payload,
  [ActionTypes.JSON_ERROR]: (payload) => payload,
  [ActionTypes.JSON_DELETE]: (payload) => payload,
  [ActionTypes.JSON_CLEAR]: (payload) => payload,
});
