import {createStore, applyMiddleware, combineReducers, Middleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';
import rootSaga from './sagas';

// @ts-ignore
export type RootState = ReturnType<typeof rootReducer>

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'root',
  storage,
};

const bindMiddleware = (middleware: any ) => {
  if (process.env.NODE_ENV !== 'production') {
    const {composeWithDevTools} = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore(initialState = {}) {
  const store = createStore<any, any, any, any>(
    combineReducers({
      auth: persistReducer(persistConfig, rootReducer.auth),
      json: persistReducer(persistConfig, rootReducer.json),
      error: rootReducer.error,
    }),
    initialState,
    bindMiddleware([sagaMiddleware])
  );
  let persistor = persistStore(store);

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();
  return {
    store,
    persistor,
  };
}

export default configureStore;