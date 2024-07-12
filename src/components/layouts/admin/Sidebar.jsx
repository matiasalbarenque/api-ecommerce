import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

import { ROLES } from '@constants';
import { useAuth } from '@hooks/use-auth';
import { Icon } from '@atoms/Icon';

export const Sidebar = () => {
  const { user } = useAuth();

  const getItems = () => {
    const screens = [
      {
        icon: 'hugeicons:dashboard-square-02',
        page: '',
        title: 'Dashboard',
      },
      {
        icon: 'ion:bag-check-outline',
        page: '/purchases',
        title: 'Mis compras',
      },
    ];

    if (user.role === ROLES.SELLER) {
      screens.push({
        icon: 'octicon:package',
        page: '/products',
        title: 'Productos',
      });
    }

    return screens;
  };

  const items = getItems().map((a) => ({
    key: a.id,
    icon: <Icon icon={a.icon} className="!align-[-5px]" />,
    label: <NavLink to={`/admin${a.page}`}>{a.title}</NavLink>,
  }));

  return <Menu items={items} mode="vertical" style={{ width: '100%', borderInlineEnd: 'none' }} />;
};
