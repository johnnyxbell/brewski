import React, { Component } from 'react';
import { connect } from 'react-redux';
//import firebase from './firebase';
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
    img {
        width: 100%;
    }
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
    // constructor() {
    //     super();
    //     this.state = {
    //         beers: []
    //     };
    // }
    // componentDidMount() {
    //     const { googleData } = this.props;
    //     const beerRef = firebase.database().ref(`${googleData.uid}/beer`);
    //     beerRef.on('value', snapshot => {
    //         let beers = snapshot.val();
    //         let newState = [];
    //         for (let beer in beers) {
    //             newState.push({
    //                 id: beer,
    //                 beerName: beers[beer].beerName,
    //                 beerType: beers[beer].beerType,
    //                 ABV: beers[beer].ABV,
    //                 country: beers[beer].country,
    //                 size: beers[beer].size,
    //                 price: beers[beer].price,
    //                 image: beers[beer].image
    //             });
    //         }
    //         this.setState({
    //             beers: newState
    //         });
    //     });
    // }

    // onRender(googleData) {
    //     const beerRef = firebase.database().ref(`${googleData.uid}/beer`);
    //     beerRef.on('value', snapshot => {
    //         let beers = snapshot.val();
    //         let newState = [];
    //         for (let beer in beers) {
    //             newState.push({
    //                 id: beer,
    //                 beerName: beers[beer].beerName,
    //                 beerType: beers[beer].beerType,
    //                 ABV: beers[beer].ABV,
    //                 country: beers[beer].country,
    //                 size: beers[beer].size,
    //                 price: beers[beer].price,
    //                 image: beers[beer].image
    //             });
    //         }
    //         this.setState({
    //             beers: newState
    //         });
    //     });
    // }
    //
    // componentWillReceiveProps(nextProps) {
    //     if (this.props.googleData !== nextProps.googleData) {
    //         this.onRender(nextProps.googleData);
    //     }
    // }

    loadBeers() {
        const { userData } = this.props;
        console.log('hi', userData.beer);
        if (userData.beer) {
            return Object.keys(userData.beer).map(item => (
                <BeerItem key={item}>
                    <h3>{userData.beer[item].beerName}</h3>
                    {userData.beer[item].image ? <img src={userData.beer[item].image} /> : ''}
                    <p>
                        {userData.beer[item].beerType}, ABV - {userData.beer[item].ABV}
                    </p>
                    <p>{userData.beer[item].country}</p>
                    <p>
                        {userData.beer[item].size}, {userData.beer[item].price}
                    </p>
                    <p>
                        {userData.beer[item].size2 ? `${userData.beer[item].size2},  ` : ''}
                        {userData.beer[item].price2 ? userData.beer[item].price2 : ''}
                    </p>
                </BeerItem>
            ));
        } else {
            return '';
        }
    }

    loadButton() {
        const { googleData, userData } = this.props;
        if (userData.beer) {
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
                    We are currently working on multiple boards / locations.{' '}
                    <a href="mailto:hi@johnnybell.io">be the first to find out</a> when its available
                </p>
                <BeerItemWrapper>{this.loadBeers()}</BeerItemWrapper>
                {this.loadButton()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userData: state.userData,
    googleData: state.googleData
});

export default connect(mapStateToProps)(ManageBoards);
