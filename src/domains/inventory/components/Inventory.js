import styled from 'styled-components';
import {getStylesFromProductCategory, getLogoFromProductName} from '../../product/services/behaviors'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InventoryContainer = styled.div`
display: flex;
flex-flow: column nowrap;
align-items: center; 
border: solid 1px ${props => props.outlineColor};
background-color: ${props => props.backgroundColor};
margin-top: 8.7vh !important;
margin-left: 2vh !important;
padding: 4vh;
text-align: center;
`
const Stock = styled.div`
display: flex
flex-flow: column nowrap;
font-size: 1.3em;
font-weight: bold;
margin: 5vh;
`
function Inventory ({selectedProduct}) {
    const {displayName, currentStock, maxStock, category, name} = selectedProduct;
    const productConfig = getStylesFromProductCategory(category);
    const logo = getLogoFromProductName(name);
    return(
        <InventoryContainer {...productConfig}>
            <FontAwesomeIcon icon={logo} size="4x"></FontAwesomeIcon>
            <h2>{displayName}</h2>
            <Stock>
                <p>Stock courrant: {currentStock}</p>
                <p>Stock maximum: {maxStock}</p>
            </Stock>
        </InventoryContainer>
    )
} 

export default Inventory