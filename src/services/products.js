import { ENV } from '@constants';

export const getProducts = async () => {
  try {
    const response = await fetch(`${ENV.API_URL}/products`);
    const data = await response.json();
    return data;
  } catch {
    return [];
  }
};

export const getProduct = async (id) => {
  try {
    const response = await fetch(`${ENV.API_URL}/products/${id}`);
    const data = await response.json();
    return data;
  } catch {
    return null;
  }
};

export const postProduct = async (body) => {
  try {
    await fetch(`${ENV.API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch {
    return null;
  }
};

export const putProduct = async (id, body) => {
  try {
    await fetch(`${ENV.API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch {
    return null;
  }
};

export const deleteProduct = async (id) => {
  try {
    await fetch(`${ENV.API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch {
    return null;
  }
};
