import React from 'react';
import {
  faUtensils, 
  faChessKnight, 
  faTv, 
  faPhone, 
  faHeadphones,
  faLaptop,
  faChild,
  faLemon,
  faGamepad,
  faCarrot,
  faPrint,
  faDrumstickBite,
  faPhotoVideo,
  faBaby,
  faCookieBite,
  faBabyCarriage,
  faFish,
  faFaucet,
  faSnowflake,
  faBroom,
  faBeer,
  faWineBottle,
  faGlassMartiniAlt,
  faBed,
  faSquare,
  faScrewdriver,
  faPaintRoller,
  faToolbox,
  faQuestionCircle,
  faMenorah
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const stylesByProductCategory = {
  'daily-groceries': {
    backgroundColor: 'rgba(80, 251, 89, 0.5)',
    outlineColor: 'rgb(80, 251, 89)',

  },
  'home-appliance': {
    backgroundColor: 'rgba(255, 153, 0, 0.5)',
    outlineColor: 'rgb(255, 153, 0)'
  },
  'deco-bed': {
    backgroundColor: 'rgba(255, 102, 0, 0.5)',
    outlineColor: 'rgb(255, 102, 0)'
  },
  toys: {
    backgroundColor: 'rgba(234, 82, 127, 0.5)',
    outlineColor: 'rgb(234, 82, 127)',
  },
  media: {
    backgroundColor: 'rgba(80, 234, 251, 0.5)',
    outlineColor: 'rgb(80, 234, 251)',
  },
  baby: {
    backgroundColor: 'rgba(239, 195, 244, 0.5)',
    outlineColor: 'rgb(239, 195, 244)'
  },
  alcohol: {
    backgroundColor: 'rgba(178, 0, 255, 0.5)',
    outlineColor: 'rgb(178, 0, 255)'
  },
  diy: {
    backgroundColor: 'rgba(255, 251, 158, 0.5)',
    outlineColor: 'rgb(255, 251, 158)'
  }
};
const logoByProductName = {
  'awakening-toy': faChild,
  'board-game': faChessKnight,
  'video-game': faGamepad,
  'baby-food': faCookieBite,
  'baby-furniture': faBabyCarriage,
  'washing-machine': faFaucet,
  'table-decoration': faMenorah,
  phone: faPhone,
  audio: faHeadphones,
  computer: faLaptop,
  fruits: faLemon,
  vegetables: faCarrot,
  meat: faDrumstickBite,
  tv: faTv,
  printer: faPrint,
  wiring: faPhotoVideo,
  diaper: faBaby,
  pasta: faUtensils,
  rice: faUtensils,
  fish: faFish,
  fridge: faSnowflake,
  vacuum: faBroom,
  beer: faBeer,
  wine: faWineBottle,
  spirituous: faGlassMartiniAlt,
  sheet: faBed,
  cushion: faSquare,
  paint: faPaintRoller,
  screw: faScrewdriver,
  tools: faToolbox
}

const defaultColor = {
  backgroundColor: 'lightgrey',
  outlineColor: 'black'
};
const defaultlogo = <FontAwesomeIcon icon={faQuestionCircle} size="3x"></FontAwesomeIcon>



export function getLogoFromProductName(name) {
  const logo = logoByProductName[name];
  return logo ? logo : defaultlogo
}
export function getStylesFromProductCategory(category) {
  const styles = stylesByProductCategory[category];
  if (!styles) {
    return defaultColor
  }
  return styles;
}
