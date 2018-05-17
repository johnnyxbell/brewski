import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import 'babel-polyfill';
import { BrowserRouter } from 'react-router-dom';
//components
import AppIndex from './app/components/appIndex';

ReactDOM.render(
    <BrowserRouter>
        <AppIndex/>
    </BrowserRouter>,
    document.getElementById('app')
);
