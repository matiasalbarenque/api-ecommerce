import { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import { getCategories } from '@services/categories';

export default function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoriesData();
  }, []);

  const getCategoriesData = async () => {
    const data = await getCategories();
    setCategories(data);
  };

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
      defaultSelectedKeys={['cat1']}
      items={items}
      mode="inline"
      style={{ width: '100%', borderInlineEnd: 'none' }}
    />
  );
}
