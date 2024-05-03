import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export function Component() {

  const navigate = useNavigate();
  
  const handleRedirect = () => {
    navigate('/');
  }

  return (
    <Result className='w-full h-full'
    status="success"
    title="Orden realizada con éxito!"
    extra={[
      <Button type="primary" onClick={handleRedirect}>
        Volver a inicio
      </Button>
    ]}
  />
  )
}
