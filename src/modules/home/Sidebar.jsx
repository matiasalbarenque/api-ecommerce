import { NavLink } from 'react-router-dom';
import { Menu, Skeleton } from 'antd';
import { Icon } from '@atoms/Icon';

export const Sidebar = (props) => {
  const { categories = [], isLoading = true } = props;

  const items = categories.map((a) => ({
    key: a.id,
    icon: <Icon icon={a.icon} className="!align-[-5px]" />,
    label: <NavLink to={`/category/${a.id}`}>{a.title}</NavLink>,
  }));

  const MenuSkeleton = (props) => {
    const { length } = props;
    const itemsSkeleton = Array(length).fill(1);
    return (
      <div className="m-4 flex flex-col gap-6">
        {itemsSkeleton.map((a, index) => (
          <div key={`list-skeleton-${index}`} className="flex flex-row gap-3">
            <Skeleton.Avatar active shape="circle" />
            <Skeleton.Input active block={index % 2 !== 0} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <span className="p-2 font-medium text-sm text-gray-600">Componentes</span>
      {isLoading ? (
        <MenuSkeleton length={9} />
      ) : (
        <Menu items={items} mode="vertical" style={{ width: '100%', borderInlineEnd: 'none' }} />
      )}
    </>
  );
};
