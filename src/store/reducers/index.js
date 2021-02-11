import login from 'src/store/reducers/auth';
import json from 'src/store/reducers/json';
import error from 'src/store/reducers/error';

export default {
  ...login,
  ...error,
  ...json,
};
