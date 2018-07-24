import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import logo from './Logo';
import UserMenu from './userMenu';
import { connect } from 'react-redux';
import { saveGoogleData } from './actionCreators';
import { auth } from './firebase';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTachometerAlt from '@fortawesome/fontawesome-free-solid/faTachometerAlt';
import faBeer from '@fortawesome/fontawesome-free-solid/faBeer';
import faMapMarkerAlt from '@fortawesome/fontawesome-free-solid/faMapMarkerAlt';
import faColumns from '@fortawesome/fontawesome-free-solid/faColumns';
import faSortDown from '@fortawesome/fontawesome-free-solid/faSortDown';

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
        margin: 0 5px;
        font-family: 'roboto', sans-serif;
        align-items: center;
        display: flex;
        transition: color 0.3s ease;
        &:hover {
            color: #ccc;
            text-decoration: none;
        }
    }
    svg {
        margin-right: 10px;
    }
    .active {
        color: #f0bb48;
        &:hover {
            color: #f0bb48;
        }
    }
`;
const User = styled.div`
    margin-right: 25px;
    display: flex;
    align-items: center;
    font-family: 'roboto', sans-serif;
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
    span {
        color: white;
        margin-left: 15px;
        cursor: pointer;
    }
    svg {
        width: 10px !important;
        margin-left: -25px;
    }
`;

class Header extends Component {
    constructor() {
        super();
        this.state = {
            isHidden: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    handleClick() {
        if (!this.state.isHidden) {
            // attach/remove event handler
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState(prevState => ({
            isHidden: !prevState.isHidden
        }));
    }

    handleOutsideClick(e) {
        // ignore clicks on the component itself
        if (this.node.contains(e.target)) {
            return;
        }
        this.handleClick();
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
        const { googleData } = this.props;
        console.log('this.props', this.props);
        return (
            <div className="header">
                <HeaderPanel>
                    <Menu>
                        <NavLink to="/">{logo}</NavLink>
                        <NavLink to="/" exact={true} activeClassName="active">
                            <span>
                                <FontAwesomeIcon icon={faTachometerAlt} />
                            </span>
                            Dashboard
                        </NavLink>
                        <NavLink to="/add-brews" activeClassName="active">
                            <span>
                                <FontAwesomeIcon icon={faBeer} />
                            </span>
                            Add Brews
                        </NavLink>
                        <NavLink to="/add-locations" activeClassName="active">
                            <span>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                            </span>
                            Add Locations
                        </NavLink>
                        <NavLink to="/manage-boards" activeClassName="active">
                            <span>
                                <FontAwesomeIcon icon={faColumns} />
                            </span>
                            Manage Boards
                        </NavLink>
                        {/*<Link to="/keg-health">Keg Heath</Link>*/}
                    </Menu>
                    <div
                        ref={node => {
                            this.node = node;
                        }}
                        onClick={this.handleClick}
                    >
                        <User>
                            <img src={googleData.photoURL} />
                            <span>{googleData.displayName}</span>
                            <span>
                                <FontAwesomeIcon icon={faSortDown} />
                            </span>
                        </User>
                    </div>
                </HeaderPanel>
                {this.state.isHidden && <UserMenu />}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
