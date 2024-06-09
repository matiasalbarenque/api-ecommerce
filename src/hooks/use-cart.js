import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '@redux/slices/CartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.data);

  const setCartData = (cartData) => {
    dispatch(setCart(cartData));
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
    const cartData = cart.map((a) => ({ ...a })); // Crea una copia de cart. Si no uso map crea una referencia y no funciona
    const itemIndexInCart = cart.findIndex((a) => a.id === id);
    cartData[itemIndexInCart].quantity = quantity;
    setCartData(cartData);
  };

  const emptyCart = () => {
    dispatch(setCart([]));
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
