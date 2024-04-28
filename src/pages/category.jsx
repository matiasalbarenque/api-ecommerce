import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import EmptyState from '@atoms/empty-state';
import { priceFormatting } from '@assets/scripts';

import Card from '@molecules/card';
import AsideContent from '../modules/home/sidebar';
import { getProducts } from '@services/products';

const productCardList = (products) => {
  if (products.length === 0) {
    return <EmptyState text="No existen productos disponibles para mostrar" />;
  }

  return (
    <div className="w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {products.map((a) => (
        <Card key={a.id} btnText="Ver producto" btnUrl={`/product/${a.id}`} imageUrl={a.imageUrl} imageAlt={a.title}>
          <div className="flex flex-col">
            <div className="h-12 overflow-hidden">
              <Link to={`/product/${a.id}`}>
                <h2 className="hover:text-amber-500">{a.title}</h2>
              </Link>
            </div>
            <span className="leading-6 text-slate-500 text-sm">Stock: {a.stock}</span>
            <h3 className="font-semibold text-xl">${priceFormatting(a.price)}</h3>
          </div>
        </Card>
      ))}
    </div>
  );
};

export function Component() {
  const params = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsData();
  }, [params.id]);

  const getProductsData = async () => {
    const data = await getProducts();
    const productsByCategoryId = data.filter((a) => a.categoryId.toString() === params.id);
    const productListFilteredByStock = productsByCategoryId.filter((a) => a.stock > 0);
    setProducts(productListFilteredByStock);
  };

  return (
    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-[1fr,3fr]">
      <div className="w-full min-w-[320px] h-min p-4 flex flex-col bg-white border rounded-md">
        <AsideContent />
      </div>

      <div className="w-full flex flex-col">
        <h1 className="mt-4 mb-5 font-normal text-2xl">Listado de productos 📝</h1>
        {productCardList(products)}
      </div>
    </div>
  );
}
