import React, {useState} from 'react';
import useStoreConfig from '../useStoreConfig';
import Shop from './shop/Shop';
import styled from 'styled-components';
import Button from '../../../components/Button';
import {faPause, faPlay, faStop} from '@fortawesome/free-solid-svg-icons';
import useCustomerSimulation from '../useCustomerSimulation';
import useProductDetails from '../../product/useProductDetails';
import ProductDetails from '../../product/components/ProductDetails';
import {getRecommendations} from '../../customer/services/resources';

const SimulatorContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
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
const ShopContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2vh; 
`;

const ActionsContainer = styled.div`
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
  const {selectProduct, selectedProduct} = useProductDetails();

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  const selectCustomer = customer => {
    if (loadingRecommendations) {
      return;
    }
    setLoadingRecommendations(true);
    getRecommendations(customer.customer._id)
      .then(({products}) => products)
      .catch(error => {
        if (error.status === 404) {
          return [];
        }
        throw error;
      })
      .then(recommendedProducts => {
        setSelectedCustomer({
          ...customer,
          recommendedProducts
        });
        setLoadingRecommendations(false);
      });
  };

  const {shopConfig, loading} = useStoreConfig();
  const {
    customers,
    isRunning,
    toggle,
    stop
  } = useCustomerSimulation();

  if (loading) {
    return (
      <div>Loading...</div>
    );
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
                selectCustomer={selectCustomer}
                selectProduct={selectProduct}/>
        </ShopContainer>
      </SimulatorAndButtonWrapper>
      {selectedProduct && <ProductDetails selectedProduct={selectedProduct}>
      </ProductDetails>}
    </SimulatorContainer>
  );
}

export default Simulator;
