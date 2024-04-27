import { ENV } from '@constants';

export const getUserTypes = async () => {
  try {
    const response = await fetch(`${ENV.API_URL}/user_types`);
    const data = await response.json();
    return data;
  } catch {
    return [];
  }
};
