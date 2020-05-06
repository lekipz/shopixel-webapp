import React from 'react';
import useStoreConfig from '../useStoreConfig';
import Shop from '../../../components/shop/Shop';

function Simulator() {
  const {shopConfig, loading} = useStoreConfig();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  return <Shop rowsConfig={shopConfig}/>;
}

export default Simulator;
