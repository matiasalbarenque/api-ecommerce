import { ENV } from '@constants';
import { getAuthorization } from './helpers';

const entity = 'purchase';

export const purchase = async (body) => {
  const response = await fetch(`${ENV.API_URL}/${entity}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization(),
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Error on purchase');
  }
};

export const getPurchaseHistory = async (userId) => {
  const response = await fetch(`${ENV.API_URL}/${entity}/history/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization(),
    },
  });
  if (!response.ok) {
    throw new Error('Error fetching purchase history');
  }
  return response.json();
};