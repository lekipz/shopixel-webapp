import {useEffect, useRef, useState} from 'react';
import {makeCustomerArrival} from '../customer/services/behaviors';
import {getShoppingList} from '../product/services/resources';
import {findEntranceCoordinates} from './services/behaviors';
import {computePathToProduct} from './services/pathfinding';

export default function useCustomerSimulation() {
  const [customers, setCustomers] = useState([]);
  const hasGenerationTimeout = useRef(false);

  useEffect(() => {
    if (!hasGenerationTimeout.current) {
      hasGenerationTimeout.current = true;
      setTimeout(async () => {
        if (customers.length === 5) {
          return;
        }
        const newCustomer = await generateCustomer(customers);
        hasGenerationTimeout.current = false;
        setCustomers(c => ([
          ...c,
          newCustomer
        ]));
      }, 5000);
    }
  }, [customers]);

  useEffect(() => {
    setTimeout(() => {
      const updatedCustomers = customers.map(customer => {
        const {row, col, targetIndex, path} = customer.travelling;
        if (path === null) {
          const targetPath = computePathToProduct(row, col, customer.shoppingList[targetIndex].name);
          console.log('path', targetPath);

          return {
            ...customer,
            travelling: {
              ...customer.travelling,
              path: targetPath
            }
          }
        }
        return customer;
      });

      setCustomers(updatedCustomers);
    }, 1000);
  }, [customers]);

  return {
    customers
  };
}

async function generateCustomer(customers) {
  const customer = await makeCustomerArrival(customers);
  const generatedShoppingList = await getShoppingList(customer.profile);
  const computedShoppingList = generatedShoppingList.map(product => ({
    ...product,
    status: 'pending'
  }));
  const [row, col] = findEntranceCoordinates();

  return {
    customer,
    shoppingList: computedShoppingList,
    travelling: {
      row,
      col,
      path: null,
      targetIndex: 0
    }
  };
}
