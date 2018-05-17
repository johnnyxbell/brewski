import React, { Component } from 'react';
import Header from './Header';
import Home from './Home';
import AddItem from './AddItems/addItems';
import { Route, Switch } from 'react-router-dom';

class AppIndex extends Component {
    render() {
        return (
            <div>
                <Header />
                <main>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/add-menu" exact component={AddItem} />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default AppIndex;
