import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddLocations extends Component {
    render() {
        //const { googleData } = this.props;
        return (
            <div>
                <h1>Add Locations</h1>
                <p>
                    We are currently working on multiple locations.{' '}
                    <a href="mailto:hi@johnnybell.io">be the first to find out</a> when its available
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
