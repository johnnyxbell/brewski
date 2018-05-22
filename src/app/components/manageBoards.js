import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from './firebase';
import styled from 'styled-components';

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
    flex: 1 0 20%;
    max-width: 20%;
    margin: 0 10px 25px 10px;
    p {
        padding: 0;
        margin: 0;
    }
    h3 {
        padding: 0;
        margin: 0 0 10px 0;
    }
`;

const Button = styled.a`
    background-color: #006ab6;
    border-radius: 3px;
    padding: 10px 35px;
    width: auto;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    color: white;
    transition: opacity 0.5s ease;
    border: none;
    margin-top: 10px;
    text-decoration: none;
    &:hover {
        opacity: 0.7;
    }
`;

class ManageBoards extends Component {
    constructor() {
        super();
        this.state = {
            beers: []
        };
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

    onRender(googleData) {
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

    componentWillReceiveProps(nextProps) {
        if (this.props.googleData !== nextProps.googleData) {
            this.onRender(nextProps.googleData);
        }
    }

    loadBeers() {
        if (this.state.beers.length) {
            return this.state.beers.map(beer => (
                <BeerItem key={beer.id}>
                    <h3>{beer.beerName}</h3>
                    <p>
                        {beer.beerType}, ABV - {beer.ABV}
                    </p>
                    <p>{beer.country}</p>
                    <p>
                        {beer.size}, {beer.price}
                    </p>
                </BeerItem>
            ));
        } else {
            return '';
        }
    }

    loadButton() {
        const { googleData } = this.props;
        if (this.state.beers.length) {
            return (
                <Button href={`/board-${googleData.uid}`} target="_blank">
                    View my public board
                </Button>
            );
        } else {
            return '';
        }
    }

    render() {
        return (
            <div>
                <h1>Manage Boards</h1>
                <p>
                    You currently only have access to a single board, <a href="mailto:hi@johnnybell.io">upgrade</a> to
                    unlock multiple
                </p>
                <BeerItemWrapper>{this.loadBeers()}</BeerItemWrapper>
                {this.loadButton()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userName: state.userName,
    googleData: state.googleData
});

export default connect(mapStateToProps)(ManageBoards);
