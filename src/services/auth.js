import { ENV } from '@constants';

export const login = async (body) => {
  const response = await fetch(`${ENV.API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data);
};

export const signup = async (body) => {
  const response = await fetch(`${ENV.API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Error on signup');
  }
};
