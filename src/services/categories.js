import { ENV } from '@constants';

const entity = 'categories';

export const getCategories = async () => {
  const response = await fetch(`${ENV.API_URL}/${entity}`);
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data);
};
