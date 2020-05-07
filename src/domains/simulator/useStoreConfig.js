import {useState} from 'react';
import storeConfiguration from '../../lib/mocks/storeConfiguration.json';
import {getAllProducts} from '../product/services/resources';

function useStoreConfig() {
  const [loading, setLoading] = useState(false);
  const [shopConfig, setShopConfig] = useState(null);

  if (!loading && !shopConfig) {
    setLoading(true);
    getAllProducts()
      .then(products => storeConfiguration
        .map(rowConfig => rowConfig
          .map(cellConfig => {
            if (cellConfig.type !== 'product') {
              return cellConfig;
            }
            const product = products.find(({name}) => name === cellConfig.product);
            return {
              ...cellConfig,
              product
            };
          })))
      .then(builtShopConfig => {
        setShopConfig(builtShopConfig);
        setLoading(false);
      });
  }

  return {
    loading,
    shopConfig
  };
}

export default useStoreConfig;
