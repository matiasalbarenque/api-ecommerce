import { ENV } from '@constants';

export const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${ENV.API_URL}/users?email=${email}&password=${password}`);
    const data = await response.json();
    return data;
  } catch {
    return null;
  }
};

export const signup = async (body) => {
  try {
    await fetch(`${ENV.API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch {
    return null;
  }
};