import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from './firebase';
import styled from 'styled-components';

const AddLocationWrapper = styled.div`
    box-shadow: 0 1px 17px 0 rgba(0, 0, 0, 0.07);
    text-align: right;
    padding: 30px 20px;
    button {
        background-color: #006ab6;
        border-radius: 3px;
        padding: 10px 35px;
        width: auto;
        font-size: 13px;
        text-align: center;
        cursor: pointer;
        color: white;
        transition: opacity 0.5s ease;
        border: none;
        margin-top: 10px;
        &:hover {
            opacity: 0.7;
        }
    }
`;

const AddLocationForm = styled.form`
    display: grid;
    grid: auto auto / auto auto;
    grid-gap: 10px 20px;
    align-items: end;
    justify-items: end;

    label {
        box-sizing: border-box;
        width: 100%;
        text-align: left;
        align-items: end;
        justify-items: end;
    }
    input {
        height: 25px;
        width: 100%;
        padding-left: 5px;
        margin-left: -5px;
    }
`;

const LocationItem = styled.div`
button {
        background-color: white;
        border: red solid 1px;
        color: red;
        border-radius: 3px;
        padding: 5px 35px;
        width: 100%;
        font-size: 13px;
        text-align: center;
        cursor: pointer;
        transition: all 0.5s ease;
        margin-top: 15px;
        &:hover {
            opacity: 0.7;
            background: red;
            color: white;
        }
`;

class AddLocations extends Component {
    constructor() {
        super();
        this.state = {
            locationName: '',
            locationAddress: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    removeItem(locationId) {
        const { googleData } = this.props;
        const locationRef = database.ref(`${googleData.uid}/location/${locationId}`);
        locationRef.remove();
    }

    handleSubmit(e) {
        e.preventDefault();
        const { googleData } = this.props;
        const locationRef = database.ref(`${googleData.uid}/location`);
        const location = {
            locationName: this.state.locationName,
            locationAddress: this.state.locationAddress,
            locationValue: ''
        };
        locationRef.push(location);
        this.setState({
            locationName: '',
            locationAddress: ''
        });
        locationRef.on('value', snapshot => {
            console.log(snapshot.val());
        });
    }

    loadLocations() {
        const { userData } = this.props;
        console.log('hi', userData.location);
        if (userData.location) {
            return Object.keys(userData.location).map(item => (
                <LocationItem key={item}>
                    <h3>{userData.location[item].locationName}</h3>
                    <p>{userData.location[item].locationAddress}</p>
                    <button onClick={() => this.removeItem(item)}>Remove Location</button>
                </LocationItem>
            ));
        } else {
            return '';
        }
    }

    render() {
        //const { googleData } = this.props;
        return (
            <div>
                <h1>Add Locations</h1>
                <AddLocationWrapper>
                    <AddLocationForm>
                        <label>
                            Name of Location
                            <input
                                type="text"
                                name="locationName"
                                placeholder="My Awesome Bar"
                                onChange={this.handleChange}
                                value={this.state.locationName}
                            />
                        </label>
                        <label>
                            Address
                            <input
                                type="text"
                                name="locationAddress"
                                placeholder="123 Awesome Street, San Francisco, CA "
                                onChange={this.handleChange}
                                value={this.state.locationAddress}
                            />
                        </label>
                    </AddLocationForm>
                    <button onClick={this.handleSubmit}>Add Location 🌍</button>
                </AddLocationWrapper>
                {this.loadLocations()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userData: state.userData,
    googleData: state.googleData
});

export default connect(mapStateToProps)(AddLocations);
