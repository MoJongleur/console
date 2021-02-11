import keyMirror from 'fbjs/lib/keyMirror';

export const ActionTypes = keyMirror({
  AUTHENTICATE: undefined,
  AUTHENTICATE_CHECK: undefined,
  AUTHENTICATE_SUCCESS: undefined,
  AUTHENTICATE_FAILURE: undefined,
  LOGOUT: undefined,
  LOGOUT_SUCCESS: undefined,
  LOGOUT_FAILURE: undefined,

  RESET_FAILURE: undefined,
  LOGIN_FAILURE: undefined,
  JSON_REQUEST_FAILURE: undefined,
  JSON_STRUCTURE_FAILURE: undefined,

  JSON_POKE: undefined,
  JSON_SUCCESS: undefined,
  JSON_ERROR: undefined,
  JSON_DELETE: undefined,
  JSON_CLEAR: undefined,
});
