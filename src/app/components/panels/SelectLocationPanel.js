import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveActiveLocation } from '../actionCreators';

class SelectLocationPanel extends Component {
    constructor() {
        super();
        this.state = {
            locationValue: ''
        };
        this.onLocationFilter = this.onLocationFilter.bind(this);
    }

    loadLocationsTitle() {
        const { userData } = this.props;
        if (userData.location) {
            return <h1>Select Location</h1>;
        } else {
            return '';
        }
    }

    loadLocations() {
        const { userData, activeLocation } = this.props;
        let options = [
            <option value="novalue" key={1}>
                Please Select...
            </option>
        ];
        if (userData.location) {
            Object.keys(userData.location).map(item =>
                options.push(
                    <option key={item} value={item}>
                        {userData.location[item].locationName} - {userData.location[item].locationAddress}
                    </option>
                )
            );
            return (
                <select value={activeLocation} onChange={this.onLocationFilter}>
                    {options}
                </select>
            );
        } else {
            return (
                <div>
                    Hey there, seems like you have no locations setup, please add one.
                    <Link to="/add-locations">
                        <button>Add Location</button>
                    </Link>
                </div>
            );
        }
    }

    onLocationFilter(e) {
        const { saveActiveLocation } = this.props;
        console.log('changing location');
        saveActiveLocation(e.target.value);
        console.log('ActiveLocation', saveActiveLocation(e.target.value));
    }

    render() {
        return (
            <div>
                {this.loadLocationsTitle()}
                {this.loadLocations()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userData: state.userData,
    googleData: state.googleData,
    activeLocation: state.activeLocation
});

const mapDispatchToProps = dispatch => ({
    saveActiveLocation: activeLocation => dispatch(saveActiveLocation(activeLocation))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectLocationPanel);
