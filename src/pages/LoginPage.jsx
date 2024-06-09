import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Alert, Button } from 'antd';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

import { APP } from '@constants';
import { Icon } from '@atoms/Icon';
import { Input } from '@atoms/Input';
import { useAuth } from '@hooks/use-auth';
import { login } from '@services/auth';
import { getUserInfo } from '@services/admin/users';

const LoginForm = (props) => {
  const { control, handleSubmit, isFormValid, onSubmit, hasLoginError, isLoading } = props;
  const navigate = useNavigate();

  const signupHandler = () => {
    navigate('/signup');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        control={control}
        id="email-id"
        name="email"
        label="Correo electrónico"
        placeholder="Ingrese su email"
        prefix={<UserOutlined />}
        rules={{ required: true }}
        size="large"
        type="email"
        disabled={isLoading}
      />
      <Input
        control={control}
        id="password-id"
        name="password"
        label="Contraseña"
        type="password"
        size="large"
        placeholder="Ingrese su contraseña"
        rules={{ required: true }}
        prefix={<Icon icon="material-symbols-light:vpn-key-outline-rounded" />}
        disabled={isLoading}
      />
      {hasLoginError && (
        <Alert
          type="error"
          description="El usuario no existe en el sistema. Verifique los datos ingresados e intente nuevamente "
          showIcon
        />
      )}
      <div className="flex gap-4">
        <Button
          shape="default"
          size="large"
          type="default"
          onClick={signupHandler}
          className="w-full !h-14"
          disabled={isLoading}
        >
          Ir al registro
        </Button>
        <Button
          disabled={!isFormValid || isLoading}
          htmlType="submit"
          icon={<LoginOutlined />}
          shape="default"
          size="large"
          type="primary"
          className="w-full !h-14"
          loading={isLoading}
        >
          Ingresar
        </Button>
      </div>
    </form>
  );
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const { setUser } = useAuth();
  const [hasLoginError, setHasLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { control, formState, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    shouldUnregister: true,
  });

  const isFormValid = Object.keys(formState.errors).length === 0;

  const onSubmit = async (formData) => {
    let accessToken = null;
    let userInfo = null;
    setIsLoading(true);
    setHasLoginError(false);
    try {
      const resp = await login(formData);
      accessToken = resp.access_token;
      userInfo = await getUserInfo(accessToken);
    } catch {
      setHasLoginError(true);
      return;
    } finally {
      setIsLoading(false);
    }

    const tokenData = jwtDecode(accessToken);
    Cookies.set(APP.ACCESS_TOKEN_NAME, accessToken, {
      expires: new Date(tokenData.exp * 1000),
    });

    // Setea datos de sesión en el slice Auth de redux
    // para usarlo en distintas partes de la App
    const userData = {
      avatarUrl: userInfo.avatar_img,
      email: userInfo.email,
      firstName: userInfo.firstname,
      id: userInfo.id,
      isLogged: true,
      lastName: userInfo.lastname,
      role: userInfo.role.name,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    navigate(`/${redirectTo || 'admin'}`);
  };

  return (
    <main className="w-full min-h-dvh flex justify-center items-center bg-pattern">
      <div className="px-6 py-8 w-full max-w-sm bg-white rounded-lg border border-gray-300">
        <div className="flex flex-col gap-6">
          <div className="w-full flex justify-center">
            <Link to="/">
              <img src="/icon.svg" alt="Logo" width="64" height="64" />
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-2xl">Inicio de sesión</h1>
          </div>
          <LoginForm
            control={control}
            handleSubmit={handleSubmit}
            isFormValid={isFormValid}
            onSubmit={onSubmit}
            hasLoginError={hasLoginError}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
};
