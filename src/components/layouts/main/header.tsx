import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Dropdown } from 'antd';
import { ShoppingCartOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Input } from '@atoms';

type formFields = {
  search: string;
};

export default function Header() {
  const navigate = useNavigate();
  const { control, formState, handleSubmit } = useForm<formFields>({
    mode: 'onChange',
    defaultValues: {
      search: '',
    },
    shouldUnregister: true,
  });

  const isFormValid = Object.keys(formState.errors).length === 0;

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Mi perfil
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          Mis compras
        </a>
      ),
    },
    {
      key: '3',
      type: 'divider',
    },
    {
      key: '4',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Cerrar sesión
        </a>
      ),
    },
  ];

  const onSubmit = async (formData: formFields) => {
    navigate(`/search?q=${encodeURIComponent(formData?.search)}`);
  };

  return (
    <header className="p-3 border-b flex justify-between gap-5">
      <div className="flex items-center">
        <Link to="/">
          <img src="/logo.svg" alt="Logo" width="32" height="32" />
        </Link>
      </div>
      <div className="w-full md:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center flex-grow gap-3">
          <Input control={control} name="search" placeholder="Producto a buscar..." rules={{ required: true }} />
          <Button
            htmlType="submit"
            type="default"
            disabled={!isFormValid}
            icon={<SearchOutlined />}
            className="!h-full"
          >
            Buscar
          </Button>
        </form>
      </div>
      <div className="flex gap-4">
        <div>
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
            trigger={['click']}
            dropdownRender={() => (
              <div className="p-3 bg-white rounded-lg shadow-xl">
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <span>No hay productos en el carrito</span>
                </div>
              </div>
            )}
          >
            <Button type="default" shape="circle" icon={<ShoppingCartOutlined />} size="large" />
          </Dropdown>
        </div>
        <div>
          <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }} trigger={['click']}>
            <Button type="default" shape="circle" icon={<UserOutlined />} size="large" />
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
