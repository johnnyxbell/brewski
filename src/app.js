import LogRocket from 'logrocket';
import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import 'babel-polyfill';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/components/store';
/*eslint-disable*/
import Styles from './app/assets/scss/style.scss';

//components
import AppIndex from './app/components/appIndex';
import Login from './app/components/Login';

//LogRocket
if (PRODUCTION) {
    LogRocket.init('wq0pfj/brewski');
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={AppIndex} />
            </Switch>
        </Provider>
    </BrowserRouter>,
    document.getElementById('app')
);
