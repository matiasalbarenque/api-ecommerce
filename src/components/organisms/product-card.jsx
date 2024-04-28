import { Link } from 'react-router-dom';
import { Card } from '@molecules/card';
import { priceFormatting } from '@assets/scripts';

export const ProductCard = (props) => {
  const { id, imageUrl, title, stock, price } = props;
  return (
    <Card key={id} btnText="Ver producto" btnUrl={`/product/${id}`} imageUrl={imageUrl} imageAlt={title}>
      <div className="flex flex-col">
        <div className="h-12 overflow-hidden">
          <Link to={`/product/${id}`}>
            <h2 className="hover:text-amber-500">{title}</h2>
          </Link>
        </div>
        <span className="leading-6 text-slate-500 text-sm">Stock: {stock}</span>
        <h3 className="font-semibold text-xl">${priceFormatting(price)}</h3>
      </div>
    </Card>
  );
};
