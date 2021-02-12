import {createActions} from 'redux-actions';

import {ActionTypes} from '../constants';

export const {resetFailure, loginFailure, jsonRequestFailure, jsonStructureFailure} = createActions({
  [ActionTypes.RESET_FAILURE]: (payload: boolean) => payload,
  [ActionTypes.LOGIN_FAILURE]: (payload: boolean) => payload,
  [ActionTypes.JSON_REQUEST_FAILURE]: (payload: boolean) => payload,
  [ActionTypes.JSON_STRUCTURE_FAILURE]: (payload: boolean) => payload,
});
