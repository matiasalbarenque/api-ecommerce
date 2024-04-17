import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { CardProps } from '@typings/components';

export default function Card(props: CardProps) {
  const { btnText, btnUrl, imageAlt, imageUrl, children } = props;
  const navigate = useNavigate();

  const handleButton = (url: string) => {
    navigate(url);
  };

  return (
    <div className="w-full min-h-[400px] bg-white border-gray-200 border rounded-lg flex flex-col overflow-hidden">
      <div className="relative aspect-square bg-white group">
        <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-65 transition-opacity duration-500 opacity-0 group-hover:opacity-100 flex justify-center items-center">
          <Button type="primary" size="large" shape="round" onClick={() => handleButton(btnUrl)}>
            {btnText}
          </Button>
        </div>
      </div>
      <div className="p-3 border-t border-gray-200">{children}</div>
    </div>
  );
}
