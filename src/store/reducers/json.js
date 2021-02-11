import {handleActions} from 'redux-actions';

import {ActionTypes} from 'src/store/constants';

export const initialState = {
  responses: [],
  status: 'init' // init, wait, success
};

export default {
  json: handleActions(
    {
      [ActionTypes.JSON_POKE]: (state) => {
        return {
          ...state,
          status: 'wait'
        };
      },
      [ActionTypes.JSON_SUCCESS]: (state, {payload}) => {
        return {
          ...state,
          status: 'success',
          responses: [
            {
            query: JSON.parse(payload.value),
            response: JSON.stringify(payload.result, null, '\t'),
            error: null
            },
            ...payload.payload,
          ],
        };
      },
      [ActionTypes.JSON_ERROR]: (state, {payload}) => {
        return {
          ...state,
          status: 'success',
          responses: [
            {
              query: JSON.parse(payload.value),
              response: JSON.stringify(payload.error, null, '\t'),
              error: true
            },
            ...payload.payload,
          ],
        };
      },
      [ActionTypes.JSON_DELETE]: (state, {payload}) => {
        return {
          ...state,
          responses: [...state.responses.slice(0, payload), ...state.responses.slice(payload+1)]
        };
      },
      [ActionTypes.JSON_CLEAR]: (state) => {
        return {
          ...state,
          responses: []
        };
      },
    },
    initialState
  ),
};
