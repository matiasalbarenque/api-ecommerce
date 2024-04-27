import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { LoginOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons';
import Input from '@atoms/input';

const LoginForm = (props) => {
  const { control, handleSubmit, isFormValid, onSubmit } = props;
  const navigate = useNavigate();

  const signupHandler = () => {
    navigate('/signup');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        control={control}
        name="user"
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
      <Button
        className="mt-3"
        disabled={!isFormValid}
        htmlType="submit"
        icon={<LoginOutlined />}
        shape="round"
        size="large"
        type="primary"
      >
        Ingresar
      </Button>
      <Button icon={<LoginOutlined />} shape="round" size="large" type="default" onClick={signupHandler}>
        Ir al registro
      </Button>
    </form>
  );
};

export function Component() {
  const navigate = useNavigate();
  const { control, formState, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      user: '',
      password: '',
    },
    shouldUnregister: true,
  });

  const isFormValid = Object.keys(formState.errors).length === 0;

  const onSubmit = async (formData) => {
    // TODO: Si es usuario ir a la home, sinó a /admin
    if (formData.user === 'admin@gmail.com') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <main className="w-full min-h-dvh flex justify-center items-center bg-slate-300">
      <div className="p-6 w-full max-w-sm bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-6">
          <div className="w-full flex justify-center">
            <Link to="/">
              <img src="/logo.svg" alt="Logo" width="48" height="48" />
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-2xl">Registro de usuario</h1>
          </div>
          <LoginForm control={control} handleSubmit={handleSubmit} isFormValid={isFormValid} onSubmit={onSubmit} />
        </div>
      </div>
    </main>
  );
}
