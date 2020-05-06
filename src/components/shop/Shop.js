import React from 'react';
import ShopRow from './ShopRow';
import styled from 'styled-components';

const ShopContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  border: solid 1px black;
`;

function Shop({rowsConfig}) {
  return (
    <ShopContainer>
      {rowsConfig.map((rowConfig, index) => (
        <ShopRow cellsConfig={rowConfig}
                 key={index}/>
      ))}
    </ShopContainer>
  );
}

export default Shop;
