import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    loadBeers() {
        const { beerList } = this.props;
        console.log('hi', beerList);
        if (beerList.beer) {
            return Object.keys(beerList.beer).map(item => (
                <div key={item}>
                    <h3>{beerList.beer[item].beerName}</h3>
                </div>
            ));
        } else {
            return;
        }
    }

    loadTitle() {
        const { beerList } = this.props;
        if (beerList.beer) {
            return <h2>Whats on Tap</h2>;
        } else {
            return 'No beers on tap, Add a Beer';
        }
    }

    initLoad() {
        const { beerList } = this.props;
        if (beerList) {
            this.loadTitle();
            this.loadBeers();
        } else {
            return 'loading...';
        }
    }

    render() {
        const { googleData } = this.props;
        return (
            <div>
                <h1>Home</h1>
                <p>{`Welcome back ${googleData.displayName}.`}</p>
                {this.loadTitle()}
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
