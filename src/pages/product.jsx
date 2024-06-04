import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useCart } from '@hooks/use-cart'; // Custom hook
import { InputNumber } from '@atoms/input-number';
import { getProduct } from '@services/products';
import { priceFormatting, priceWhitDiscount } from '@assets/scripts';

const ProductDetail = (props) => {
  const { product } = props;
  if (product) {
    return (
      <>
        <div className="mb-6 flex justify-center">
          <img src={product.image_url} alt={product.title} className="w-[60%] h-auto" />
        </div>
        <span className="mb-4 font-medium text-[1.75rem]">Descripción</span>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </>
    );
  }
  return <b>Cargando...</b>;
};

const ProductPricing = (props) => {
  const { control, handleSubmit, onSubmit, product } = props;
  const navigate = useNavigate();

  const handleBuy = () => {
    setTimeout(() => {
      navigate('/checkout');
    }, 50);
  };

  if (product) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-sm text-gray-500 font-open-sans">Nuevo</span>
          <span className="font-semibold text-xl font-open-sans">{product.title}</span>
        </div>
        <div>
          {product.discount > 0 && (
            <h4 className="line-through font-light text-gray-500">${priceFormatting(product.price)}</h4>
          )}
          <div className="flex items-center gap-2">
            <span className="font-light text-4xl">$ {priceWhitDiscount(product.price, product.discount)}</span>
            {product.discount > 0 && <span className="text-green-500 tracking-wide">{product.discount}% OFF</span>}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {product.stock === 0 ? (
            <span>Sin stock</span>
          ) : (
            <InputNumber
              control={control}
              id="quantity-id"
              name="quantity"
              label={`Cantidad: (${product?.stock} disponibles)`}
              size="large"
              min={1}
              max={product?.stock}
            />
          )}
          <div className="flex flex-col gap-3">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="!h-14"
              icon={<ShoppingOutlined />}
              disabled={product.stock === 0}
              onClick={() => handleBuy()}
            >
              Comprar
            </Button>
            <Button
              type="default"
              htmlType="submit"
              size="large"
              className="!h-14"
              icon={<ShoppingCartOutlined />}
              disabled={product.stock === 0}
            >
              Agregar al carrito
            </Button>
          </div>
        </form>
      </div>
    );
  }
  return <b>Cargando...</b>;
};

export function Component() {
  const params = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState();

  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      quantity: 1,
    },
    shouldUnregister: true,
  });

  useEffect(() => {
    getProductData();
  }, [params.id]);

  const getProductData = async () => {
    try {
      const data = await getProduct(params.id);
      setProduct(data);
    } catch {
      // TODO: tratar el error
    }
  };

  const onSubmit = async ({ quantity }) => {
    addToCart(product, quantity);
  };

  return (
    <div className="w-full grid gap-4 grid-cols-1 lg:grid-cols-[5fr,2fr]">
      <div className="product-detail w-full md:min-h-[70%] p-6 flex flex-col bg-white border rounded-md font-open-sans">
        <ProductDetail product={product} />
      </div>
      <div className="w-full h-fit p-6 flex flex-col bg-white border rounded-md">
        <ProductPricing product={product} control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
