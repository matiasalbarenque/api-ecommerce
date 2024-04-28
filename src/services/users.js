import { ENV } from '@constants';

const entity = 'users';

export const getUsers = async () => {
  try {
    const response = await fetch(`${ENV.API_URL}/${entity}`);
    const data = await response.json();
    return data;
  } catch {
    return [];
  }
};
