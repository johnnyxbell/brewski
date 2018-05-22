import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import 'babel-polyfill';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/components/store';

//components
import AppIndex from './app/components/appIndex';
import Login from './app/components/Login';
import Board from './app/components/Board';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/board" component={Board} />
                <Route path="/" component={AppIndex} />
            </Switch>
        </Provider>
    </BrowserRouter>,
    document.getElementById('app')
);
