import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import 'babel-polyfill';

//components
import AppIndex from './app/components/appIndex';

ReactDOM.render(
    <AppIndex/>,
    document.getElementById('app')
);
