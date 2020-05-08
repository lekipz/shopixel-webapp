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
