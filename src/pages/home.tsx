import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { Card } from '@molecules';
import { categories } from '@/assets/mockup';

const HomeCarousel = () => {
  return (
    <Carousel>
      <div className="w-full h-[400px] bg-amber-600"></div>
      <div className="w-full h-[400px] bg-blue-600"></div>
      <div className="w-full h-[400px] bg-green-600"></div>
      <div className="w-full h-[400px] bg-violet-600"></div>
    </Carousel>
  );
};

export default function HomePage() {
  return (
    <>
      <div className="w-full rounded-lg overflow-hidden shadow-md">
        <HomeCarousel />
      </div>

      <h2 className="font-bold text-xl">Las mejores promos</h2>

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
    </>
  );
}
