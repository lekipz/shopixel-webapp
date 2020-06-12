import React from 'react';
import useStoreConfig from '../useStoreConfig';
import Shop from './shop/Shop';
import styled from 'styled-components';
import Button from '../../../components/Button';
import {faPause, faPlay, faStop} from '@fortawesome/free-solid-svg-icons';
import useCustomerSimulation from '../useCustomerSimulation';
import useProductDetails from '../../product/useProductDetails';
import ProductDetails from '../../product/components/ProductDetails';
import CustomerDetails from '../../customer/components/CustomerDetails';
import useCustomerDetails from '../../customer/useCustomerDetails';

const SimulatorContainer = styled.main`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: stretch;
  
  & > * {
    margin: 12px 0;
  }
`;

const SimulatorAndButtonWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start; 
`;

const ShopContainer = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 2vh; 
`;

const ActionsContainer = styled.section`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  
  & > * {
    &:not(:first-child) {
      margin-left: 4px;
    }
    
    &:not(:last-child) {
      margin-right: 4px;
    }
  }
`;

function Simulator() {
  const {shopConfig, loading} = useStoreConfig();
  const {
    customers,
    isRunning,
    toggle,
    stop
  } = useCustomerSimulation();
  const {selectProduct, selectedProduct, clear: clearProduct} = useProductDetails();
  const {selectCustomer, selectedCustomer, clear: clearCustomer} = useCustomerDetails(customers);

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  const handleSelectCustomer = customer => {
    clearProduct();
    selectCustomer(customer);
  }
  const handleSelectProduct = product => {
    clearCustomer();
    selectProduct(product);
  }

  return (
    <SimulatorContainer>
      <SimulatorAndButtonWrapper>
        <ActionsContainer>
          <Button type="button" onClick={toggle}
                  icon={isRunning ? faPause : faPlay}>
            {isRunning ? 'Pause' : 'Play'}
          </Button>
          <Button type="button" onClick={stop} icon={faStop}>
            Stop
          </Button>
        </ActionsContainer>
        <ShopContainer>
          <Shop rowsConfig={shopConfig}
                customers={customers}
                selectCustomer={handleSelectCustomer}
                selectProduct={handleSelectProduct}/>
        </ShopContainer>
      </SimulatorAndButtonWrapper>
      {selectedProduct && (
        <ProductDetails selectedProduct={selectedProduct}/>
      )}
      {selectedCustomer && (
        <CustomerDetails customer={selectedCustomer}/>
      )}
    </SimulatorContainer>
  );
}

export default Simulator;
