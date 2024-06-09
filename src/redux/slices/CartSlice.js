import { createSlice } from '@reduxjs/toolkit';

const entity = 'cart';

// Carga al inicio el contexto con toda la info del
// localStorage para recuperar los productos del carrito
const initialState = {
  data: JSON.parse(localStorage.getItem(entity)) || [],
};

const slice = createSlice({
  name: entity,
  initialState,
  reducers: {
    setCart(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setCart } = slice.actions;
export default slice;
