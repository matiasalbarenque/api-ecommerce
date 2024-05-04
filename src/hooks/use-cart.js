import { useContext } from 'react';
import { CartContext } from '@providers/cart';

export const useCart = () => {
  const { cart, setCart } = useContext(CartContext);

  const setCartData = (cartData) => {
    setCart(cartData);
    localStorage.setItem('cart', JSON.stringify(cartData));
  };

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

    setCartData(cartData);
  };

  const removeItemFromCart = (id) => {
    const cartData = cart.filter((a) => a.id !== id);
    setCartData(cartData);
  };

  const setCartItemQuantity = (id, quantity) => {
    const cardData = cart.map((a) => a); // Crea una copia de cart. Si no uso map crea una referencia y no funciona
    const itemIndexInCart = cart.findIndex((a) => a.id === id);
    cardData[itemIndexInCart].quantity = quantity;
    setCartData(cardData);
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
    setCartItemQuantity,
  };
};
