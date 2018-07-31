import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectLocationPanel from './panels/SelectLocationPanel';

class KegHealth extends Component {
    render() {
        //const { googleData } = this.props;
        return (
            <div>
                <SelectLocationPanel />
                <h1>Keg Health</h1>
                <p>
                    We are currently working on the tech behind the keg health feature.{' '}
                    <a href="mailto:hi@johnnybell.io">be the first to find out</a> when its available.
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
