import { Link } from 'react-router-dom';
import { Card } from '@molecules/card';
import { priceFormatting, priceWhitDiscount } from '@assets/scripts';

export const ProductCard = (props) => {
  const { id, image_url, title, stock, price, discount } = props;
  return (
    <Card key={id} btnText="Ver producto" btnUrl={`/product/${id}`} imageUrl={image_url} imageAlt={title}>
      <div className="flex flex-col">
        <div className="h-12 overflow-hidden">
          <Link to={`/product/${id}`}>
            <h2 className="text-black hover:text-amber-500 leading-[1.4]">{title}</h2>
          </Link>
        </div>
        {discount > 0 ? (
          <h4 className="-mb-1 font-light line-through text-gray-500">${priceFormatting(price)}</h4>
        ) : (
          <h4 className="-mb-1">{' '}</h4>
        )}
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-2xl">${priceWhitDiscount(price, discount)}</h3>
          {discount > 0 && <span className="text-green-500 tracking-wide">{discount}% OFF</span>}
        </div>
        <span className="leading-6 text-slate-500 text-sm">Stock: {stock}</span>
      </div>
    </Card>
  );
};
