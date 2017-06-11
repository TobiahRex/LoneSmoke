import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { autoRehydrate } from 'redux-persist';
import { browserHistory } from 'react-router';
import createLogger from 'redux-logger';
import RehydrationServices from '../../services/utils/rehydrationServices';

import thingActions from '../Redux/ThingRedux';
import apiActions from '../Redux/ApiRedux';

export default (rootReducer, rootSaga) => {
  const enhancers = [];
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    routerMiddleware(browserHistory),
    createLogger(),
    sagaMiddleware,
  ];

  enhancers.push(
    applyMiddleware(...middlewares),
    autoRehydrate(),
    window.devToolsExtension ? window.devToolsExtension() : _ => _,
  );

  const store = createStore(rootReducer, compose(...enhancers));
  const history = syncHistoryWithStore(browserHistory, store);
  sagaMiddleware.run(rootSaga);
  RehydrationServices.updateReducers(store);

  store.dispatch(apiActions.fetching());
  store.dispatch(thingActions.getAllThings());

  return {
    store,
    history,
  };
};
