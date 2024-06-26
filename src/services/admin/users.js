import { ENV } from '@constants';
import { getAuthorization } from './helpers';

const entity = 'admin/users';

export const getUserInfo = async (accessToken) => {
  const response = await fetch(`${ENV.API_URL}/${entity}/logged-user-info`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization(accessToken),
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data);
};
