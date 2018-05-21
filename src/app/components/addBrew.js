import React, { Component } from 'react';
import firebase from './firebase';
import { connect } from 'react-redux';
import styled from 'styled-components';

const AddBrewWrapper = styled.div`
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

const AddBrewForm = styled.form`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    label {
        flex-basis: 30%;
        margin: 10px 0;
        position: relative;
        text-align: left;
    }
    input {
        height: 25px;
        width: 100%;
        padding-left: 5px;
    }
`;

const DisplayBeers = styled.div``;

const BeerItemWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin-left: -10px;
    margin-right: -10px;
`;

const BeerItem = styled.div`
    box-shadow: 0 1px 17px 0 rgba(0, 0, 0, 0.07);
    padding: 20px;
    flex-basis: 20%;
    margin: 0 10px 25px 10px;
    p{
    padding: 0;
    margin: 0;
    }
    h3 {
    padding: 0;
    margin: 0 0 10px 0;
    }
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
                <AddBrewWrapper>
                    <form onSubmit={this.handleSubmit}>
                        <AddBrewForm>
                            <label>
                                Name of beer
                                <input
                                    type="text"
                                    name="beerName"
                                    placeholder="Lagunitas, Fat Yak, etc"
                                    onChange={this.handleChange}
                                    value={this.state.beerName}
                                />
                            </label>

                            <label>
                                Type
                                <input
                                    type="text"
                                    name="beerType"
                                    placeholder="Stout, Larger, IPA, etc."
                                    onChange={this.handleChange}
                                    value={this.state.beerType}
                                />
                            </label>
                            <label>
                                ABV
                                <input
                                    type="text"
                                    name="ABV"
                                    placeholder="5.6%"
                                    onChange={this.handleChange}
                                    value={this.state.ABV}
                                />
                            </label>
                            <label>
                                Origin
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Brooklyn, New York"
                                    onChange={this.handleChange}
                                    value={this.state.country}
                                />
                            </label>
                            <label>
                                Size
                                <input
                                    type="text"
                                    name="size"
                                    placeholder="10oz, 14oz, etc"
                                    onChange={this.handleChange}
                                    value={this.state.size}
                                />
                            </label>
                            <label>
                                Cost
                                <input
                                    type="text"
                                    name="price"
                                    placeholder="$5"
                                    onChange={this.handleChange}
                                    value={this.state.price}
                                />
                            </label>
                        </AddBrewForm>
                        <button>Add Brewski 🍻</button>
                    </form>
                </AddBrewWrapper>
                <div>
                    <DisplayBeers>
                        <h2>Beer List</h2>
                        <BeerItemWrapper>
                            {this.state.beers.map(beer => {
                                return (
                                    <BeerItem key={beer.id}>
                                        <h3>{beer.beerName}</h3>
                                        <p>
                                            {beer.beerType}, ABV - {beer.ABV}
                                        </p>
                                        <p>{beer.country}</p>
                                        <p>
                                            {beer.size}, {beer.price}
                                        </p>
                                        <button onClick={() => this.removeItem(beer.id)}>Remove Brewski</button>
                                    </BeerItem>
                                );
                            })}
                        </BeerItemWrapper>
                    </DisplayBeers>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    googleData: state.googleData
});

export default connect(mapStateToProps)(AddBrew);
