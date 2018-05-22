import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddLocations extends Component {
    render() {
        //const { googleData } = this.props;
        return (
            <div>
                <h1>Add Locations</h1>
                <p>
                    You currently only have access to a single location <a href="mailto:hi@johnnybell.io">upgrade</a> to
                    unlock
                </p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userName: state.userName,
    googleData: state.googleData
});

export default connect(mapStateToProps)(AddLocations);
