import HttpClient from '../../../lib/HttpClient';

const ShopixelAPI = new HttpClient(`${process.env.REACT_APP_API_ENDPOINT}/products`);

export function getAllProducts() {
  return ShopixelAPI.get();
}

export function purchaseProduct(productName) {
  return ShopixelAPI.put(`/${productName}/purchase`);
}

export function refillProduct(productName) {
  return ShopixelAPI.put(`/${productName}/refill`);
}

export function getShoppingList(profile) {
  return ShopixelAPI.get(`/shopping-list?profile=${profile}`);
}
