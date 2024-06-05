import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

import { ROLES } from '@constants';
import { useAuth } from '@hooks/use-auth';

export const Sidebar = () => {
  const { user } = useAuth();

  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };

  const getItems = () => {
    const screens = [
      {
        screen: 'purchases',
        description: 'Mis compras',
      },
    ];

    if (user.role === ROLES.SELLER) {
      screens.push({
        screen: 'products',
        description: 'Productos',
      });
    }

    return [
      getItem(
        'Secciones',
        'grp',
        null,
        screens.map((a) => getItem(<NavLink to={`/admin/${a.screen}`}>{a.description}</NavLink>, a.id)),
        'group',
      ),
    ];
  };

  return <Menu style={{ width: '100%', borderInlineEnd: 'none' }} mode="inline" items={getItems()} />;
}
