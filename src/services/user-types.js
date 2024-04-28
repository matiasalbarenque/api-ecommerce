import { ENV } from '@constants';

const entity = 'user_types';

export const getUserTypes = async () => {
  try {
    const response = await fetch(`${ENV.API_URL}/${entity}`);
    const data = await response.json();
    return data;
  } catch {
    return [];
  }
};
