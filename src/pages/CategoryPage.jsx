import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge, Skeleton } from 'antd';
import { EmptyState } from '@atoms/EmptyState';
import { Icon } from '@atoms/Icon';
import { ProductCard } from '@organisms/ProductCard';
import { CardSkeleton } from '@molecules/CardSkeleton';

import { useCategories } from '@hooks/use-categories';
import { getProductsByCategoryId } from '@services/products';
import { Sidebar } from '../modules/home/Sidebar';

const BadgeRibbon = (props) => {
  const { children, stock } = props;
  if (stock === 0) {
    return (
      <Badge.Ribbon color="red" text="Sin Stock">
        {children}
      </Badge.Ribbon>
    );
  }
  if (stock <= 10) {
    return (
      <Badge.Ribbon color="orange" text="Bajo Stock">
        {children}
      </Badge.Ribbon>
    );
  }
  return <>{children}</>;
};

const ProductsGrid = (props) => {
  const { products, isLoading } = props;

  if (!isLoading && products.length === 0) {
    return <EmptyState text="No existen productos disponibles para mostrar" />;
  }

  const itemsSkeleton = Array(6).fill(1);

  return (
    <div className="w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {isLoading
        ? itemsSkeleton.map((a, index) => <CardSkeleton key={index} />)
        : products.map((a) => (
            <BadgeRibbon stock={a.stock} key={a.id}>
              <ProductCard {...a} />
            </BadgeRibbon>
          ))}
    </div>
  );
};

export const CategoryPage = () => {
  const params = useParams();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    getProductsData();
  }, [params.id]);

  const getProductsData = async () => {
    setIsLoadingProducts(true);
    try {
      const data = await getProductsByCategoryId(params.id);
      setProducts(data);
    } catch {
      // TODO: tratar el error-
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const productCategory = categories.find((a) => a.id.toString() === params.id);

  return (
    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-[1fr,3fr]">
      <div className="w-full min-w-[320px] h-min p-4 flex flex-col bg-white border rounded-md">
        <Sidebar categories={categories} isLoading={isLoadingCategories} />
      </div>

      <div className="w-full flex flex-col">
        <h1 className="mt-4 mb-5 font-normal text-2xl">
          {isLoadingCategories ? (
            <div className="flex flex-row gap-3">
              <Skeleton.Avatar active shape="circle" />
              <Skeleton.Input active />
            </div>
          ) : (
            <>
              <Icon icon={productCategory?.icon} size="32" className="inline mr-3 mb-1" />
              Listado de {productCategory?.title}
            </>
          )}
        </h1>
        <ProductsGrid products={products} isLoading={isLoadingProducts} />
      </div>
    </div>
  );
};
