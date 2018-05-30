import React, { Component } from 'react';
import { connect } from 'react-redux';
//import firebase from './firebase';
import Loading from './Loading';

class Board extends Component {
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
    //
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
                <div key={item}>
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
                </div>
            ));
        } else {
            return <Loading />;
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
           body {
           margin:0!important;
           padding:0!important!
           }
        `}</style>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userData: state.userData,
    googleData: state.googleData
});

export default connect(mapStateToProps)(Board);
