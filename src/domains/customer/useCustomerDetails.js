import {useState} from 'react';
import {getRecommendations} from './services/resources';

export default function useCustomerDetails(customers) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  const selectCustomer = customer => {
    if (loadingRecommendations) {
      return;
    }

    setLoadingRecommendations(true);
    getRecommendations(customer.customer._id)
      .then(({products}) => products)
      .catch(error => {
        if (error.status === 404) {
          return [];
        }
        throw error;
      })
      .then(recommendedProducts => {
        setSelectedCustomer({
          ...customer,
          recommendedProducts
        });
        setLoadingRecommendations(false);
      });
  };

  const clear = () => setSelectedCustomer(null);

  return {
    selectedCustomer,
    selectCustomer,
    clear
  };
}
