import * as PF from 'pathfinding';
import STORE_CONFIGURATION from '../../../lib/mocks/storeConfiguration.json';
import {findProductCoordinates} from './behaviors';

const pathWalkConfig = {
  product: 1,
  wall: 1,
  empty: 0,
  door: 0
}

const pathfinder = new PF.BestFirstFinder();

export function computePathToProduct(startRow, startCol, productName) {
  const [productRow, productCol] = findProductCoordinates(productName);
  return computePathToCoordinates(startRow, startCol, productRow, productCol);
}

export function computePathToCoordinates(startRow, startCol, targetRow, targetCol) {
  const path = pathfinder.findPath(startCol, startRow, targetCol, targetCol, createGrid());
  return path.slice(1);
}

function createGrid() {
  return new PF.Grid(STORE_CONFIGURATION.map(row => row.map(({type}) => pathWalkConfig[type])));
}
