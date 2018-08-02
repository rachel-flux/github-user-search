import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';


function renderApp() {
    const container = document.getElementById('root');
    if (!container) return;

    ReactDOM.render(<App />, container);
}

renderApp();
registerServiceWorker();
