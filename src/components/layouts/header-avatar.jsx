import { Link, useNavigate } from 'react-router-dom';
import { Button, Divider, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '@hooks/use-auth';

const MenuOption = (props) => {
  const { userType } = props;

  if (userType === 'seller') {
    return (
      <div className="flex flex-col gap-2">
        <Link to="/admin" className="px-3 py-1 text-center !text-gray-600 hover:bg-gray-100 rounded-sm">
          Administrar
        </Link>
        <Divider className="!m-0" />
      </div>
    );
  }
};

export const UserAvatar = () => {
  const navigate = useNavigate();
  const { user, resetUser } = useAuth();

  const loginHandler = () => {
    navigate('/login');
  };

  const logout = () => {
    resetUser();
    navigate('/login');
  };

  if (user.isLogged) {
    return (
      <div>
        <Dropdown
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
          trigger={['click']}
          dropdownRender={() => (
            <div className="min-w-[220px] p-2 flex flex-col gap-2 bg-white rounded-md shadow-lg">
              <div className="p-2 w-full flex flex-col bg-gray-100 rounded-md">
                <span className="font-medium">{`${user.firstName} ${user.lastName}`}</span>
                <span className="text-gray-400">{`${user.email}`}</span>
              </div>
              <MenuOption userType={user.userType} />
              <Button type="text" onClick={logout}>
                Cerrar sesión
              </Button>
            </div>
          )}
        >
          <Button type="default" shape="circle" icon={<UserOutlined />} size="large" />
        </Dropdown>
      </div>
    );
  }

  return <Button type="default" shape="circle" icon={<UserOutlined />} size="large" onClick={loginHandler} />;
};