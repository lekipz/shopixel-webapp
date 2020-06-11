import {useState} from 'react';
import {getProductInventory} from './services/resources';

export default function useProductDetails() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoadingInventory, setIsLoadingInventory] = useState(false);

  const selectProduct = async (productName) => {
    if (isLoadingInventory) {
      return;
    }
    setIsLoadingInventory(true);
    const inventory = await getProductInventory(productName);
    setSelectedProduct(inventory);
    setIsLoadingInventory(false);
  };

  const clear = () => setSelectedProduct(null);

  return {
    selectedProduct,
    selectProduct,
    clear
  };
}
