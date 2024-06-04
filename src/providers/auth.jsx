import { createContext, useEffect, useState } from 'react';

const defaultValues = {
  avatarUrl: null,
  email: null,
  firstName: null,
  id: null,
  isLogged: false,
  lastName: null,
  role: null,
};

export const AuthContext = createContext({
  user: defaultValues,
  setUser: () => null,
  resetUser: () => null,
});

const AuthProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState(defaultValues);

  useEffect(() => {
    // Carga al inicio el contexto con toda la info del
    // localStorage para recuperar la info del usuario logueado
    const userData = localStorage.getItem('user');
    setUser(JSON.parse(userData) || defaultValues);
  }, []);

  const resetUser = () => {
    localStorage.removeItem('user');
    setUser(defaultValues);
  };

  return <AuthContext.Provider value={{ user, setUser, resetUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
