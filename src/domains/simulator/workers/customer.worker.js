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

setInterval(() => {
  const updatedCustomers = customers.map(customer => {
    const {row, col, targetIndex, path} = customer.travelling;
    if (path === null) {
      const targetPath = computePathToProduct(row, col, customer.shoppingList[targetIndex].name);

      return {
        ...customer,
        travelling: {
          ...customer.travelling,
          path: targetPath
        }
      }
    } else if (path.length > 0) {
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
    return customer;
  });

  customers = updatedCustomers;
  postMessage(['update-customers', updatedCustomers]);
}, 500)
