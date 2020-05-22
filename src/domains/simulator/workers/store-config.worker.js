import {getAllProducts} from '../../product/services/resources';
import STORE_CONFIG from '../../../lib/mocks/storeConfiguration.json';

function scheduleReconfiguration() {
  setTimeout(startReconfiguration, 15000);
}

async function startReconfiguration() {
  const products = await getAllProducts();
  const builtStoreConfig = await STORE_CONFIG.map(rowConfig => rowConfig
    .map(cellConfig => {
      if (cellConfig.type !== 'product') {
        return cellConfig;
      }
      const product = products.find(({name}) => name === cellConfig.product);
      return {
        ...cellConfig,
        product
      };
    }));
  postMessage(builtStoreConfig);
  return scheduleReconfiguration();
}

startReconfiguration();
