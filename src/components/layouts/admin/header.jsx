import { Link } from 'react-router-dom';
import { Button, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function Header() {
  const items = [
    {
      key: '1',
      label: <Link to="/">Cerrar sesión</Link>,
    },
  ];

  return (
    <header className="p-3 border-b flex justify-between gap-5">
      <div className="flex items-center">
        <Link to="/">
          <img src="/logo.svg" alt="Logo" width="32" height="32" />
        </Link>
      </div>
      <div className="flex gap-4">
        <div>
          <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }} trigger={['click']}>
            <Button type="default" shape="circle" icon={<UserOutlined />} size="large" />
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
