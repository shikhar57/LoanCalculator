import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import storeFactory from './app/store/store';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
    <Provider store={storeFactory}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);

registerServiceWorker();