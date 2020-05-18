import {computePathToProduct} from '../services/pathfinding';

let customers = [];

onmessage = function(event) {
  const [type] = event.data;
  switch(type) {
    case 'add-customer':
      customers.push(event.data[1]);
      break;
  }
}

function mapCustomerToNextPath(row, col, customer, targetIndex) {
  const targetPath = computePathToProduct(row, col, customer.shoppingList[targetIndex].name);

  return {
    ...customer,
    travelling: {
      ...customer.travelling,
      path: targetPath
    }
  };
}

function mapCustomerWhenWalkingTowardsTarget(path, customer) {
  const [nextCol, nextRow] = path[0];
  const newPath = path.slice(1);
  return {
    ...customer,
    travelling: {
      ...customer.travelling,
      path: newPath,
      col: nextCol,
      row: nextRow
    }
  };
}

setInterval(() => {
  const updatedCustomers = customers.map(customer => {
    const {row, col, targetIndex, path} = customer.travelling;
    if (path === null) {
      return mapCustomerToNextPath(row, col, customer, targetIndex);
    } else if (path.length > 0) {
      return mapCustomerWhenWalkingTowardsTarget(path, customer);
    }
    return customer;
  });

  customers = updatedCustomers;
  postMessage(['update-customers', updatedCustomers]);
}, 500)
