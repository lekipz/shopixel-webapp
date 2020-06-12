import styled from 'styled-components';
import {getLogoFromProductName, getStylesFromProductCategory} from '../services/behaviors';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import CardContainer from '../../../components/CardContainer';

const Stock = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  font-size: 1.3em;
  font-weight: bold;
  padding: 5vh 5%;
`;

function ProductDetails({selectedProduct}) {
  const {displayName, currentStock, maxStock, category, name} = selectedProduct;
  const productConfig = getStylesFromProductCategory(category);
  const logo = getLogoFromProductName(name);
  return (
    <CardContainer {...productConfig}>
      <FontAwesomeIcon icon={logo} size="4x"/>
      <h2>{displayName}</h2>
      <Stock>
        <p>Stock : {currentStock}/{maxStock}</p>
      </Stock>
    </CardContainer>
  );
}

export default ProductDetails;
