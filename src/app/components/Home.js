import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
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
    text-decoration: none;
    &:hover {
        opacity: 0.7;
    }
`;

// const HomeItemWrapper = styled.div`
//     display: flex;
//     flex-flow: row wrap;
//     justify-content: flex-start;
//     margin-left: -10px;
//     margin-right: -10px;
// `;

// const HomeItem = styled.div`
//     box-shadow: 0 1px 17px 0 rgba(0, 0, 0, 0.07);
//     padding: 20px;
//     flex: 1 0 20%;
//     max-width: 20%;
//     margin: 0 10px 25px 10px;
//     p {
//         padding: 0;
//         margin: 0;
//     }
//     h3 {
//         padding: 0;
//         margin: 0 0 10px 0;
//     }
// `;

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
                            <p>No beers yet...</p>
                            <Link to="/add-brews">
                                <Button>Add Some Beers</Button>
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
