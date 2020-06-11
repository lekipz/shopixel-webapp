import styled from 'styled-components';

const CardContainer = styled.div`
  width: 240px;
  padding: 32px;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
   
  border: solid 1px ${props => props.outlineColor || 'black'};
  background-color: ${props => props.backgroundColor || 'white'};
  
  margin-top: 82px !important;
  margin-left: 19px !important;
  text-align: center;
`;

export default CardContainer;
