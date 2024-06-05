import { ENV } from '@constants';
import { getAuthorization } from './helpers';

const entity = 'admin/products';

export const getProducts = async () => {
  const response = await fetch(`${ENV.API_URL}/${entity}`, {
    headers: {
      Authorization: getAuthorization(),
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data);
};

export const postProduct = async (body) => {
  const response = await fetch(`${ENV.API_URL}/${entity}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization(),
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data);
};

export const putProduct = async (body) => {
  const response = await fetch(`${ENV.API_URL}/${entity}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization(),
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data);
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${ENV.API_URL}/${entity}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization(),
    },
  });
  if (!response.ok) {
    throw new Error('Error on delete');
  }
};
