import * as PF from 'pathfinding';
import STORE_CONFIGURATION from '../../../lib/mocks/storeConfiguration.json';
import {findProductCoordinates} from './behaviors';

const pathWalkConfig = {
  product: 1,
  wall: 1,
  empty: 0,
  door: 0
}

const shopGrid = new PF.Grid(STORE_CONFIGURATION.map(row => row.map(({type}) => pathWalkConfig[type])));

const pathfinder = new PF.BestFirstFinder();

export function computePathToProduct(startRow, startCol, productName) {
  const [productRow, productCol] = findProductCoordinates(productName);
  const path = pathfinder.findPath(startCol, startRow, productCol, productRow, shopGrid);
  return path.slice(1);
}