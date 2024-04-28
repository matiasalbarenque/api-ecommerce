import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';
import { useCart } from '@hooks/use-cart'; // Custom hook
import { getProduct } from '@services/products';

export function Component() {
  const params = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState();

  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = async () => {
    const data = await getProduct(params.id);
    setProduct(data);
  };

  return (
    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-[5fr,2fr]">
      <div className="w-full md:h-[70%] p-4 flex flex-col bg-white border rounded-md">
        <span>Imagen + descripción del producto {params.id} acá 👈</span>
      </div>
      <div className="w-full min-w-[320px] md:h-full p-4 flex flex-col bg-white border rounded-md">
        <span>Precio, Stock y botón de compra acá 👈</span>
        <br />
        TODO: Elegir la cantidad y SOLAMENTE agregar si no existe ya en el carrito
        <Button type="primary" size="large" onClick={() => addToCart(product, 7)}>
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
}
