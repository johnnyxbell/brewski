import React, { Component } from 'react';
import firebase from './firebase';
import { connect } from 'react-redux';
import styled from 'styled-components';

const AddBrewWraper = styled.form`
    box-shadow: 0 1px 17px 0 rgba(0, 0, 0, 0.07);
    text-align: right;
    padding: 30px 20px;
    button {
    }
`;

const AddBrewForm = styled.form`
    display: flex;
    flex-flow: row wrap;

    input {
        flex-basis: 30.5%;
        margin: 10px;
        position: relative;
        height: 25px;
        padding-left: 5px;
    }
`;

class AddBrew extends Component {
    constructor() {
        super();
        this.state = {
            beerName: '',
            beerType: '',
            ABV: '',
            country: '',
            size: '',
            price: '',
            beers: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { googleData } = this.props;
        const beerRef = firebase.database().ref(`${googleData.uid}/beer`);
        const beer = {
            beerName: this.state.beerName,
            beerType: this.state.beerType,
            ABV: this.state.ABV,
            country: this.state.country,
            size: this.state.size,
            price: this.state.price
        };
        beerRef.push(beer);
        this.setState({
            beerName: '',
            beerType: '',
            ABV: '',
            country: '',
            size: '',
            price: ''
        });
        beerRef.on('value', snapshot => {
            console.log(snapshot.val());
        });
    }

    removeItem(beerId) {
        const { googleData } = this.props;
        const beerRef = firebase.database().ref(`${googleData.uid}/beer/${beerId}`);
        beerRef.remove();
    }

    componentDidMount() {
        const { googleData } = this.props;
        const beerRef = firebase.database().ref(`${googleData.uid}/beer`);
        beerRef.on('value', snapshot => {
            let beers = snapshot.val();
            let newState = [];
            for (let beer in beers) {
                newState.push({
                    id: beer,
                    beerName: beers[beer].beerName,
                    beerType: beers[beer].beerType,
                    ABV: beers[beer].ABV,
                    country: beers[beer].country,
                    size: beers[beer].size,
                    price: beers[beer].price
                });
            }
            this.setState({
                beers: newState
            });
        });
    }

    render() {
        return (
            <div>
                <h1>Add Brewskis</h1>
                <AddBrewWraper>
                    <form onSubmit={this.handleSubmit}>
                        <AddBrewForm>
                            <input
                                type="text"
                                name="beerName"
                                placeholder="Whats the name of the beer?"
                                onChange={this.handleChange}
                                value={this.state.beerName}
                            />
                            <input
                                type="text"
                                name="beerType"
                                placeholder="Stout, Larger, IPA, etc."
                                onChange={this.handleChange}
                                value={this.state.beerType}
                            />
                            <input
                                type="text"
                                name="ABV"
                                placeholder="5.6%"
                                onChange={this.handleChange}
                                value={this.state.ABV}
                            />
                            <input
                                type="text"
                                name="country"
                                placeholder="Brooklyn, New York"
                                onChange={this.handleChange}
                                value={this.state.country}
                            />
                            <input
                                type="text"
                                name="size"
                                placeholder="10oz, 14oz, etc"
                                onChange={this.handleChange}
                                value={this.state.size}
                            />
                            <input
                                type="text"
                                name="price"
                                placeholder="$5"
                                onChange={this.handleChange}
                                value={this.state.price}
                            />
                        </AddBrewForm>
                        <button>Add Brewski</button>
                    </form>
                </AddBrewWraper>
                <div>
                    <div className="display-item">
                        {this.state.beers.map(beer => {
                            return (
                                <div key={beer.id}>
                                    <h2>{beer.beerName}</h2>
                                    <p>{beer.beerType}</p>
                                    <p>{beer.ABV}</p>
                                    <p>{beer.country}</p>
                                    <p>{beer.size}</p>
                                    <p>{beer.price}</p>
                                    <button onClick={() => this.removeItem(beer.id)}>Remove Brewski</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    googleData: state.googleData
});

export default connect(mapStateToProps)(AddBrew);
