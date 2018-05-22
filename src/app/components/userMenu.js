import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { saveGoogleData } from './actionCreators';
import { auth } from './firebase';

const UserMenuPanel = styled.div`
    width: auto;
    background: white;
    position: absolute;
    right: 25px;
    top: 70px;
    border-radius: 2px;
    box-shadow: #cccccc 0px 0px 10px;
    text-align: right;
    padding: 0px 20px;
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        color: #2e2e2e;
        text-align: right;
        font-family: 'roboto', sans-serif;
        padding: 5px 0;
    }
    a {
        color: #2e2e2e;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;

class UserMenu extends Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }

    logout() {
        auth.signOut().then(() => {
            saveGoogleData(null);
        });
    }

    render() {
        const { googleData } = this.props;
        return (
            <UserMenuPanel>
                <ul>
                    <li>
                        G'day <strong>{googleData.displayName}</strong>, you legend
                    </li>
                    <li>
                        <Link to="/my-account">My Account</Link>
                    </li>
                    <li>
                        <a href="mailto:hi@johnnybell.io">Upgrade 🚀</a>
                    </li>
                    <li>
                        <Link to="/login" onClick={this.logout}>
                            Logout
                        </Link>
                    </li>
                </ul>
            </UserMenuPanel>
        );
    }
}

const mapStateToProps = state => ({
    googleData: state.googleData
});

const mapDispatchToProps = dispatch => ({
    saveGoogleData: data => dispatch(saveGoogleData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
