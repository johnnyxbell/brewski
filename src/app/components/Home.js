import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    loadBeers() {
        const { beerList } = this.props;
        console.log('hi', beerList.beer);
        if (beerList.beer) {
            return Object.keys(beerList.beer).map(item => (
                <div key={item}>
                    <h3>{beerList.beer[item].beerName}</h3>
                </div>
            ));
        } else {
            return '';
        }
    }

    render() {
        const { googleData } = this.props;
        return (
            <div>
                <h1>Home</h1>
                <p>{`Welcome back ${googleData.displayName}.`}</p>
                {this.loadBeers()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userName: state.userName,
    googleData: state.googleData,
    beerList: state.beerList
});

export default connect(mapStateToProps)(Home);
