import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import notesReducer from './reducers/notes.reducer';
import './index.css';
import App from './App';

const store = createStore(
    notesReducer,
    window.devToolsExtension && window.devToolsExtension(),
    applyMiddleware(thunk)
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
