import { ENV } from '@constants';

export const getCategories = async () => {
  try {
    const response = await fetch(`${ENV.API_URL}/categories`);
    const data = await response.json();
    return data;
  } catch {
    return [];
  }
};
