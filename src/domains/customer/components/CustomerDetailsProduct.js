import React from 'react';
import {getLogoFromProductName} from '../../product/services/behaviors';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import useProductTooltip from '../../product/useProductTooltip';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function CustomerDetailsProduct({product, color = 'black'}) {
  const {tooltip, activator} = useProductTooltip(product);

  return (
    <Container>
      <FontAwesomeIcon key={product.name}
                       icon={getLogoFromProductName(product.name)}
                       color={color}
                       {...activator}
                       size="3x"/>
      {tooltip}
    </Container>
  );
}
