import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyAccount extends Component {
    render() {
        const { googleData } = this.props;
        return (
            <div>
                <h1>My Account</h1>
                <p>You are signed in with google</p>
                <img src={googleData.photoURL} />
                <p>{googleData.displayName}</p>
                <p>{googleData.email}</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    googleData: state.googleData
});

export default connect(mapStateToProps)(MyAccount);
