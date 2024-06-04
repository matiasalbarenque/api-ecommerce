import { ENV } from '@constants';

const entity = 'products';

export const getProductsByCategoryId = async (categoryId) => {
  const response = await fetch(`${ENV.API_URL}/${entity}/categoryid/${categoryId}`);
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data);
};

export const getProduct = async (id) => {
  const response = await fetch(`${ENV.API_URL}/${entity}/${id}`);
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data);
};

export const getProductBySearch = async (searchText) => {
  const response = await fetch(`${ENV.API_URL}/${entity}/search?search=${searchText}`);
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data);
};

export const getCartProducts = async (productIds) => {
  const response = await fetch(`${ENV.API_URL}/${entity}/cart-products?productIds=${productIds}`);
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data);
};
