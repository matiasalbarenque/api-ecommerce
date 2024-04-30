import { createContext, useEffect, useState } from 'react';

const defaultValues = [];

export const CartContext = createContext({
  cart: defaultValues,
  setCart: () => null,
});

const CartProvider = (props) => {
  const { children } = props;
  const [cart, setCart] = useState(defaultValues);

  useEffect(() => {
    // Carga al inicio el contexto con toda la info del
    // localStorage para recuperar los productos del carrito
    const cartData = localStorage.getItem('cart');
    setCart(JSON.parse(cartData) || []);
  }, []);

  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};

export default CartProvider;
