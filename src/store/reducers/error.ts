import {handleActions} from 'redux-actions';

import {ActionTypes} from '../constants';

export interface ErrorProps {
  loginError: boolean | null;
  jsonErrorRequest: boolean | null;
  jsonErrorStructure: boolean | null;
}

export const initialState: ErrorProps = {
  loginError: null,
  jsonErrorRequest: null,
  jsonErrorStructure: null
};

export default {
  error: handleActions<ErrorProps, boolean>(
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
