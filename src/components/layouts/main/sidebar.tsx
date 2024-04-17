import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate, Link } from 'react-router-dom';

import { categories } from '@/assets/mockup';

type MenuItem = Required<MenuProps>['items'][number];

export default function Sidebar() {
  const navigate = useNavigate();

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  };

  const items: MenuProps['items'] = [
    getItem(
      'Componentes',
      'grp',
      null,
      categories.map((a) => getItem(<Link to={`/category/${a.id}`}>{a.title}</Link>, a.id)),
      'group',
    ),
  ];

  const handleClick: MenuProps['onClick'] = (e) => {
    navigate(`/category/${e.key}`);
  };

  return (
    <Menu
      onClick={handleClick}
      style={{ width: '100%', borderInlineEnd: 'none' }}
      defaultSelectedKeys={['cat1']}
      mode="inline"
      items={items}
    />
  );
}
