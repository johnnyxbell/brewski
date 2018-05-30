import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from './Logo';
import UserMenu from './userMenu';
import { connect } from 'react-redux';
import { saveGoogleData } from './actionCreators';
import { auth } from './firebase';

const HeaderPanel = styled.div`
    position: relative;
    background: #34343a;
    background-size: cover;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
        height: 50px;
        width: auto;
        padding: 10px 0px 10px 25px;
        margin-right: 15px;
    }
`;

const Menu = styled.div`
    display: flex;
    align-items: center;
    a {
        color: #ffffff;
        text-decoration: none;
        margin: 0 15px;
        font-family: 'roboto', sans-serif;
    }
`;
const User = styled.div`
    margin-right: 25px;
    display: flex;
    align-items: center;
    img {
        width: 40px;
        height: 40px;
        border-radius: 100px;
        border: 3px solid #ffffff;
        cursor: pointer;
    }
    a {
        color: white;
        text-decoration: none;
        margin-right: 25px;
    }
`;

class Header extends Component {
    constructor() {
        super();
        this.state = {
            isHidden: true
        };
    }

    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden
        });
    }

    componentDidMount() {
        const { saveGoogleData } = this.props;
        auth.onAuthStateChanged(user => {
            if (user) {
                saveGoogleData(user);
                console.log(this.props);
            }
        });
    }

    render() {
        const { googleData, userData } = this.props;
        console.log('header', userData);
        console.log('this.props', this.props);
        return (
            <div className="header">
                <HeaderPanel>
                    <Menu>
                        <Link to="/">{logo}</Link>
                        <Link to="/add-brews">Add Brews</Link>
                        <Link to="/add-locations">Add Locations</Link>
                        <Link to="/manage-boards">Manage Boards</Link>
                        {/*<Link to="/keg-health">Keg Heath</Link>*/}
                    </Menu>
                    <User onClick={this.toggleHidden.bind(this)}>
                        <img src={googleData.photoURL} />
                    </User>
                </HeaderPanel>
                {!this.state.isHidden && <UserMenu />}
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
