import { ENV } from '@constants';

const entity = 'categories';

export const getCategories = async () => {
  try {
    const response = await fetch(`${ENV.API_URL}/${entity}`);
    const data = await response.json();
    return data;
  } catch {
    return [];
  }
};
