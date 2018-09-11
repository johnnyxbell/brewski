import React from 'react';
import styled from 'styled-components';

const UpgradePanel = styled.div``;

class Upgrade extends React.Component {
    render() {
        return (
            <UpgradePanel>
                <h1>Upgrade</h1>
                <p>We are currently in free mode, you have access to all the features.</p>
            </UpgradePanel>
        );
    }
}

export default Upgrade;
