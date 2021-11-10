import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../redux/rootReducer';
import rootSaga from '../redux/rootSaga';
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = typeof window === 'object' && (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  })
  : compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))

const store = createStore(
    rootReducer,
    enhancer
  );

sagaMiddleware.run(rootSaga);

export default store;