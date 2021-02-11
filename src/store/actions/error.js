import {createActions} from 'redux-actions';

import {ActionTypes} from 'src/store/constants';

export const {resetFailure, loginFailure, jsonRequestFailure, jsonStructureFailure} = createActions({
  [ActionTypes.RESET_FAILURE]: (payload) => payload,
  [ActionTypes.LOGIN_FAILURE]: (payload) => payload,
  [ActionTypes.JSON_REQUEST_FAILURE]: (payload) => payload,
  [ActionTypes.JSON_STRUCTURE_FAILURE]: (payload) => payload,
});
