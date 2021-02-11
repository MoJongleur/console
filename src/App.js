import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import createStore from 'src/store';
import LoginPage from 'src/containers/LoginPage';
import ConsolePage from 'src/containers/ConsolePage';
import {authenticateCheck} from 'src/store/actions';

const {store, persistor} = createStore();

function App() {

  useEffect(() => {
    store.dispatch(authenticateCheck());
    if(sessionStorage.getItem('logError')) {
      sessionStorage.setItem('logError', '')
    }
  }, []);

  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Switch>
            <Route path="/console">
              <ConsolePage />
            </Route>
            <Route path="/">
              <LoginPage />
            </Route>

          </Switch>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
