import React from 'react';
import ShopRow from './ShopRow';
import styled from 'styled-components';
import Customer from '../Customer';

const ShopContainer = styled.div`
  width: ${props => props.cols * 8}vh;
  position: relative;
`;

const BackgroundContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  border: solid 1px black;
`;

function Shop({rowsConfig, customers, selectProduct}) {
  return (
    <ShopContainer cols={rowsConfig[0].length}>
      {customers.map(({customer: {_id}, travelling: {row, col}}) => (
        <Customer key={_id}
                  row={row}
                  col={col}/>
      ))}
      <BackgroundContainer>
        {rowsConfig.map((rowConfig, index) => (
          <ShopRow cellsConfig={rowConfig}
                   key={index}
                   selectProduct={selectProduct}/>
        ))}
      </BackgroundContainer>
    </ShopContainer>
  );
}

export default Shop;
