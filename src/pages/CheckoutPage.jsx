import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Divider, Space, Spin, Tooltip } from 'antd';
import {
  CloseCircleOutlined,
  LoginOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useAuth } from '@hooks/use-auth';
import { useCart } from '@hooks/use-cart';
import { priceFormatting, priceWhitDiscount } from '@assets/scripts';
import { getCartProducts } from '@services/products';
import { purchase } from '@services/admin/purchase';

const CartItemQuantity = (props) => {
  const { children, cartItem, setCartItemQuantity } = props;

  const isMinQuantity = cartItem.quantity === 1;
  const isMaxQuantity = cartItem.quantity === Number(cartItem.stock);

  const handleDecreaseQuantity = () => {
    if (!isMinQuantity) {
      setCartItemQuantity(cartItem.id, cartItem.quantity - 1);
    }
  };
  const handleIncreaseQuantity = () => {
    if (!isMaxQuantity) {
      setCartItemQuantity(cartItem.id, cartItem.quantity + 1);
    }
  };

  return (
    <Space.Compact className="ml-1 inline-flex items-center">
      <Button icon={<MinusOutlined />} size="small" onClick={handleDecreaseQuantity} disabled={isMinQuantity} />
      {children}
      <Button icon={<PlusOutlined />} size="small" onClick={handleIncreaseQuantity} disabled={isMaxQuantity} />
    </Space.Compact>
  );
};

const CartItemPrice = (props) => {
  const {
    cartItem: { price, discount },
  } = props;
  return (
    <>
      <span className="mr-2 font-medium">${priceWhitDiscount(price, discount)}</span>
      {discount > 0 && (
        <span>
          <span className="px-1 mr-2 text-green-500 text-sm bg-green-50 border border-green-200 rounded whitespace-nowrap">
            {discount}% OFF
          </span>
          <span className="line-through text-sm text-gray-400">${priceFormatting(price)}</span>
        </span>
      )}
    </>
  );
};

const CartItemStock = (props) => {
  const { cartItem } = props;
  if (cartItem.quantityExceedStock) {
    return (
      <Tooltip
        color="blue"
        placement="bottom"
        title="Se restableció la cantidad al stock actual del producto debido a que la cantidad seleccionada superaba el stock disponible."
      >
        <span className="w-8 bg-amber-50 text-sm font-semibold text-center leading-6">{cartItem.stock}</span>
      </Tooltip>
    );
  }
  return <span className="w-8 bg-gray-50 text-sm font-semibold text-center leading-6">{cartItem.quantity}</span>;
};

const CartItem = (props) => {
  const { cartItem, removeItemFromCart, setCartItemQuantity } = props;
  return (
    <div className="p-3 flex gap-3 rounded-md hover:bg-amber-50 hover:outline outline-1 hover:outline-amber-200 box-content">
      <div className="w-[64px] h-[64px] shrink-0">
        <div className="w-full h-full rounded-full overflow-hidden border border-gray-300">
          <Link to={`/product/${cartItem.id}`}>
            <img src={cartItem.image_url} alt={cartItem.title} />
          </Link>
        </div>
      </div>
      <div className="w-full flex items-center gap-2">
        <div className="w-full flex flex-col gap-1">
          <div>
            <span className="font-semibold text-lg leading-5">{cartItem.title}</span>
          </div>
          <div>
            <span>Precio unitario: </span>
            <CartItemPrice cartItem={cartItem} />
          </div>
          <div>
            <span>
              Cantidad:{' '}
              {cartItem.stock === 0 ? (
                <span className="ml-1 px-1 rounded bg-red-50 border border-red-200 text-sm font-semibold">
                  Sin stock
                </span>
              ) : (
                <CartItemQuantity cartItem={cartItem} setCartItemQuantity={setCartItemQuantity}>
                  <CartItemStock cartItem={cartItem} />
                </CartItemQuantity>
              )}
            </span>
          </div>
        </div>
        <div className="w-[40px] shrink-0">
          <Button
            shape="circle"
            type="text"
            onClick={() => removeItemFromCart(cartItem.id)}
            icon={<CloseCircleOutlined />}
            size="large"
            danger
          />
        </div>
      </div>
    </div>
  );
};

const CartList = (props) => {
  const { cartProducts, removeItemFromCart, setCartItemQuantity } = props;

  return (
    <div className="flex flex-col gap-3">
      {cartProducts.map((item, index) => (
        <div key={`cart${item.id}`}>
          <CartItem cartItem={item} removeItemFromCart={removeItemFromCart} setCartItemQuantity={setCartItemQuantity} />
          {index < cartProducts.length - 1 && <Divider className="!mb-0 !mt-2" />}
        </div>
      ))}
    </div>
  );
};

