const stylesByProductCategory = {
  vegetable: {
    backgroundColor: 'rgba(80, 251, 89, 0.5)',
    outlineColor: 'rgb(80, 251, 89)'
  },
  toy: {
    backgroundColor: 'rgba(249, 80, 251, 0.5)',
    outlineColor: 'rgb(249, 80, 251)'
  },
  electronic: {
    backgroundColor: 'rgba(80, 234, 251, 0.5)',
    outlineColor: 'rgb(80, 234, 251)'
  }
};

export function getStylesFromProductCategory(category) {
  const styles = stylesByProductCategory[category];
  if (!styles) {
    throw new Error(`Unknown category ${category}`);
  }
  return styles;
}
