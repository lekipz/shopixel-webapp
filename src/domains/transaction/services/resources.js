import HttpClient from '../../../lib/HttpClient';

const TransactionsAPI = new HttpClient(`${process.env.REACT_APP_API_ENDPOINT}/transactions`);

export function postTransaction(transaction) {
  return TransactionsAPI.post('', transaction);
}
