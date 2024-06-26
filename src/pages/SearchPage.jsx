import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Select } from '@atoms/Select';
import { Slider } from '@atoms/Slider';
import { EmptyState } from '@atoms/EmptyState';
import { ProductCard } from '@organisms/ProductCard';
import { CardSkeleton } from '@molecules/CardSkeleton';
import { getProductBySearch } from '@services/products';
import { getCategories } from '@services/categories';
import { priceFormatting } from '@assets/scripts';

const ProductsGrid = (props) => {
  const { products, isLoading } = props;

  if (!isLoading && products.length === 0) {
    return <EmptyState text="No existen productos disponibles para mostrar" />;
  }

  const itemsSkeleton = Array(6).fill(1);

  return (
    <div className="w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {isLoading
        ? itemsSkeleton.map((a, index) => <CardSkeleton key={index} />)
        : products.map((a) => <ProductCard {...a} key={a.id} />)}
    </div>
  );
};

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q').toLowerCase();
  const priceRangeMinValue = useRef(0);
  const priceRangeMaxValue = useRef(100);
  const [categories, setCategories] = useState([]);
  const [categoriesFiltered, setCategoriesFiltered] = useState([]);
  const [productsBySearch, setProductsBySearch] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const { control, formState, handleSubmit, watch, setValue } = useForm({
    mode: 'onChange',
    defaultValues: {
      priceRange: [0, 100],
      categoryId: undefined,
    },
    shouldUnregister: true,
  });

  const isFormValid = Object.keys(formState.errors).length === 0;

  useEffect(() => {
    getProductsData();
  }, [searchQuery]);

  const getProductsData = async () => {
    setIsLoadingProducts(true);
    try {
      const productsData = await getProductBySearch(searchQuery);
      // filter: deja unicamente productos con stock
      // map: deja unicamente los datos que necesitamos para filtrar
      // sort: ordena por precio de menor a mayor
      const productListFilteredByStock = productsData
        .filter((a) => a.stock > 0)
        .map(({ description, userSellerId, ...rest }) => rest)
        .sort((b, c) => b.price - c.price);
      filterProductsBySearch(productListFilteredByStock);
    } catch {
      setIsLoadingProducts(false);
      // TODO: tratar el error
    }
  };

  const filterProductsBySearch = (prod) => {
    setProductsBySearch(prod);
    setProductsFiltered(prod);
    const priceRangeMinVal = Math.min(...prod.map((a) => Number(a.price)));
    const priceRangeMaxVal = Math.max(...prod.map((a) => Number(a.price)));
    priceRangeMinValue.current = priceRangeMinVal;
    priceRangeMaxValue.current = priceRangeMaxVal;
    setValue('priceRange', [priceRangeMinVal, priceRangeMaxVal]);
    // Filtro categorías según en resultado de productos
    getCategoriesData(prod);
  };

  const getCategoriesData = async (productsFilteredBySearch) => {
    let categoriesData = categories;
    if (categories.length === 0) {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        // TODO: Tratar el error con una alerta
      }
    }
    setIsLoadingProducts(false);
    const categoriesByProductIdsSet = new Set(productsFilteredBySearch.map((a) => a.category_id)); // Con set se quitan los ids duplicados
    const categoriesByProductIds = Array.from(categoriesByProductIdsSet); // Armo el array nuevamente
    const categoriesFiltered = categoriesData.filter((a) => categoriesByProductIds.includes(a.id));
    setCategoriesFiltered(categoriesFiltered);
  };

  const onSubmit = async ({ priceRange, categoryId }) => {
    let productsFilteredByPriceRange = productsBySearch.filter(
      (a) => a.price >= priceRange[0] && a.price <= priceRange[1],
    );
    if (categoryId) {
      productsFilteredByPriceRange = productsFilteredByPriceRange.filter((a) => a.category_id === categoryId);
    }
    setProductsFiltered(productsFilteredByPriceRange);
  };

  const priceRangeSelected = watch('priceRange');
  const isFilteredDisabled = productsBySearch.length <= 1;

  return (
    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-[1fr,3fr]">
      <div className="w-full min-w-[320px] h-fit px-4 py-6 flex flex-col bg-white border rounded-md">
        <h2 className="text-xl">Filtros</h2>
        <br />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Slider
            control={control}
            id="price-range-id"
            name="priceRange"
            label="Rango de precio"
            tooltip={{ formatter: (a) => (a ? `$${priceFormatting(a)}` : '') }}
            min={priceRangeMinValue.current}
            max={priceRangeMaxValue.current}
            disabled={isFilteredDisabled}
            step={100}
            range
          />
          {!isFilteredDisabled && (
            <div className="p-2 rounded-md bg-gray-50 border border-gray-200 text-center select-none">
              {`$${priceFormatting(priceRangeSelected[0])} a $${priceFormatting(priceRangeSelected[1])}`}
            </div>
          )}
          <Select
            control={control}
            id="category-id"
            name="categoryId"
            label="Categoría"
            size="large"
            placeholder="Categoría"
            className="w-full"
            allowClear
            disabled={isFilteredDisabled}
            options={categoriesFiltered.map((a) => ({ value: a.id, label: <span>{a.title}</span> }))}
          />
          <Button
            disabled={!isFormValid || isFilteredDisabled}
            htmlType="submit"
            icon={<SearchOutlined />}
            shape="default"
            size="large"
            type="primary"
            className="w-full"
          >
            Filtrar
          </Button>
        </form>
      </div>
      <div className="w-full h-fit p-4 flex flex-col bg-white border rounded-md">
        <h1 className="mt-4 mb-5 font-normal text-2xl">Resultado de la búsqueda 🔍</h1>
        <ProductsGrid products={productsFiltered} isLoading={isLoadingProducts} />
      </div>
    </div>
  );
};
