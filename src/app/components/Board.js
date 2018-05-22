import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from './firebase';

class Board extends Component {
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
                <div key={beer.id}>
                    <h3>{beer.beerName}</h3>
                    <p>
                        {beer.beerType}, ABV - {beer.ABV}
                    </p>
                    <p>{beer.country}</p>
                    <p>
                        {beer.size}, {beer.price}
                    </p>
                </div>
            ));
        } else {
            return <div>loading...</div>;
        }
    }
    render() {
        return (
            <div>
                <div>{this.loadBeers()}</div>
                <style>{`
          .header {
            display: none!important;
           }
        `}</style>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userName: state.userName,
    googleData: state.googleData
});

export default connect(mapStateToProps)(Board);
