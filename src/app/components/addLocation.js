import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from './firebase';

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
            locationAddress: this.state.locationAddress
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
                <div key={item}>
                    <h3>{userData.location[item].locationName}</h3>
                    <p>{userData.location[item].locationAddress}</p>
                    <button onClick={() => this.removeItem(item)}>Remove Location</button>
                </div>
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
                <form onSubmit={this.handleSubmit}>
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
                    <button>Add Location</button>
                </form>
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
