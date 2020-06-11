import React, {useState} from 'react';
import {getStylesFromProductCategory} from './services/behaviors';
import ProductTooltip from './components/ProductTooltip';

export default function useProductTooltip(product) {
  const [isShown, setShown] = useState(false);
  const productConfig = getStylesFromProductCategory(product.category);

  const activator = {
    onMouseEnter: () => setShown(true),
    onMouseLeave: () => setShown(false)
  };

  const tooltip = isShown ? <ProductTooltip productConfig={{color: productConfig, name: product.displayName}}/> : null;

  return {
    tooltip,
    activator
  };
}
