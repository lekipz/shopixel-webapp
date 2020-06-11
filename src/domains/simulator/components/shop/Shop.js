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

function Shop({rowsConfig, customers, selectProduct, selectCustomer}) {
  return (
    <ShopContainer cols={rowsConfig[0].length}>
      {customers.map((customer) => (
        <Customer key={customer.customer._id}
                  onSelect={() => selectCustomer(customer)}
                  row={customer.travelling.row}
                  col={customer.travelling.col}/>
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
