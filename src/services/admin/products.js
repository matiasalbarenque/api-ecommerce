import { ENV } from '@constants';
import { getAuthorization } from './helpers';

const entity = 'admin/products';

export const getProducts = async () => {
  try {
    const response = await fetch(`${ENV.API_URL}/${entity}`, {
      headers: {
        Authorization: getAuthorization(),
      },
    });
    const data = await response.json();
    return data;
  } catch {
    return null;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await fetch(`${ENV.API_URL}/${entity}/${id}`, {
      headers: {
        Authorization: getAuthorization(),
      },
    });
    const data = await response.json();
    return data;
  } catch {
    return null;
  }
};

export const postProduct = async (body) => {
  try {
    await fetch(`${ENV.API_URL}/${entity}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthorization(),
      },
      body: JSON.stringify(body),
    });
  } catch {
    return null;
  }
};

export const putProduct = async (id, body) => {
  try {
    await fetch(`${ENV.API_URL}/${entity}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthorization(),
      },
      body: JSON.stringify(body),
    });
  } catch {
    return null;
  }
};

export const deleteProduct = async (id) => {
  try {
    await fetch(`${ENV.API_URL}/${entity}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthorization(),
      },
    });
  } catch {
    return null;
  }
};
