import {all, fork} from 'redux-saga/effects';

import login from 'src/store/sagas/auth';
import json from 'src/store/sagas/json';

export default function* root() {
  yield all([fork(login), fork(json)]);
}
