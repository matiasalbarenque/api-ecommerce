import { Outlet, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Header from '../HeaderComp';
import Main from './Main';
import { Input } from '@atoms/InputComp';

const SearchNavbar = () => {
  const navigate = useNavigate();
  const { control, formState, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      search: '',
    },
    shouldUnregister: true,
  });

  const isFormValid = Object.keys(formState.errors).length === 0;

  const onSubmit = async (formData) => {
    navigate(`/search?q=${encodeURIComponent(formData?.search)}`);
  };

  return (
    <div className="w-full md:max-w-sm hidden sm:block">
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center flex-grow gap-3">
        <Input
          control={control}
          name="search"
          size="large"
          placeholder="Producto a buscar..."
          rules={{ required: true, minLength: 3 }}
        />
        <Button htmlType="submit" type="default" disabled={!isFormValid} icon={<SearchOutlined />} size="large">
          Buscar
        </Button>
      </form>
    </div>
  );
};

export default function MainLayout() {
  return (
    <>
      <Header>
        <SearchNavbar />
      </Header>
      <Main>
        <Outlet />
      </Main>
    </>
  );
}
