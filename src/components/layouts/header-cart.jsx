import { Link } from 'react-router-dom';
import { Badge, Button, Divider, Dropdown } from 'antd';
import { CloseCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '@hooks/use-cart';

const CartItem = (props) => {
  const { cartItem, removeFromCart } = props;
  return (
    <div className="p-3 flex gap-3 h-[48px] rounded-md hover:bg-amber-50 hover:outline outline-1 outline-amber-200 transition-colors box-content">
      <div className="w-[48px] shrink-0">
        <div className="w-full h-full rounded-full overflow-hidden border border-gray-300">
          <Link to={`/product/${cartItem.id}`}>
            <img src={cartItem.imageUrl} alt={cartItem.title} />
          </Link>
        </div>
      </div>
      <div className="w-full flex items-center gap-2">
        <div className="w-full flex flex-col">
          <div className="max-h-10 overflow-hidden leading-5">
            <span className="font-medium pointer-events-none">{cartItem.title}</span>
          </div>
          <div>
            <span className="pointer-events-none">Cantidad: {cartItem.quantity}</span>
          </div>
        </div>
        <div className="w-[40px] shrink-0">
          <Button
            shape="circle"
            type="text"
            onClick={() => removeFromCart(cartItem.id)}
            icon={<CloseCircleOutlined />}
            size="large"
            danger
          />
        </div>
      </div>
    </div>
  );
};

const CartList = () => {
  const { cart, removeItemFromCart } = useCart();
  if (cart.length > 0) {
    return (
      <div className="flex flex-col gap-4">
        <div className="w-[400px] max-h-[430px] p-[1px] flex flex-col gap-2 overflow-y-auto">
          {cart.map((cartItem, index) => (
            <div key={`cart${cartItem.id}`}>
              <CartItem cartItem={cartItem} removeFromCart={removeItemFromCart} />
              {index < cart.length - 1 && <Divider className="!mb-0 !mt-2" />}
            </div>
          ))}
        </div>
        <Button type="default" shape="default" icon={<ShoppingCartOutlined />} size="large" className="w-full">
          Ir al checkout
        </Button>
      </div>
    );
  }
  return (
    <div className="p-3 rounded-md bg-gray-50 border border-gray-200">
      <span>No hay productos en el carrito</span>
    </div>
  );
};

export const CartButton = () => {
  const { cart } = useCart();
  return (
    <div>
      <Dropdown
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
        trigger={['click']}
        dropdownRender={() => (
          <div className="p-3 flex flex-col gap-2 bg-white rounded-md shadow-lg">
            <CartList />
          </div>
        )}
      >
        <Badge count={cart.length} color="gold">
          <Button type="default" shape="circle" icon={<ShoppingCartOutlined />} size="large" />
        </Badge>
      </Dropdown>
    </div>
  );
};