const SidebarContent = (props) => {
  const { extendedWarranty, subtotal, shipping, tax, handleBuy, isLoading } = props;
  const navigate = useNavigate();
  const { user } = useAuth();

  const redirectToLogin = () => {
    navigate('/login?redirectTo=checkout');
  };

  // const total = extendedWarranty + subtotal + shipping + tax;
  const total = subtotal;

  return (
    <>
      <div className="w-full min-w-[350px] p-6 flex flex-col gap-8 bg-white border rounded-md">
        <div className="relative h-8 flex justify-center">
          <img src="/img/checkout-aside.png" alt="checkout" width="140" className="absolute -top-20" />
        </div>

        <h2 className="font-semibold text-lg text-center tracking-wide uppercase">Resumen de la orden</h2>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[2fr,1fr]">
            <div className="font-medium">Garantía extendida</div>
            <div className="font-medium text-right">${priceFormatting(extendedWarranty)}</div>
          </div>
        </div>

        <Divider className="!my-0" />

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-[2fr,1fr]">
              <div className="font-medium">Subtotal</div>
              <div className="font-medium text-right">${priceFormatting(subtotal)}</div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-[2fr,1fr]">
              <div className="font-medium">Envío</div>
              <div className="font-medium text-right">${priceFormatting(shipping)}</div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-[2fr,1fr]">
              <div className="font-medium">Impuestos</div>
              <div className="font-medium text-right">${priceFormatting(tax)}</div>
            </div>
          </div>
        </div>

        <Divider className="!my-0" />

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-[2fr,1fr]">
              <div className="font-semibold text-xl tracking-wide">Total</div>
              <div className="font-semibold text-xl text-right tracking-wide">${priceFormatting(total)}</div>
            </div>
          </div>
        </div>
      </div>

      {!user.isLogged ? (
        <Button
          type="primary"
          shape="default"
          size="large"
          icon={<LoginOutlined />}
          className="w-full !h-[54px]"
          onClick={redirectToLogin}
          disabled={isLoading}
        >
          <span className="font-medium tracking-wide text-center uppercase">Logueate para comprar</span>
        </Button>
      ) : (
        <Button
          type="primary"
          shape="default"
          size="large"
          icon={<ShoppingCartOutlined />}
          className="w-full !h-[54px]"
          onClick={handleBuy}
          disabled={isLoading}
        >
          <span className="font-medium tracking-wide text-center uppercase">Completar compra</span>
        </Button>
      )}
    </>
  );
};

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, removeItemFromCart, emptyCart, setCartItemQuantity } = useCart();
  const [productsInCart, setProductsInCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cart.length > 0) {
      getProductData();
    }
  }, []);

  useEffect(() => {
    // Si se vacía el carrito se redirige a la home
    if (cart.length === 0) {
      navigate('/');
    }
  }, [cart.length]);

  const getProductData = async () => {
    setIsLoading(true);
    try {
      const productIds = cart.map((a) => a.id).join(',');
      const products = await getCartProducts(productIds);
      setProductsInCart(products);
    } catch {
      // TODO: Tratar error
    } finally {
      setIsLoading(false);
    }
  };

  // Una vez que tiene los datos de los producto traídos desde el BE (Ej: Stock)
  // Arma un listado de productos con más info para usarlos en la vista
  let cartProducts = [];
  if (productsInCart.length > 0) {
    cartProducts = cart.map((a) => {
      const currentProduct = productsInCart.find((b) => b.id === a.id);
      return {
        ...a,
        stock: currentProduct?.stock,
        quantityExceedStock: a.quantity > currentProduct?.stock,
        userSellerId: currentProduct?.userSellerId,
      };
    });
  }

  const productsWithStock = cartProducts.length > 0 ? cartProducts.filter((a) => a.stock > 0) : [];
  const priceList =
    productsWithStock.map((a) => {
      const finalPrice = priceWhitDiscount(a.price, a.discount, false);
      const availableStock = a.quantityExceedStock ? a.stock : a.quantity;
      return finalPrice * availableStock;
    }) || [];
  const subtotal = priceList.length > 0 ? priceList.reduce((a, b) => a + b) : 0;

  const handleBuy = async () => {
    try {
      const purchaseDate = cartProducts.map((a) => ({ id: a.id, quantity: a.quantity }));
      await purchase(purchaseDate);
      navigate('/checkout-success')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div>
        <h1 className="font-medium text-2xl tracking-wide">Checkout 🛒</h1>
      </div>
      <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-[5fr,2fr]">
        <div className="product-detail w-full h-fit min-h-[470px] p-6 flex flex-col bg-white border rounded-md font-open-sans">
          {isLoading ? (
            <div className="w-full min-h-[470px] flex justify-center items-center">
              <Spin size="large" />
            </div>
          ) : (
            <CartList
              cartProducts={cartProducts}
              removeItemFromCart={removeItemFromCart}
              setCartItemQuantity={setCartItemQuantity}
            />
          )}
        </div>
        <div className="w-full flex flex-col gap-4">
          <SidebarContent
            extendedWarranty={2500}
            handleBuy={handleBuy}
            shipping={1234}
            subtotal={subtotal}
            tax={2345}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
