import React, { Component } from 'react';
import { connect } from 'react-redux';

class KegHealth extends Component {
    render() {
        //const { googleData } = this.props;
        return (
            <div>
                <h1>Keg Health</h1>
                <p>
                    We are currently working with distributors to allow this feature. Register your interest and you
                    will be added to the beta testers
                </p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userName: state.userName,
    googleData: state.googleData
});

export default connect(mapStateToProps)(KegHealth);
