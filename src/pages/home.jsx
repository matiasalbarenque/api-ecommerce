import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import Card from '@molecules/card';
import AsideContent from '../modules/home/sidebar';
import { getCategories } from '@services/categories';

export function Component() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoriesData();
  }, []);

  const getCategoriesData = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  return (
    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-[1fr,3fr]">
      <div className="w-full min-w-[320px] h-min p-4 flex flex-col bg-white border rounded-md">
        <AsideContent />
      </div>

      <div className="w-full flex flex-col">
        <h1 className="mt-4 mb-5 font-normal text-2xl">Las mejores promos ✨</h1>
        <div className="w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {categories.map((a) => (
            <Card
              key={a.id}
              btnText="Ver categoría"
              btnUrl={`/category/${a.id}`}
              imageAlt={a.title}
              imageUrl={a.imageUrl}
            >
              <div className="h-12 overflow-hidden">
                <Link to={`/category/${a.id}`} className="hover:text-amber-500 group">
                  <h2 className="inline-block font-semibold">{a.title}</h2>
                  <span className="pl-1">
                    <PlusOutlined className="transition ease-in-out group-hover:rotate-[360deg] duration-700" />
                  </span>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
