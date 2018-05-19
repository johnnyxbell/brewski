import React, { Component } from 'react';
import Header from './Header';
import Home from './Home';
import AddBrew from './addBrew';
import { Route, Switch } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';
import { auth } from './firebase';
import { connect } from 'react-redux';
import { saveGoogleData } from './actionCreators';
import 'typeface-hind';
import 'typeface-roboto';

const Main = styled.div`
    padding: 25px 50px;
    font-family: 'hind', sans-serif;
`;

injectGlobal`
  body {
    margin: 0;
  }
`;

class AppIndex extends Component {
    componentDidMount() {
        const { saveGoogleData, history } = this.props;
        auth.onAuthStateChanged(user => {
            if (user) {
                saveGoogleData(user);
            } else {
                history.push('/login');
            }
        });
    }

    render() {
        return (
            <div>
                <Header />
                <Main>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/add-brews" exact component={AddBrew} />
                    </Switch>
                </Main>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    googleData: state.googleData
});

const mapDispatchToProps = dispatch => ({
    saveGoogleData: data => dispatch(saveGoogleData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppIndex);
