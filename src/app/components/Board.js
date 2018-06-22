import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';

class Board extends Component {
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
