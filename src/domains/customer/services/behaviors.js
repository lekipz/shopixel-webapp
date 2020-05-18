import {getGeneratedAccount, getRandomRegisteredUser} from './resources';
import {login, register} from '../../auth/services/resources';

const NEW_CUSTOMER_PROBABILITY = 0.05;

export async function makeCustomerArrival(presentAccounts) {
  const rng = Math.random();
  if (rng <= NEW_CUSTOMER_PROBABILITY) {
    return registerNewCustomer();
  } else {
    const customer = await loginRandomAccount();
    const existingCustomer = presentAccounts.find(account => account.email === customer.email);

    if (existingCustomer) {
      return makeCustomerArrival(presentAccounts);
    }

    return customer;
  }
}

async function registerNewCustomer() {
  const randomAccount = await getGeneratedAccount();
  const {results: [{name: {first, last}, email}]} = randomAccount;
  const password = `${first}${last}`;

  const account = await register({
    firstName: first,
    lastName: last,
    email,
    password
  });

  const {token} = await login(email, password);
  return {
    ...account,
    token
  };
}

async function loginRandomAccount() {
  const randomAccount = await getRandomRegisteredUser();
  if (!randomAccount) {
    return registerNewCustomer();
  }

  const {email, firstName, lastName} = randomAccount;
  const password = `${firstName}${lastName}`;

  const {token} = await login(email, password);
  return {
    ...randomAccount,
    token
  };
}
