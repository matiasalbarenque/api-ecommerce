import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from 'antd';
import { EmptyState } from '@atoms/empty-state';
import { Icon } from '@atoms/icon';
import { ProductCard } from '@organisms/product-card';

import AsideContent from '../modules/home/sidebar';
import { getProducts } from '@services/products';
import { getCategories } from '@services/categories';

const BadgeRibbon = (props) => {
  const { children, stock } = props;
  if (stock === 0) {
    return <Badge.Ribbon color="red" text="Sin Stock">{children}</Badge.Ribbon>;
  }
  if (stock <= 10) {
    return <Badge.Ribbon color="orange" text="Bajo Stock">{children}</Badge.Ribbon>;
  }
  return <>{children}</>;
};

const productCardList = (products) => {
  if (products.length > 0) {
    return (
      <div className="w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {products.map((a) => (
          <BadgeRibbon stock={a.stock} key={a.id}>
            <ProductCard {...a} />
          </BadgeRibbon>
        ))}
      </div>
    );
  }
  return <EmptyState text="No existen productos disponibles para mostrar" />;
};

export function Component() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoriesData();
  }, []);

  useEffect(() => {
    getProductsData();
  }, [params.id]);

  const getCategoriesData = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const getProductsData = async () => {
    const data = await getProducts(`?categoryId=${params.id}`);
    //const productListFilteredByStock = data.filter((a) => a.stock > 0); // Ocultar productos sin stock
    setProducts(data);
  };

  const productCategory = categories.find((a) => a.id.toString() === params.id);

  return (
    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-[1fr,3fr]">
      <div className="w-full min-w-[320px] h-min p-4 flex flex-col bg-white border rounded-md">
        <AsideContent />
      </div>

      <div className="w-full flex flex-col">
        <h1 className="mt-4 mb-5 font-normal text-2xl">
          <Icon icon={productCategory?.icon} size="32" className="inline mr-3 mb-1" />
          Listado de {productCategory?.title}
        </h1>
        {productCardList(products)}
      </div>
    </div>
  );
}
