import styled from 'styled-components';
import React from 'react'

const TooltipContainer = styled.div`
  position: absolute;
  top: -6vh;
  z-index: 1;

  background-color: ${props => props.outlineColor};
  color: #000;
  white-space: nowrap;
  box-shadow: 0 5px 15px ${props => props.backgroundColor}, 0 15px 35px ${props => props.backgroundColor};
  border-radius: 50px;

  padding: .55rem 1rem;

  pointer-events: none;
  user-select: none;
`;

function ProductTooltip({productConfig}) {
    const {color, name} = productConfig;
    return(
        <TooltipContainer {...color}>
            {name}
        </TooltipContainer>
    )
}

export default ProductTooltip;
