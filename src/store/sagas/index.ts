// @ts-ignore
import {all, fork} from 'redux-saga/effects';

import login from './auth';
import json from './json';

export default function* root() {
  yield all([fork(login), fork(json)]);
}
