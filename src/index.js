import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Containers/App/App';
import store from './Redux/store';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

// Redux Provider Component
const ReduxApp = (<Provider store={store}><App /></Provider>);

ReactDOM.render(ReduxApp, document.getElementById('root'));
registerServiceWorker();
