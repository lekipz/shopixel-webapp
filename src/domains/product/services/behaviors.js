const stylesByProductCategory = {
  'daily-groceries': {
    backgroundColor: 'rgba(80, 251, 89, 0.5)',
    outlineColor: 'rgb(80, 251, 89)'
  },
  toys: {
    backgroundColor: 'rgba(249, 80, 251, 0.5)',
    outlineColor: 'rgb(249, 80, 251)'
  },
  media: {
    backgroundColor: 'rgba(80, 234, 251, 0.5)',
    outlineColor: 'rgb(80, 234, 251)'
  }
};

const defaultColor = {
  backgroundColor: 'lightgrey',
  outlineColor: 'black'
};

export function getStylesFromProductCategory(category) {
  const styles = stylesByProductCategory[category];
  if (!styles) {
    return defaultColor
  }
  return styles;
}
