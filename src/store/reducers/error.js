import {handleActions} from 'redux-actions';

import {ActionTypes} from 'src/store/constants';

export const initialState = {
  loginError: null,
  jsonErrorRequest: null,
  jsonErrorStructure: null
};

export default {
  error: handleActions(
    {
      [ActionTypes.LOGIN_FAILURE]: (state, {payload}) => {
        return {
          ...state,
          loginError: payload
        };
      },
      [ActionTypes.JSON_REQUEST_FAILURE]: (state) => {
        return {
          ...state,
          jsonErrorRequest: true
        };
      },
      [ActionTypes.JSON_STRUCTURE_FAILURE]: (state) => {
        return {
          ...state,
          jsonErrorStructure: true
        };
      },
      [ActionTypes.RESET_FAILURE]: (state) => {
        return {
          ...state,
          loginError: null,
          jsonErrorRequest: null,
          jsonErrorStructure: null
        };
      },
    },
    initialState
  ),
};
