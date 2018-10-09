import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import burgerReducer from './store/reducers/burger_reducer';
import orderReducer from './store/reducers/orders_reducer';
import authReducer from './store/reducers/auth_reducer';
import registerServiceWorker from './registerServiceWorker';
import { watchAuth, watchBurgerBuilder, watchOrder } from './store/sagas';

const composeEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools({}) : null;

const rootReducer = combineReducers({
  burgerBuilder: burgerReducer,
  orders: orderReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
