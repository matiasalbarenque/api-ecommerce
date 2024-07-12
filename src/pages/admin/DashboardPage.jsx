import { Alert } from 'antd';
import { useAuth } from '@hooks/use-auth';
import { ROLES } from '@constants';

export const AdminDashboardPage = () => {
  const { user } = useAuth();
  return (
    <Alert
      message="Bienvenido"
      type="info"
      showIcon
      description={
        <>
          {user.role === ROLES.SELLER ? (
            <span>Bienvenido a la plataforma para administrar tus compras, gestionar tus publicaciones y tu perfil.</span>
          ) : (
            <span>Bienvenido a la plataforma para visulizar tus compras y gestionar tu perfil.</span>
          )}
        </>
      }
    />
  );
};
