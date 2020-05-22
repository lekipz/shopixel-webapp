import {getAllProducts, refillProduct} from '../../product/services/resources';
import STORE_CONFIG from '../../../lib/mocks/storeConfiguration.json';

function scheduleReconfiguration() {
  setTimeout(startReconfiguration, 4000);
}

async function startReconfiguration() {
  const products = await getAllProducts();
  const mappedProducts = await Promise.all(products.map(product => {
    const threshold = Math.floor(product.maxStock * 0.25);
    if (product.currentStock <= threshold) {
      return refillProduct(product.name);
    }
    return product;
  }));

  const builtStoreConfig = await STORE_CONFIG.map(rowConfig => rowConfig
    .map(cellConfig => {
      if (cellConfig.type !== 'product') {
        return cellConfig;
      }
      const product = mappedProducts.find(({name}) => name === cellConfig.product);
      return {
        ...cellConfig,
        product
      };
    }));
  postMessage(builtStoreConfig);
  return scheduleReconfiguration();
}

startReconfiguration();
