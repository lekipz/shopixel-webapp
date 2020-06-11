import React from 'react';
import BasicCell from './BasicCell';
import ShopProductCell from './ShopProductCell';
import ShopDoorCell from './ShopDoorCell';
import WallCell from './WallCell';

function ShopCell({config, selectProduct}) {
  const {type = ''} = config;

  switch (type) {
    case 'product':
      const {product} = config;
      return <ShopProductCell product={product}
                              selectProduct={selectProduct}/>;
    case 'door':
      const {door} = config;
      return <ShopDoorCell door={door}/>;
    case 'wall':
      return <WallCell/>
    default:
      return <BasicCell/>;
  }
}

export default ShopCell;
