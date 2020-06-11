import React from 'react';
import CardContainer from '../../../components/CardContainer';

export default function CustomerDetails({customer}) {
  return (
    <CardContainer>
      <h2>{customer.customer.firstName} {customer.customer.lastName}</h2>
    </CardContainer>
  );
}
