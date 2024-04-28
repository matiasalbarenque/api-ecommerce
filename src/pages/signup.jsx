import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button } from 'antd';
import { UserOutlined, MailOutlined, KeyOutlined, UserAddOutlined } from '@ant-design/icons';
import { Input } from '@atoms/input';
import { Select } from '@atoms/select';
import { getUserTypes } from '@services/user-types';
import { getUsers } from '@services/users';
import { signup } from '@services/auth';

const SignupForm = (props) => {
  const { control, handleSubmit, isFormValid, onSubmit, userTypes, hasSignupError } = props;
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        control={control}
        name="firstName"
        placeholder="Nombre"
        prefix={<UserOutlined />}
        rules={{ required: true }}
        size="large"
      />
      <Input
        control={control}
        name="lastName"
        placeholder="Apellido"
        prefix={<UserOutlined />}
        rules={{ required: true }}
        size="large"
      />
      <Input
        control={control}
        name="email"
        placeholder="Correo electrónico"
        prefix={<MailOutlined />}
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
      <Input
        control={control}
        name="passwordRepeat"
        type="password"
        size="large"
        placeholder="Ingrese su contraseña (Repetir)"
        rules={{
          required: true,
          validate: (val) => {
            console.log(val);
            return false;
          },
        }}
        prefix={<KeyOutlined />}
      />
      <Select
        control={control}
        name="userType"
        size="large"
        placeholder="Tipo de usuario"
        rules={{ required: true }}
        options={userTypes.map((a) => ({ value: a.userType, label: <span>{a.description}</span> }))}
      />
      {hasSignupError && (
        <Alert
          type="error"
          description="El usuario ya existe en el sistema. Ingrese un email distinto e intente nuevamente."
          showIcon
        />
      )}
      <div className="flex gap-4">
        <Button
          shape="default"
          size="large"
          type="default"
          onClick={loginHandler}
          className="w-full !h-14"
        >
          Ir al login
        </Button>
        <Button
          disabled={!isFormValid}
          htmlType="submit"
          icon={<UserAddOutlined />}
          shape="default"
          size="large"
          type="primary"
          className="w-full !h-14"
        >
          Registrarme
        </Button>
      </div>
    </form>
  );
};

export function Component() {
  const navigate = useNavigate();
  const [userTypes, setUserTypes] = useState([]);
  const [hasSignupError, setHasSignupError] = useState(false);

  const { control, formState, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordRepeat: '',
      username: '',
      userType: null,
    },
    shouldUnregister: true,
  });

  const isFormValid = Object.keys(formState.errors).length === 0;

  useEffect(() => {
    getUserTypesData();
  }, []);

  const getUserTypesData = async () => {
    const data = await getUserTypes();
    setUserTypes(data);
  };

  const onSubmit = async ({ passwordRepeat, ...rest }) => {
    const userList = await getUsers();
    const userWithSameEmail = userList.find((a) => a.email === rest.email);
    if (userWithSameEmail) {
      setHasSignupError(true);
      return;
    }
    signup(rest);
    navigate('/login');
  };

  return (
    <main className="w-full min-h-dvh flex justify-center items-center bg-pattern">
      <div className="p-6 py-8 w-full max-w-sm bg-white rounded-lg border border-gray-300">
        <div className="flex flex-col gap-6">
          <div className="w-full flex justify-center">
            <Link to="/">
              <img src="/logo.svg" alt="Logo" width="48" height="48" />
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-2xl">Registro de usuario</h1>
          </div>
          <SignupForm
            control={control}
            handleSubmit={handleSubmit}
            isFormValid={isFormValid}
            onSubmit={onSubmit}
            userTypes={userTypes}
            hasSignupError={hasSignupError}
          />
        </div>
      </div>
    </main>
  );
}
