import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                Header
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/add-menu">Add Item</Link>
                </div>
            </div>
        );
    }
}

export default Header;
