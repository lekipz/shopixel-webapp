import React from 'react';
import styled from 'styled-components';
import Shop from '../components/shop/Shop';
import storeConfiguration from '../lib/mocks/storeConfiguration';

const ApplicationContainer = styled.main`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;

function App() {
  return (
    <ApplicationContainer>
      <Shop rowsConfig={storeConfiguration}/>
    </ApplicationContainer>
  );
}

export default App;
