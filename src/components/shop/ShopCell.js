import React from 'react';
import BasicCell from './BasicCell';
import ShopProductCell from './ShopProductCell';
import ShopDoorCell from './ShopDoorCell';

function ShopCell({config}) {
  const {type = ''} = config;

  switch (type) {
    case 'product':
      const {product} = config;
      return <ShopProductCell product={product}/>;
    case 'door':
      const {door} = config;
      return <ShopDoorCell door={door}/>;
    default:
      return <BasicCell/>;
  }
}

export default ShopCell;
