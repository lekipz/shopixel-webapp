import styled from 'styled-components';

const CardContainer = styled.div`
  min-width: 190px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center; 
  border: solid 1px ${props => props.outlineColor || 'black'};
  background-color: ${props => props.backgroundColor || 'white'};
  margin-top: 8.7vh !important;
  margin-left: 2vh !important;
  padding: 4vh;
  text-align: center;
`;

export default CardContainer;
