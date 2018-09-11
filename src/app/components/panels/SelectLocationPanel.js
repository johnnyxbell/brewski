import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveActiveLocation } from '../actionCreators';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faChevronDown from '@fortawesome/fontawesome-free-solid/faChevronDown';

const H3 = styled.h3`
    margin: 0;
    padding: 0;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 10px 70px 10px 13px !important;
    height: auto !important;
    border: 1px solid #e3e3e3;
    border-radius: 3px;
    background-color: #fff;
    color: #444444;
    font-size: 12px;
    line-height: 16px !important;
    appearance: none; /* this is must */
`;

const Label = styled.label`
    position: relative;
    margin-bottom: 50px;
    width: 50%;
    display: block;
    svg {
        position: absolute;
        top: 11px;
        right: 10px;
        pointer-events: none;
        border-left: 1px solid #e3e3e3;
        padding-left: 7px;
        fill: #ccc;
        color: #ccc;
    }
`;

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
            return <H3>Select Location:</H3>;
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
                <Label>
                    <Select value={activeLocation} onChange={this.onLocationFilter}>
                        {options}
                    </Select>
                    <FontAwesomeIcon icon={faChevronDown} />
                </Label>
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
        saveActiveLocation(e.target.value);
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
