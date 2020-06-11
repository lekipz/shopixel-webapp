import React, {useState} from 'react';
import styled from 'styled-components';
import Tooltip from '../Tooltip';
import BasicCell from './BasicCell';
import {getStylesFromProductCategory, getLogoFromProductName} from '../../../product/services/behaviors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  const [isShown, setShown] = useState(false);
  const productConfig = getStylesFromProductCategory(product.category);
  const logo = getLogoFromProductName(product.name);
  return (
    <ProductCellContainer {...productConfig} onMouseEnter={() => setShown(true)} 
                                             onMouseLeave={() => setShown(false)}
                                             onClick={() => selectProduct(product.name)}>
      <ProductLogo>
        <FontAwesomeIcon icon={logo} size="3x"></FontAwesomeIcon>
      </ProductLogo>
      {isShown && <Tooltip productConfig={{color: productConfig, name: product.displayName}}/>}
    </ProductCellContainer>
  );
};

export default ShopProductCell;
