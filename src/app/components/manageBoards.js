import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SelectLocationPanel from './panels/SelectLocationPanel';

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
    loadBeers() {
        const { userData, activeLocation } = this.props;
        console.log('Active Location', activeLocation);
        if (!userData.location) {
            return '';
        } else {
            if (!userData.location[activeLocation].beer) {
                return <h2>Yo, there is no beers for this location, add one above.</h2>;
            } else {
                return Object.keys(userData.location[activeLocation].beer).map(item => (
                    <BeerItem key={item}>
                        <h3>{userData.location[activeLocation].beer[item].beerName}</h3>
                        {userData.location[activeLocation].beer[item].image ? (
                            <img src={userData.location[activeLocation].beer[item].image} />
                        ) : (
                            ''
                        )}
                        <p>
                            {userData.location[activeLocation].beer[item].beerType}, ABV -{' '}
                            {userData.location[activeLocation].beer[item].ABV}
                        </p>
                        <p>{userData.location[activeLocation].beer[item].country}</p>
                        <p>
                            {userData.location[activeLocation].beer[item].size},{' '}
                            {userData.location[activeLocation].beer[item].price}
                        </p>
                        <p>
                            {userData.location[activeLocation].beer[item].size2
                                ? `${userData.location[activeLocation].beer[item].size2},  `
                                : ''}
                            {userData.location[activeLocation].beer[item].price2
                                ? userData.location[activeLocation].beer[item].price2
                                : ''}
                        </p>
                    </BeerItem>
                ));
            }
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
                <SelectLocationPanel />
                <BeerItemWrapper>{this.loadBeers()}</BeerItemWrapper>
                {this.loadButton()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userData: state.userData,
    googleData: state.googleData,
    activeLocation: state.activeLocation
});

export default connect(mapStateToProps)(ManageBoards);
