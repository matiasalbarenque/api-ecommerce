import { useEffect } from 'react';
import { Button } from 'antd';
import { CheckCircleFilled, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@hooks/use-cart';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

export const CheckoutSuccessPage = () => {
  const navigate = useNavigate();
  const { emptyCart } = useCart();

  useEffect(() => {
    emptyCart();
  }, []);

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div className="w-full">
      <Fireworks autorun={{ speed: 2, duration: 2000 }} />
      <div className="w-full min-h-[600px] p-6 bg-white rounded shadow flex justify-center items-center">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <CheckCircleFilled className="text-9xl" style={{ color: '#42b20b' }} />
          </div>
          <div>
            <span className="font-medium text-2xl">¡Orden realizada con éxito!</span>
          </div>
          <div className="flex justify-center">
            <Button type="primary" size="large" icon={<HomeOutlined />} className="mt-5" onClick={handleRedirect}>
              Volver al inicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
