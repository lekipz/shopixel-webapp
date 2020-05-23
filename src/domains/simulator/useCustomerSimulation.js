import {useEffect, useRef, useState} from 'react';
import {makeCustomerArrival} from '../customer/services/behaviors';
import {getShoppingList} from '../product/services/resources';
import {findEntranceCoordinates} from './services/behaviors';
import CustomerWorker from './workers/customer.worker';

export default function useCustomerSimulation() {
  const [customers, setCustomers] = useState([]);
  const [isRunning, setRunning] = useState(false);
  const generationTimeoutID = useRef(null);
  const customerWorker = useRef(null);

  useEffect(() => {
    if (isRunning && customerWorker.current === null) {
      customerWorker.current = new CustomerWorker();
      customerWorker.current.postMessage(['set-customers', customers]);
      customerWorker.current.onmessage = function (event) {
        const [type] = event.data;
        switch (type) {
          case 'update-customers':
            setCustomers(event.data[1]);
            break;
          default:
            console.warn('Unknown event ' + type);
        }
      };
    } else if (!isRunning && customerWorker.current !== null) {
      customerWorker.current.terminate();
      customerWorker.current = null;
    }
  }, [isRunning, customers]);

  useEffect(() => {
    if (isRunning && !generationTimeoutID.current && !!customerWorker.current && customers.length < 10) {
      const customerTimeout = Math.max(Math.exp(customers.length * 0.2) * 0.25, 1) * 900;
      generationTimeoutID.current = setTimeout(async () => {
        generationTimeoutID.current = null;
        const newCustomer = await generateCustomer(customers.map(({customer}) => customer));
        customerWorker.current.postMessage(['add-customer', newCustomer]);
      }, customerTimeout);
    } else if (!isRunning && generationTimeoutID.current !== null) {
      clearTimeout(generationTimeoutID.current);
      generationTimeoutID.current = null;
    }
  }, [customers, isRunning]);

  const stop = () => {
    setRunning(false);
    setCustomers([]);
  };

  return {
    customers,
    isRunning,
    toggle: () => setRunning(!isRunning),
    stop
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
