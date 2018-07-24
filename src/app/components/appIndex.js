import React, { Component } from 'react';
import Header from './Header';
import AddBrew from './addBrew';
import AddLocation from './addLocation';
import ManageBoards from './manageBoards';
import KegHealth from './kegHealth';
import MyAccount from './myAccount';
import { Route, Switch } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';
import { auth, database } from './firebase';
import { connect } from 'react-redux';
import { saveUserData, saveGoogleData } from './actionCreators';
import Board from './Board';
import Loading from './Loading';
import Loadable from 'react-loadable';

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
const Home = Loadable({
    loader: () => import('./Home'),
    loading: Loading
});

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
                const { saveUserData } = this.props;
                const userDataRef = database.ref(`${user.uid}`);
                userDataRef.on('value', snapshot => {
                    let userData = snapshot.val();
                    console.log(userData);
                    saveUserData(userData);
                    console.log(saveUserData(userData));
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
    userData: state.userData
});

const mapDispatchToProps = dispatch => ({
    saveUserData: userData => dispatch(saveUserData(userData)),
    saveGoogleData: data => dispatch(saveGoogleData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppIndex);
