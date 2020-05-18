import HttpClient from '../../../lib/HttpClient';

const http = new HttpClient(`${process.env.REACT_APP_API_ENDPOINT}/products`);

export function getAllProducts() {
  return http.get();
}

export function getProductByName(name) {
  return http.get(`/${name}`);
}

export function getShoppingList(profile) {
  return http.get(`/shopping-list?profile=${profile}`);
}
