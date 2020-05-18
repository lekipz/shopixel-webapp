import HttpClient from '../../../lib/HttpClient';

const http = new HttpClient(process.env.REACT_APP_API_ENDPOINT);

export function register(customer) {
  return http.post('/register', customer);
}

export function login(email, password) {
  return http.post('/login', {
    email,
    password
  });
}
