import { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { Icon } from '@atoms/icon';

import { getCategories } from '@services/categories';

export default function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoriesData();
  }, []);

  const getCategoriesData = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      // TODO: Tratar el error con una alerta
    }
  };

  const items = categories.map((a) => ({
    key: a.id,
    icon: <Icon icon={a.icon} className="!align-[-5px]" />,
    label: <NavLink to={`/category/${a.id}`}>{a.title}</NavLink>,
  }));

  return (
    <>
      <span className="p-2 font-medium text-sm text-gray-600">Componentes</span>
      <Menu items={items} mode="vertical" style={{ width: '100%', borderInlineEnd: 'none' }} />
    </>
  );
}
