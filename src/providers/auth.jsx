import { createContext, useState } from 'react';

const defaultValues = {
  email: null,
  firstName: null,
  id: null,
  isLogged: false,
  lastName: null,
  userType: null,
};

export const AuthContext = createContext({
  user: defaultValues,
  setUser: () => null,
  resetUser: () => null,
});

const AuthProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState(defaultValues);

  const resetUser = () => {
    setUser(defaultValues);
  }

  return <AuthContext.Provider value={{ user, setUser, resetUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
