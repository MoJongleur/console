import login from './auth';
import json from './json';
import error from './error';

export default {
  ...login,
  ...error,
  ...json,
};
