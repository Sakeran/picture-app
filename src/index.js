import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Containers/App/App';
import store from './Redux/store';
import { Provider } from 'react-redux';
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';
import registerServiceWorker from './registerServiceWorker';

// Initialize Apollo Provider
const networkInterface = createNetworkInterface({
    uri: '/api',
    opts: {
      credentials: 'include'
    }
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});

// Redux Provider Component
const ReduxApp = (<Provider store={store}><App /></Provider>);

// Wrap with Apollo Provider
const ReduxAppWithApollo = (<ApolloProvider client={client}>{ReduxApp}</ApolloProvider>)

ReactDOM.render(ReduxAppWithApollo, document.getElementById('root'));
registerServiceWorker();
