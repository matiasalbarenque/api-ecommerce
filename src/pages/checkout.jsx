import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Divider, Tooltip } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useCart } from '@hooks/use-cart';
import { priceFormatting } from '@assets/scripts';
import { getProducts, putProduct } from '@services/products';

const CartItemStock = (props) => {
  const { cartItem } = props;
  if (cartItem.stock === 0) {
    return <span className="ml-1 px-1 rounded-lg bg-red-50 border border-red-200">Sin stock</span>;
  }
  if (cartItem.quantityExceedStock) {
    return (
      <Tooltip
        color="blue"
        placement="bottom"
        title="Se restableció la cantidad al stock actual del producto debido a que la cantidad seleccionada superaba el stock disponible."
      >
        <span className="ml-1 px-1 rounded-lg bg-amber-50 border border-amber-200 cursor-default">{cartItem.stock}</span>
      </Tooltip>
    );
  }
  return <span> {cartItem.quantity}</span>;
};

const CartItem = (props) => {
  const { cartItem, removeItemFromCart } = props;
  return (
    <div className="p-3 flex gap-3 rounded-md hover:bg-amber-50 hover:outline outline-1 hover:outline-amber-200 box-content">
      <div className="w-[64px] h-[64px] shrink-0">
        <div className="w-full h-full rounded-full overflow-hidden border border-gray-300">
          <Link to={`/product/${cartItem.id}`}>
            <img src={cartItem.imageUrl} alt={cartItem.title} />
          </Link>
        </div>
      </div>
      <div className="w-full flex items-center gap-2">
        <div className="w-full flex flex-col">
          <div>
            <span className="font-semibold text-lg leading-5">{cartItem.title}</span>
          </div>
          <div>
            <span>Precio unitario: </span>
            <span className="font-medium">${priceFormatting(cartItem.price)}</span>
          </div>
          <div>
            <span>Cantidad: {<CartItemStock cartItem={cartItem} />}</span>
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
  const { cartProducts, removeItemFromCart } = props;
  return (
    <div className="flex flex-col gap-3">
      {cartProducts.map((item, index) => (
        <div key={`cart${item.id}`}>
          <CartItem cartItem={item} removeItemFromCart={removeItemFromCart} />
          {index < cartProducts.length - 1 && <Divider className="!mb-0 !mt-2" />}
        </div>
      ))}
    </div>
  );
};

const SidebarContent = (props) => {
  const { extendedWarranty, subtotal, shipping, tax, handleBuy } = props;
  const total = extendedWarranty + subtotal + shipping + tax;
  return (
    <>
      <div className="w-full p-6 flex flex-col gap-8 bg-white border rounded-md">
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
      <Button type="primary" shape="default" size="large" className="w-full !h-[54px]" onClick={handleBuy}>
        <span className="font-medium tracking-wide text-center uppercase">Completar compra</span>
      </Button>
    </>
  );
};

export function Component() {
  const navigate = useNavigate();
  const { cart, removeItemFromCart, emptyCart } = useCart();
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cart.length > 0) {
      getProductData();
    } else {
      navigate('/');
    }
  }, []);

  const getProductData = async () => {
    const query = cart.map((a) => `&id=${a.id}`).join('');
    const products = await getProducts(`?${query.substring(1)}`);
    filterCartProducts(products);
  };

  const filterCartProducts = (prods) => {
    const productsFiltered = cart.map((a) => {
      const currentProduct = prods.find((b) => b.id === a.id);
      return {
        ...a,
        description: currentProduct?.description,
        stock: currentProduct?.stock,
        quantityExceedStock: a.quantity > currentProduct?.stock,
        userSellerId: currentProduct?.userSellerId,
      };
    });
    setCartProducts(productsFiltered);
  };

  const productsWithStock = cartProducts.length > 0 ? cartProducts.filter((a) => a.stock > 0) : [];
  const priceList = productsWithStock.map((a) => a.price * (a.quantityExceedStock ? a.stock : a.quantity)) || [];
  const subtotal = priceList.length > 0 ? priceList.reduce((a, b) => a + b) : 0;

  const handleBuy = async () => {
    try {
      // Promise.all rompe json-server pero usando un for
      // se puede ejecutar todas las peticiones PUT
      // de forma secuencial
      for (const item of cartProducts) {
        const { quantityExceedStock, quantity, ...rest } = item;
        const quantityToBuy = quantityExceedStock ? rest.stock : quantity;
        const body = {
          ...rest,
          stock: rest.stock - quantityToBuy,
        };
        await putProduct(rest.id, body);
      }
      emptyCart();
      navigate('/checkout-success');
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
          <CartList cartProducts={cartProducts} removeItemFromCart={removeItemFromCart} />
        </div>
        <div className="w-full flex flex-col gap-4">
          <SidebarContent
            extendedWarranty={2500}
            handleBuy={handleBuy}
            shipping={1234}
            subtotal={subtotal}
            tax={2345}
          />
        </div>
      </div>
    </div>
  );
}
