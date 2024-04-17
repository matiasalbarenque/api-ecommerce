import { priceFormatting } from '@/assets/scripts';
import { products } from '@/assets/mockup';
import { useParams, Link } from 'react-router-dom';

import { Card } from '@molecules';

export default function CategoryPage() {
  const params = useParams();
  const category = products.find((a) => a.categoryId.toString() === params.id);

  return (
    <div className="w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {category?.items?.map((a) => (
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
}
