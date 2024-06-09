import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { APP } from '@constants';

const entity = 'auth';

// Carga al inicio el contexto con toda la info del
// localStorage para recuperar la info del usuario logueado
const userData = localStorage.getItem('user');

const defaultData = {
  avatarUrl: null,
  email: null,
  firstName: null,
  id: null,
  isLogged: false,
  lastName: null,
  role: null,
};

const initialState = {
  data: JSON.parse(userData) || defaultData,
};

const slice = createSlice({
  name: entity,
  initialState,
  reducers: {
    setUserData(state, action) {
      state.data = action.payload;
    },
    resetUserData(state, action) {
      state.data = defaultData;
      Cookies.remove(APP.ACCESS_TOKEN_NAME);
      localStorage.removeItem('user');
    },
  },
});

export const { setUserData, resetUserData } = slice.actions;
export default slice;
