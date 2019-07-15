import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

//store
import { createStore, applyMiddleware } from 'redux';
//provider = para poder comunicar los components
import { Provider } from 'react-redux';

//Describen que algo paso
import reducers from './reducers/index';
import reduxThunk from 'redux-thunk';

const store = createStore(
  reducers, //todos los reducer
  {},  // state intial
  applyMiddleware(reduxThunk)
);


ReactDOM.render(  
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
