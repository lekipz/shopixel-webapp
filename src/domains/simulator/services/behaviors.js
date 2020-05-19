import STORE_CONFIG from '../../../lib/mocks/storeConfiguration.json';

export function findEntranceCoordinates() {
  return STORE_CONFIG.reduce((resultRow, row, index) => {
    if (resultRow) {
      return resultRow;
    }

    const entranceCellIndex = row.findIndex(({type, door}) => type === 'door' && door.arrowPosition === 'top');
    if (entranceCellIndex >= 0) {
      return [index, entranceCellIndex]
    }

    return null;
  }, null);
}

export function findExitCoordinates() {
  return STORE_CONFIG.reduce((resultRow, row, index) => {
    if (resultRow) {
      return resultRow;
    }

    const entranceCellIndex = row.findIndex(({type, door}) => type === 'door' && door.arrowPosition === 'bot');
    if (entranceCellIndex >= 0) {
      return [index, entranceCellIndex]
    }

    return null;
  }, null);
}

export function findProductCoordinates(productName) {
  return STORE_CONFIG.reduce((resultRow, row, index) => {
    if (resultRow) {
      return resultRow;
    }

    const productCellIndex = row.findIndex(({type, product}) => type === 'product' && product === productName);
    if (productCellIndex >= 0) {
      const productCell = row[productCellIndex];
      const computedRowIndex = productCell.access === 'bot' ? index + 1 : index - 1;
      return [computedRowIndex, productCellIndex];
    }

    return null;
  }, null);
}
