import React from 'react';
import styled from 'styled-components';
import BasicCell from './BasicCell';
import {getStylesFromProductCategory} from '../../domains/product/services/behaviors';

const ProductName = styled.strong`
  display: flex;
  font-size: small;
  font-weight: bold;
`;

const ProductCellContainer = styled(BasicCell)`
  outline: solid 1px ${props => props.outlineColor};
  background-color: ${props => props.backgroundColor};
`;

function ShopProductCell({product}) {
  const productConfig = getStylesFromProductCategory(product.category);

  return (
    <ProductCellContainer {...productConfig}>
      <ProductName>
        {product.displayName}
      </ProductName>
    </ProductCellContainer>
  );
}

export default ShopProductCell;
