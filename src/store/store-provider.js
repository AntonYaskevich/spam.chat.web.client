import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import sagas from '../sagas';

class StoreProvider {
  constructor(history, initialState = {}) {
    const rootReducer = combineReducers({
      ...reducers,
      router: routerReducer,
    });

    const sagaMiddleware = createSagaMiddleware();
    const reactRouterReduxMiddleware = routerMiddleware(history);
    const middleware = [sagaMiddleware, reactRouterReduxMiddleware];

    /* eslint-disable no-underscore-dangle, no-undef */
    const reduxDevToolsExtensions = window ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : window;
    const composeEnhancers = __DEV__ && reduxDevToolsExtensions ? reduxDevToolsExtensions : compose;
    /* eslint-enable no-underscore-dangle, no-undef */

    const enhancer = composeEnhancers(applyMiddleware(...middleware));
    const store = createStore(rootReducer, initialState, enhancer);

    this.store = store;

    sagaMiddleware.run(sagas);
  }

  getStore() {
    return this.store;
  }

  getHotModuleReplacementExecutor() {
    const store = this.store;
    return () => {
      /* eslint-disable global-require */
      const nextRootReducer = require('../reducers').default;
      /* eslint-enable global-require */
      store.replaceReducer(nextRootReducer);
    };
  }
}

export default StoreProvider;
