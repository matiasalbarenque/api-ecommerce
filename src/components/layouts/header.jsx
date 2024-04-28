import { Link } from 'react-router-dom';
import { CartButton } from './header-cart';
import { UserAvatar } from './header-avatar';

export default function Header(props) {
  const { children } = props;
  return (
    <header className="p-3 border-b flex justify-between gap-5">
      <div className="flex items-center">
        <Link to="/">
          <img src="/logo.svg" alt="Logo" width="32" height="32" />
        </Link>
      </div>

      {children}

      <div className="flex gap-4">
        <CartButton />
        <UserAvatar />
      </div>
    </header>
  );
}
