import HttpClient from '../../../lib/HttpClient';

const http = new HttpClient(`${process.env.REACT_APP_API_ENDPOINT}/products`);

export function getProductByName(name) {
  return http.get(`/${name}`);
}
