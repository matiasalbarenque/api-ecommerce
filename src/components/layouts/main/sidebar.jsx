import { Menu } from 'antd';
import { useNavigate, Link } from 'react-router-dom';

import { categories } from '@assets/mockup';

export default function Sidebar() {
  const navigate = useNavigate();

  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };

  const items = [
    getItem(
      'Componentes',
      'grp',
      null,
      categories.map((a) => getItem(<Link to={`/category/${a.id}`}>{a.title}</Link>, a.id)),
      'group',
    ),
  ];

  return (
    <Menu
      style={{ width: '100%', borderInlineEnd: 'none' }}
      defaultSelectedKeys={['cat1']}
      mode="inline"
      items={items}
    />
  );
}
