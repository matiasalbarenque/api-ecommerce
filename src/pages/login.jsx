import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button } from 'antd';
import { LoginOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons';
import { Input } from '@atoms/input';
import { useAuth } from '@hooks/use-auth';
import { login } from '@services/auth';

const LoginForm = (props) => {
  const { control, handleSubmit, isFormValid, onSubmit, hasLoginError } = props;
  const navigate = useNavigate();

  const signupHandler = () => {
    navigate('/signup');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        control={control}
        name="email"
        placeholder="Ingrese su email"
        prefix={<UserOutlined />}
        rules={{ required: true }}
        size="large"
        type="email"
      />
      <Input
        control={control}
        name="password"
        type="password"
        size="large"
        placeholder="Ingrese su contraseña"
        rules={{ required: true }}
        prefix={<KeyOutlined />}
      />
      {hasLoginError && (
        <Alert
          type="error"
          description="El usuario no existe en el sistema. Verifique los datos ingresados e intente nuevamente."
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
        >
          Ir al registro
        </Button>
        <Button
          disabled={!isFormValid}
          htmlType="submit"
          icon={<LoginOutlined />}
          shape="default"
          size="large"
          type="primary"
          className="w-full !h-14"
        >
          Ingresar
        </Button>
      </div>
    </form>
  );
};

export function Component() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [hasLoginError, setHasLoginError] = useState(false);

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
    const [loginData] = await login(formData);
    if (!loginData) {
      setHasLoginError(true);
      return;
    }

    // Setea datos de sesión en el contexto Auth
    // para usarlo en distintas partes de la App
    setUser({
      email: loginData.email,
      firstName: loginData.firstName,
      id: loginData.id,
      isLogged: true,
      lastName: loginData.lastName,
      userType: loginData.userType,
    });

    if (loginData.userType === 'seller') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <main className="w-full min-h-dvh flex justify-center items-center bg-pattern">
      <div className="px-6 py-8 w-full max-w-sm bg-white rounded-lg border border-gray-300">
        <div className="flex flex-col gap-6">
          <div className="w-full flex justify-center">
            <Link to="/">
              <img src="/logo.svg" alt="Logo" width="48" height="48" />
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
          />
        </div>
      </div>
    </main>
  );
}
