import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import store from './store';
import App from './components/App';
import { updateAlert, newInventoryArrived } from './actions';

window.React = React;
window.store = store;

const webSocketConnect = () => {
  let timerId;
  const client = new W3CWebSocket('ws://localhost:8080/');
  client.onopen = () => {
    console.log('WebSocket connected successfully');
    store.dispatch(updateAlert('WebSocket connected successfully', 'success'));
    clearInterval(timerId);
  };
  client.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
    store.dispatch(newInventoryArrived(data.store, data.model, data.inventory));
  };
  client.onerror = (err) => {
    console.error('WebSocket encountered error: ', err.message, 'Closing socket');
    client.close();
  };
  client.onclose = () => {
    console.log('WebSocket closed. Reconnect will be attempted in 1 second.');
    store.dispatch(updateAlert('WebSocket closed. Reconnect will be attempted in 1 second.', 'error'));
    timerId = setTimeout(() => {
      webSocketConnect();
    }, 1000);
  };
  return client;
};

webSocketConnect();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
