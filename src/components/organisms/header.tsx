import { Button, Dropdown, Input } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

export default function Header() {
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

  return (
    <header className="p-3 border-b flex justify-between gap-5">
      <div className="flex items-center">
        <img src="logo.svg" alt="Logo" width="32" height="32" />
      </div>
      <div className="flex justify-center flex-grow gap-3 md:max-w-sm">
        <Input placeholder="Producto a buscar..." />
        <Button type="default" icon={<SearchOutlined />} className="!h-full">
          Buscar
        </Button>
      </div>
      <div>
        <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }} trigger={['click']}>
          <Button type="default" shape="circle" icon={<UserOutlined />} size="large" />
        </Dropdown>
      </div>
    </header>
  );
}
