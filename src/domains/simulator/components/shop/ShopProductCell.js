import React from 'react';
import styled from 'styled-components';
import Tooltip from '../Tooltip';
import BasicCell from './BasicCell';
import {getLogoFromProductName, getStylesFromProductCategory} from '../../../product/services/behaviors';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import useProductTooltip from '../../../product/useProductTooltip';

const ProductLogo = styled.div`
  display: flex;
  margin-bottom: 0.7vh;
`;

const ProductCellContainer = styled(BasicCell)`
  border: solid 1px ${props => props.outlineColor};
  background-color: ${props => props.backgroundColor};
  
  &:hover {
    transition: 0.4s;
    background-color: ${props => props.outlineColor};
    
    svg {
      transition: 0.5s;
      transform: scale(1.2, 1.2)
    }
  }
`;

function ShopProductCell({product, selectProduct}) {
  const {tooltip, activator} = useProductTooltip(product);
  const logo = getLogoFromProductName(product.name);
  return (
    <ProductCellContainer {...getStylesFromProductCategory(product.category)}
                          {...activator}
                          onClick={() => selectProduct(product.name)}>
      <ProductLogo>
        <FontAwesomeIcon icon={logo} size="3x"/>
      </ProductLogo>
      {tooltip}
    </ProductCellContainer>
  );
}

export default ShopProductCell;
