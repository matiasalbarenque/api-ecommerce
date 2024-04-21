import { Menu } from 'antd';
import { useNavigate, Link } from 'react-router-dom';

import { adminScreens } from '@assets/mockup';

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
      'Secciones',
      'grp',
      null,
      adminScreens.map((a) => getItem(<Link to={`/admin/${a.screen}`}>{a.description}</Link>, a.id)),
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
