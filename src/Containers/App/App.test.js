import React from 'react';
import ReactDOM from 'react-dom'
import { App } from './App';
import { Provider } from 'react-redux';
import store from '../../Redux/store';

xit('renders without crashing', () => {
  const ConnectedApp = <Provider store={store}><App /></Provider>;
  const div = document.createElement('div');
  ReactDOM.render(ConnectedApp, div);
});
