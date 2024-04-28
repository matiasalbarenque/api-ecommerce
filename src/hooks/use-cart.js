import { useContext } from 'react';
import { CartContext } from '@providers/cart';

export const useCart = () => {
  const { cart, setCart, emptyCart } = useContext(CartContext);

  const addToCart = (product, quantity) => {
    const { stock, userSellerId, ...rest } = product;
    const cartData = [
      ...cart,
      {
        ...rest,
        quantity,
      },
    ];
    setCart(cartData);
    localStorage.setItem('cart', JSON.stringify(cartData));
  };

  const removeItemFromCart = (id) => {
    const newCartData = cart.filter(a => a.id !== id)
    setCart(newCartData);
    localStorage.setItem('cart', JSON.stringify(newCartData));
  }

  return {
    addToCart,
    cart,
    removeItemFromCart,
    emptyCart,
    setCart,
  };
};
