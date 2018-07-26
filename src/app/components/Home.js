import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    loadBeers() {
        const { userData } = this.props;
        if (userData.location) {
            return Object.keys(userData.location).map(item => (
                <div key={item}>
                    <h3>{userData.location[item].locationName}</h3>
                    <p>{userData.location[item].locationAddress}</p>
                </div>
            ));
        } else {
            return;
        }
    }

    loadTitle() {
        const { userData } = this.props;
        if (userData.location) {
            return <h2>Whats on Tap? & Where?</h2>;
        } else {
            return 'No beers on tap, Add a Beer';
        }
    }

    initLoad() {
        const { userData } = this.props;
        if (userData) {
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
                <h1>Dashboard</h1>
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
    userData: state.userData
});

export default connect(mapStateToProps)(Home);
