import styled from 'styled-components';
import React from 'react';

const CustomerIcon = styled.div`
  background-color: red;
  border-radius: 3vh;
  
  position: absolute;
  
  transition: top linear 490ms, left linear 490ms;
  
  top: calc(1vh + ${props => 8 * props.row}vh);
  left: calc(1vh + ${props => 8 * props.col}vh);
  width: 6vh;
  height: 6vh;
  
  z-index: 10;
`;

export default function Customer({row, col, onSelect}) {
  return (
    <CustomerIcon row={row}
                  col={col}
                  onClick={onSelect}/>
  );
};
