import { useContext } from 'react';
import { CartContext } from '@providers/cart';

export const useCart = () => {
  const { cart, setCart } = useContext(CartContext);

  const addToCart = (product, quantity) => {
    const { description, stock, userSellerId, ...rest } = product;

    let cartData = null;
    const isProductInCart = cart.find((a) => a.id === product.id);
    if (isProductInCart) {
      // Si el producto ya existe en el carrito incrementa su cantidad
      const cartFiltered = cart.filter((a) => a.id !== product.id);
      cartData = [
        ...cartFiltered,
        {
          ...rest,
          quantity: isProductInCart.quantity + quantity,
        },
      ];
    } else {
      cartData = [
        ...cart,
        {
          ...rest,
          quantity,
        },
      ];
    }

    setCart(cartData);
    localStorage.setItem('cart', JSON.stringify(cartData));
  };

  const removeItemFromCart = (id) => {
    const newCartData = cart.filter((a) => a.id !== id);
    setCart(newCartData);
    localStorage.setItem('cart', JSON.stringify(newCartData));
  };

  const emptyCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return {
    addToCart,
    cart,
    removeItemFromCart,
    emptyCart,
    setCart,
  };
};
