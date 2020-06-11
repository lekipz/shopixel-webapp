import React from 'react';
import styled from 'styled-components';
import CardContainer from '../../../components/CardContainer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {getLogoFromProductName} from '../../product/services/behaviors';

const ProductList = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  
  & > * {
    margin: 12px;
  }
`;

function getColorByProduct(product) {
  switch (product.status) {
    case 'todo':
      return 'black';
    case 'pending':
      return 'orange';
    case 'purchased':
      return 'green';
    case 'out-of-stock':
      return 'red';
  }
}

export default function CustomerDetails({customer}) {
  const hasRecommendations = customer.recommendedProducts.length > 0;

  return (
    <CardContainer>
      <h2>{customer.customer.firstName} {customer.customer.lastName}</h2>
      <h3>Liste de courses :</h3>
      <ProductList>
        {customer.shoppingList.map(product => (
          <FontAwesomeIcon key={product.name}
                           icon={getLogoFromProductName(product.name)}
                           color={getColorByProduct(product)}
                           size="3x"/>
        ))}
      </ProductList>
      <h3>Recommandations :</h3>
      {hasRecommendations ? (
        <ProductList>
          {customer.recommendedProducts.map(product => (
            <FontAwesomeIcon key={product.name}
                             icon={getLogoFromProductName(product.name)}
                             size="3x"/>
          ))}
        </ProductList>
      ) : (
        <span>Aucun produit recommandé pour ce client.</span>
      )}
    </CardContainer>
  );
}
