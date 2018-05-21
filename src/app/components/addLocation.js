import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddLocations extends Component {
    render() {
        //const { googleData } = this.props;
        return (
            <div>
                <h1>Add Locations</h1>
                <p>Coming soon...</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userName: state.userName,
    googleData: state.googleData
});

export default connect(mapStateToProps)(AddLocations);
