import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const MyAccountPanel = styled.div`
    p {
        line-height: 14px;
    }
`;

const Image = styled.img`
    width: 200px;
    height: auto;
`;

const ImageText = styled.p`
    width: 200px;
    height: auto;
    font-style: italic;
    padding-bottom: 5px;
    margin-top: -3px;
`;

class MyAccount extends Component {
    render() {
        const { googleData } = this.props;
        return (
            <MyAccountPanel>
                <h1>My Account</h1>
                <p>You are signed in with google</p>
                <Image src={googleData.photoURL} />
                <ImageText>You sexy devil</ImageText>
                <p>
                    Username: <strong>{googleData.displayName}</strong>
                </p>
                <p>
                    Email: <strong>{googleData.email}</strong>
                </p>
            </MyAccountPanel>
        );
    }
}

const mapStateToProps = state => ({
    googleData: state.googleData
});

export default connect(mapStateToProps)(MyAccount);
