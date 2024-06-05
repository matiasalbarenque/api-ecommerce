import Cookies from 'js-cookie';
import { APP } from '@constants';

export const getAuthorization = (accessToken) => {
  const at = accessToken || Cookies.get(APP.ACCESS_TOKEN_NAME);
  if (!at) {
    // No existe token => cierra la sesión
    localStorage.removeItem('user');
    window.location.href = '/login';
    return;
  }
  return `Bearer ${at}`;
};
