import React, { Component } from 'react';
import { connect } from 'react-redux';

class ManageBords extends Component {
    render() {
        //const { googleData } = this.props;
        return (
            <div>
                <h1>Manage Boards</h1>
                <p>Coming soon...</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userName: state.userName,
    googleData: state.googleData
});

export default connect(mapStateToProps)(ManageBords);
