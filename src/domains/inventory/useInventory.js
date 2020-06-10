import {useState} from 'react'
import {getProductInventory} from '../product/services/resources';

export default function useInventory(){
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isLoadingInventory, setIsLoadingInventory] = useState(false);
    const selectProduct = async (productName) => {
      if (isLoadingInventory){return} 
      setIsLoadingInventory(true);
      const inventory = await getProductInventory(productName);
      setSelectedProduct(inventory);
      setIsLoadingInventory(false);
    }
    return {selectedProduct, selectProduct};
}
