import React, { Component } from 'react';
import Header from './Header';
import Home from './Home';
import AddBrew from './addBrew';
import AddLocation from './addLocation';
import ManageBoards from './manageBoards';
import KegHealth from './kegHealth';
import MyAccount from './myAccount';
import { Route, Switch } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';
import { auth } from './firebase';
import { connect } from 'react-redux';
import { saveGoogleData, saveBeers } from './actionCreators';
import 'typeface-hind';
import 'typeface-roboto';
import firebase from './firebase';

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
        const { history } = this.props;
        auth.onAuthStateChanged(user => {
            if (user) {
                saveGoogleData(user);
                console.log('googleData', saveGoogleData(user));
                const beerRef = firebase.database().ref(`${user.uid}`);
                beerRef.on('value', snapshot => {
                    let addBeers = snapshot.val();
                    saveBeers(addBeers);
                    console.log('BeerData', saveBeers(addBeers));
                });
            } else {
                history.push('/login');
            }
        });
    }

    render() {
        //const { googleData, beerList } = this.props;
        console.log('what is this', this.props);
        return (
            <div>
                <Header />
                <Main>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/add-brews" exact component={AddBrew} />
                        <Route path="/add-locations" exact component={AddLocation} />
                        <Route path="/manage-boards" exact component={ManageBoards} />
                        <Route path="/keg-health" exact component={KegHealth} />
                        <Route path="/my-account" exact component={MyAccount} />
                    </Switch>
                </Main>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    googleData: state.googleData,
    beerList: state.beerList
});

const mapDispatchToProps = dispatch => ({
    saveGoogleData: data => dispatch(saveGoogleData(data)),
    saveBeers: data => dispatch(saveBeers(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppIndex);
