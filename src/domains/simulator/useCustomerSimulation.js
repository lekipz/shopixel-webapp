import {useEffect, useRef, useState} from 'react';
import {makeCustomerArrival} from '../customer/services/behaviors';
import {getShoppingList} from '../product/services/resources';
import {findEntranceCoordinates} from './services/behaviors';
import CustomerWorker from './workers/customer.worker';

export default function useCustomerSimulation() {
  const [customers, setCustomers] = useState([]);
  const hasGenerationTimeout = useRef(false);
  const customerWorker = useRef(null);

  if (customerWorker.current === null) {
    customerWorker.current = new CustomerWorker();
    customerWorker.current.onmessage = function(event) {
      const [type] = event.data;
      switch(type) {
        case 'update-customers':
          setCustomers(event.data[1]);
          break;
        default:
          console.warn('Unknown event ' + type);
      }
    }
  }

  useEffect(() => {
    if (!hasGenerationTimeout.current) {
      hasGenerationTimeout.current = true;
      setTimeout(async () => {
        if (customers.length === 1) {
          return;
        }
        const newCustomer = await generateCustomer(customers);
        hasGenerationTimeout.current = false;
        customerWorker.current.postMessage(['add-customer', newCustomer]);
      }, 5000);
    }
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
    status: 'todo'
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
