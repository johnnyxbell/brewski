import React, { Component } from 'react';
import { connect } from 'react-redux';

class Board extends Component {
    render() {
        //const { googleData } = this.props;
        return (
            <div>
                <h1>Your Public Board</h1>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    googleData: state.googleData
});

export default connect(mapStateToProps)(Board);
