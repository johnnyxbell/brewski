import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyAccount extends Component {
    render() {
        //const { googleData } = this.props;
        return (
            <div>
                <h1>My Account</h1>
                <p>Coming soon...</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userName: state.userName,
    googleData: state.googleData
});

export default connect(mapStateToProps)(MyAccount);
