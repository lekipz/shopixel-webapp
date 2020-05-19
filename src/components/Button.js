import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const StyledButton = styled.button`
  outline: none;
  box-sizing: content-box;
  padding: 12px 24px;
  
  font-family: inherit;
  font-size: 1.2em;
  
  transition: all ease 250ms;
  background-color: #fff;
  border: solid 2px black;
  border-radius: 2px;
  
  color: black;
  text-transform: uppercase;
  text-decoration: none;
  
  &:hover {
    background-color: ${props => props.color};
    border-color: ${props => props.color};
    color: white;
    cursor: pointer;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  padding-right: 4px;
`;

function Button({
                  icon,
                  color = '#f6b93b',
                  children,
                  ...buttonProps
                }) {
  return (
    <StyledButton {...buttonProps} color={color}>
      {icon && (<Icon icon={icon}/>)}
      {children}
    </StyledButton>
  );
}

export default Button;
