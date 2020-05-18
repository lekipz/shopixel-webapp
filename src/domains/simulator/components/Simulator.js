import React, {useEffect, useState} from 'react';
import useStoreConfig from '../useStoreConfig';
import Shop from './shop/Shop';
import {makeCustomerArrival} from '../../customer/services/behaviors';
import {findEntranceCoordinates} from '../services/behaviors';
import styled from 'styled-components';
import {getShoppingList} from '../../product/services/resources';

const ShopContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function Simulator() {
  const {shopConfig, loading} = useStoreConfig();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (customers.length === 1) {
        return;
      }

      const customer = await makeCustomerArrival(customers);
      const generatedShoppingList = await getShoppingList(customer.profile);
      const computedShoppingList = generatedShoppingList.map(product => ({
        ...product,
        status: 'pending'
      }));
      const [row, col] = findEntranceCoordinates();

      setCustomers([
        ...customers,
        {
          customer,
          shoppingList: computedShoppingList,
          coordinates: {
            row,
            col
          }
        }
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, [customers]);

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
