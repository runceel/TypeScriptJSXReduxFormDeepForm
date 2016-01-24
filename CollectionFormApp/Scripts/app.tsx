import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IndexPage from './components/IndexPage';
import * as Redux from 'redux';
import {Provider} from 'react-redux';
import * as reducers from './reducers';

const store = Redux.createStore(reducers.reducer);

ReactDOM.render(
    <Provider store={store}>
        <IndexPage />
    </Provider>,
    document.getElementById('content'));
