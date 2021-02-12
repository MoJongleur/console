import {Action, handleActions} from 'redux-actions';

import {ActionTypes} from '../constants';

export interface JsonElement {
  query: string;
  response: string;
  error: null | boolean;
}

export interface JsonProps {
  responses: Array<JsonElement>;
  status: string;
}

export interface JsonPayload {
  value: string;
  result: string;
  payload: Array<JsonElement>;
  error: string;
  count: number;
}

export const initialState: JsonProps = {
  responses: [],
  status: 'init', // init, wait, success
};

export default {
  json: handleActions<JsonProps, JsonPayload>(
    {
      [ActionTypes.JSON_POKE]: (state: JsonProps) => {
        return {
          ...state,
          status: 'wait'
        };
      },
      [ActionTypes.JSON_SUCCESS]: (state: JsonProps, {payload}: Action<JsonPayload>) => {
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
      [ActionTypes.JSON_ERROR]: (state: JsonProps, {payload}: Action<JsonPayload>) => {
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
      [ActionTypes.JSON_DELETE]: (state: JsonProps, {payload}: Action<JsonPayload>) => {
        return {
          ...state,
          responses: [...state.responses.slice(0, payload.count), ...state.responses.slice(payload.count+1)]
        };
      },
      [ActionTypes.JSON_CLEAR]: (state: JsonProps) => {
        return {
          ...state,
          responses: []
        };
      },
    },
    initialState
  ),
};
