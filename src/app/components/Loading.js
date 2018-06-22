import React from 'react';
import Lottie from 'react-lottie';
import * as loadingAnimation from '../assets/animations/loading.json';
import styled from 'styled-components';

const Loader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

class Loading extends React.Component {
    render() {
        const options = {
            loop: true,
            autoplay: true,
            animationData: loadingAnimation,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <Loader>
                <Lottie options={options} height={100} width={100} />
            </Loader>
        );
    }
}

export default Loading;
