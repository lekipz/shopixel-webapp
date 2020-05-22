import {useRef, useState} from 'react';
import StoreConfigWorker from './workers/store-config.worker';

function useStoreConfig() {
  const [loading, setLoading] = useState(true);
  const [shopConfig, setShopConfig] = useState(null);
  const productRefillWorker = useRef(null);

  if (productRefillWorker.current === null) {
    productRefillWorker.current = new StoreConfigWorker();
    productRefillWorker.current.onmessage = function(event) {
      const {data} = event;
      setShopConfig(data);
      setLoading(false);
    }
  }

  return {
    loading,
    shopConfig
  };
}

export default useStoreConfig;
