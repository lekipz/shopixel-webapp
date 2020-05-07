import React from 'react';
import styled from 'styled-components';
import Simulator from '../domains/simulator/components/Simulator';

const ApplicationContainer = styled.main`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;

function App() {
  return (
    <ApplicationContainer>
      <Simulator/>
    </ApplicationContainer>
  );
}

export default App;
