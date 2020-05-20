import React from 'react';
import Simulator from '../domains/simulator/components/Simulator';
import styled from 'styled-components';

const RootContainer = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;

function App() {
  return (
    <RootContainer>
      <Simulator/>
    </RootContainer>
  );
}

export default App;
