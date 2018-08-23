import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
    loadBeers() {
        const { userData } = this.props;

        if (userData.location) {
            let mainItems = [];
            // Map through the object to get the data
            Object.keys(userData.location).map(item => {
                mainItems.push(
                    <h3>
                        {userData.location[item].locationName} <span>({userData.location[item].locationAddress})</span>
                    </h3>
                );
                if (userData.location[item].beer) {
                    Object.keys(userData.location[item].beer).map(j => {
                        mainItems.push(
                            <div>
                                <p>{userData.location[item].beer[j].beerName}</p>
                                {userData.location[item].beer[j].image ? (
                                    <img src={userData.location[item].beer[j].image} />
                                ) : (
                                    ''
                                )}
                            </div>
                        );
                    });
                } else {
                    mainItems.push(
                        <div key={item}>
                            <Link to="/add-brews">
                                <button>Add Some Beers</button>
                            </Link>
                        </div>
                    );
                }
            });
            return mainItems;
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
