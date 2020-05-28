import styled from 'styled-components';
import React from 'react'

const TooltipContainer = styled.div`
position: absolute;
padding: .55rem 1rem;
color: #000;
z-index: 1;
border-radius: 50px;
background-color: ${props => props.outlineColor};
box-shadow: 0 5px 15px ${props => props.backgroundColor}, 0 15px 35px ${props => props.backgroundColor};
pointer-events: none;
user-select: none;
white-space: nowrap;
top: -6vh;
`

function Tooltip({productConfig}) {
    const {color, name} = productConfig;
    return(
        <TooltipContainer {...color}>
            {name}
        </TooltipContainer>
    )
}

export default Tooltip;
