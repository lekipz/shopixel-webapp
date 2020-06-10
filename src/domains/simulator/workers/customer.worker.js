import {computePathToCoordinates, computePathToProduct} from '../services/pathfinding';
import {purchaseProduct} from '../../product/services/resources';
import {findExitCoordinates} from '../services/behaviors';
import {postTransaction} from '../../transaction/services/resources';
import {createRecommendations} from '../../customer/services/resources';

let customers = [];
const [exitRow, exitCol] = findExitCoordinates();

onmessage = function (event) {
  const [type] = event.data;
  const data = event.data[1];
  switch (type) {
    case 'add-customer':
      const duplicate = customers.map(({customer: {_id}}) => _id)
        .find((id) => data.customer._id === id);
      if (!duplicate) {
        customers.push(data);
        createRecommendations(data.customer._id, data.shoppingList)
      }
      break;
    case 'set-customers':
      customers = data.slice();
      break;
  }
};

// ===== Main Loop =====

setInterval(() => {
  const updatedCustomers = customers.map(customer => {
    const {row, col, targetIndex, path} = customer.travelling;
    if (row === exitRow && col === exitCol) {
      postTransaction({
        user: customer.customer._id,
        products: customer.shoppingList
          .filter(({status}) => status === 'purchased')
          .map(({_id}) => _id)
      });

      return null;
    }

    if (path === null) {
      return mapCustomerToNextPath(row, col, customer, targetIndex);
    } else if (path.length > 0) {
      return mapCustomerWhenWalkingTowardsTarget(path, customer);
    } else {
      return mapCustomerOnTargetProduct(customer, targetIndex);
    }
  }).filter(customer => !!customer);

  customers = updatedCustomers;
  postMessage(['update-customers', updatedCustomers]);
}, 500);

// ======================================================================

function mapCustomerToNextPath(row, col, customer, targetIndex) {
  let targetPath;
  if (customer.shoppingList.length === targetIndex) {
    targetPath = computePathToCoordinates(row, col, exitRow, exitCol);
  } else {
    targetPath = computePathToProduct(row, col, customer.shoppingList[targetIndex].name);
  }

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

function mapCustomerOnTargetProduct(customer, targetIndex) {
  if (customer.shoppingList[targetIndex].status === 'todo') {
    return mapCustomerOnPurchase(customer, targetIndex);
  } else if (customer.shoppingList[targetIndex].status === 'pending') {
    return customer;
  } else {
    return mapCustomerForNextTarget(customer, targetIndex);
  }
}

function mapCustomerOnPurchase(customer, targetIndex) {
  const newShoppingList = customer.shoppingList.slice();
  newShoppingList[targetIndex].status = 'pending';

  purchaseProduct(newShoppingList[targetIndex].name)
    .then(() => updateProductStatus(customer, targetIndex, 'purchased'))
    .catch(error => {
      if (error.status === 400) {
        updateProductStatus(customer, targetIndex, 'out-of-stock');
      } else {
        throw error;
      }
    });

  return {
    ...customer,
    shoppingList: newShoppingList
  };
}

function mapCustomerForNextTarget(customer, targetIndex) {
  return {
    ...customer,
    travelling: {
      ...customer.travelling,
      path: null,
      targetIndex: targetIndex + 1
    }
  };
}

function updateProductStatus(customer, targetIndex, status) {
  const customerToUpdate = customers.find(({customer: {_id}}) => customer.customer._id === _id);
  customerToUpdate.shoppingList[targetIndex].status = status;
}

