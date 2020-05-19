import React from 'react';
import useStoreConfig from '../useStoreConfig';
import Shop from './shop/Shop';
import styled from 'styled-components';
import useCustomerSimulation from '../useCustomerSimulation';

const ShopContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function Simulator() {
  const {shopConfig, loading} = useStoreConfig();
  const {customers} = useCustomerSimulation();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <ShopContainer>
      <Shop rowsConfig={shopConfig}
            customers={customers}/>
    </ShopContainer>
  );
}

export default Simulator;
