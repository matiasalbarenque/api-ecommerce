import Cookies from 'js-cookie';
import { APP } from '@constants';

export const getAuthorization = (accessToken) => {
  const at = accessToken || Cookies.get(APP.ACCESS_TOKEN_NAME);
  return `Bearer ${at}`;
};
