import React from 'react';
import ShopCell from './ShopCell';
import styled from 'styled-components';

const ShopRowContainer = styled.div`
  display: flex;
  flex-flow: nowrap;
  height: 8vh;
  background-color: white;
`

function ShopRow({cellsConfig}) {
  return (
    <ShopRowContainer>
      {cellsConfig.map((cellConfig, index) => (
        <ShopCell config={cellConfig}
                  key={index}/>
      ))}
    </ShopRowContainer>
  );
}

export default ShopRow;
