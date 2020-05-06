import React from 'react';
import BasicCell from './BasicCell';
import styled from 'styled-components';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const DoorCellContainer = styled(BasicCell)`
  outline: solid 1px black;
`;

const doorDirectionIcons = {
  top: faArrowUp,
  bot: faArrowDown
}

function ShopDoorCell({door}) {
  const direction = doorDirectionIcons[door.arrowPosition];

  return (
    <DoorCellContainer>
      <FontAwesomeIcon icon={direction} size="4x"/>
    </DoorCellContainer>
  );
}

export default ShopDoorCell;
