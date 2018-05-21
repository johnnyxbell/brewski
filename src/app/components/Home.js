import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        const { googleData, beers } = this.props;
        console.log(googleData);
        console.log('beers', beers);
        return (
            <div>
                <h1>Home</h1>
                <p>{`Welcome back ${googleData.displayName}.`}</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userName: state.userName,
    googleData: state.googleData
});

export default connect(mapStateToProps)(Home);
