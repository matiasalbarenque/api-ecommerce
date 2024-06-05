import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '@atoms/Icon';
import { Card } from '@molecules/Card';
import { Sidebar } from '../modules/home/Sidebar';
import { getCategories } from '@services/categories';

export const HomePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoriesData();
  }, []);

  const getCategoriesData = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      // TODO: Tratar el error con una alerta
    }
  };

  return (
    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-[1fr,3fr]">
      <div className="w-full min-w-[320px] h-min p-4 flex flex-col bg-white border rounded-md">
        <Sidebar />
      </div>

      <div className="w-full flex flex-col">
        <h1 className="mt-4 mb-5 font-normal text-2xl">Las mejores promos ✨ </h1>
        <div className="w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {categories.map((a) => (
            <Card
              key={a.id}
              btnText="Ver categoría"
              btnUrl={`/category/${a.id}`}
              imageAlt={a.title}
              imageUrl={a.image_url}
            >
              <Icon icon={a.icon} size={110} className="-top-10 -right-6 absolute text-gray-100" />
              <div className="h-12 overflow-hidden relative">
                <Link to={`/category/${a.id}`} className="hover:text-amber-500 group inline-flex">
                  <h2 className="inline-block font-semibold">{a.title}</h2>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
