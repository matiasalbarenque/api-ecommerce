import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

export const Card = (props) => {
  const { btnText, btnUrl, imageAlt, imageUrl, children } = props;
  const navigate = useNavigate();

  const handleButton = (url) => {
    navigate(url);
  };

  return (
    <div className="w-full bg-white border border-gray-300 rounded-lg flex flex-col overflow-hidden">
      <div className="relative aspect-square bg-white group overflow-hidden">
        <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-65 transition-opacity duration-500 opacity-0 group-hover:opacity-100 flex justify-center items-center">
          <Button type="primary" size="large" shape="round" onClick={() => handleButton(btnUrl)}>
            {btnText}
          </Button>
        </div>
      </div>
      <div className="relative p-3 border-t border-gray-200 overflow-hidden">{children}</div>
    </div>
  );
};
