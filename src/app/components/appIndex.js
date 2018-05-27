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
import { saveBeerList, saveGoogleData } from './actionCreators';
import Board from './Board';
import Loading from './Loading';
import firebase from './firebase';

const Main = styled.div`
    padding: 25px 50px;
    font-family: 'hind', sans-serif;
`;

injectGlobal`
  body {
    margin: 0;
  }
  a {
  color: darkgrey;
  text-decoration: none;
  :hover {
  text-decoration: underline;
  }
  }
`;

class AppIndex extends Component {
    constructor() {
        super();
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        const { history } = this.props;
        auth.onAuthStateChanged(user => {
            if (user) {
                saveGoogleData(user);
                console.log('test', user.uid);
                console.log('googleData', saveGoogleData(user));
                const { saveBeerList } = this.props;
                const beerRef = firebase.database().ref(`${user.uid}`);
                beerRef.on('value', snapshot => {
                    let beers = snapshot.val();
                    console.log(beers);
                    saveBeerList(beers);
                    console.log(saveBeerList(beers));
                });
                this.setState({
                    loading: true
                });
            } else {
                history.push('/login');
            }
        });
    }

    initLoad() {
        const { googleData } = this.props;
        if (this.state.loading === true) {
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
                            <Route path={`/board-${googleData.uid}`} component={Board} />
                        </Switch>
                    </Main>
                </div>
            );
        } else {
            return (
                <div>
                    <Loading />
                </div>
            );
        }
    }

    render() {
        return <div>{this.initLoad()}</div>;
    }
}

const mapStateToProps = state => ({
    googleData: state.googleData,
    beerList: state.beerList
});

const mapDispatchToProps = dispatch => ({
    saveBeerList: beerList => dispatch(saveBeerList(beerList)),
    saveGoogleData: data => dispatch(saveGoogleData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppIndex);
