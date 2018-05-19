import React, { Component } from 'react';
import { auth, provider } from './firebase.js';
import { connect } from 'react-redux';
import { setUsername, saveGoogleData } from './actionCreators';
import styled from 'styled-components';
import Logo from './Logo';

const LoginPanel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: Roboto;
`;
const LoginDetails = styled.div`
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 17px 0 rgba(0, 0, 0, 0.07);
    font-size: 0.875rem;
    padding: 20px 35px;
    width: auto;
    display: inline-block;
    text-align: center;
    min-width: 300px;
    svg {
        width: 100px;
        height: 100px;
        margin-bottom: 0px;
    }
`;

const LoginButton = styled.div`
    background-color: #006ab6;
    border-radius: 3px;
    padding: 10px 35px;
    width: 150px;
    text-align: center;
    cursor: pointer;
    color: white;
    margin: 0 auto;
    transition: opacity 0.5s ease;
    &:hover {
        opacity: 0.7;
    }
`;

const WelcomeText = styled.p`
    font-size: 18px;
    font-family: Roboto;
`;

class Login extends Component {
    constructor() {
        super();
        this.login = this.login.bind(this);
    }

    login() {
        const { setUsername, history, saveGoogleData } = this.props;
        auth.signInWithPopup(provider).then(result => {
            const user = result.user;
            alert(user);
            if (user) {
                setUsername(user.displayName);
                saveGoogleData(user);
                history.push('/');
            }
        });
    }

    render() {
        return (
            <LoginPanel>
                <LoginDetails>
                    <div>{Logo}</div>
                    <WelcomeText>Hey There, Welcome!</WelcomeText>
                    <LoginButton onClick={this.login}>Sign in with Google</LoginButton>
                    <p>
                        <em>we currently only support signin with google</em>
                        <br />
                        <em>more options coming soon...</em>
                    </p>
                </LoginDetails>
            </LoginPanel>
        );
    }
}

const mapStateToProps = state => ({ userName: state.userName });
const mapDispatchToProps = dispatch => ({
    setUsername: data => dispatch(setUsername(data)),
    saveGoogleData: data => dispatch(saveGoogleData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
