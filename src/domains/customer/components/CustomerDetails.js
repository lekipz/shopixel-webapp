import React from 'react';
import styled from 'styled-components';
import CardContainer from '../../../components/CardContainer';
import CustomerDetailsProduct from './CustomerDetailsProduct';

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
    case 'pending':
      return 'orange';
    case 'purchased':
      return 'green';
    case 'out-of-stock':
      return 'red';
    default:
      return 'black';
  }
}

export default function CustomerDetails({customer}) {
  const hasRecommendations = customer.recommendedProducts.length > 0;
  const hasManyRecommendations = customer.recommendedProducts.length > 1;

  return (
    <CardContainer>
      <h2>{customer.customer.firstName} {customer.customer.lastName}</h2>
      <h3>Liste de courses :</h3>
      <ProductList>
        {customer.shoppingList.map(product => (
          <CustomerDetailsProduct product={product}
                                  color={getColorByProduct(product)}/>
        ))}
      </ProductList>
      <h3>Recommandation{hasManyRecommendations && 's'} :</h3>
      {hasRecommendations ? (
        <ProductList>
          {customer.recommendedProducts.map(product => (
            <CustomerDetailsProduct product={product}/>
          ))}
        </ProductList>
      ) : (
        <span>Aucun produit recommandé pour ce client.</span>
      )}
    </CardContainer>
  );
}
