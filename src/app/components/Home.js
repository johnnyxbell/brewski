import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        const { googleData } = this.props;
        console.log(googleData);
        return (
            <div>
                <h1>Home</h1>
                <p>{`Welcome Back ${googleData.displayName}`}</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userName: state.userName,
    googleData: state.googleData
});

export default connect(mapStateToProps)(Home);
