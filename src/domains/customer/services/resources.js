import HttpClient from '../../../lib/HttpClient';

const RandomAPI = new HttpClient('https://randomuser.me/api?nat=FR');
const ShopixelAPI = new HttpClient(`${process.env.REACT_APP_API_ENDPOINT}/users`)

export function getGeneratedAccount() {
  return RandomAPI.get();
}

export function getRandomRegisteredUser() {
  return ShopixelAPI.get('/random');
}
