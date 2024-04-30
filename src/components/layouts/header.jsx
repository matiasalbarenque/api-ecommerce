import { Link } from 'react-router-dom';
import { CartButton } from './header-cart';
import { UserAvatar } from './header-avatar';

export default function Header(props) {
  const { children } = props;
  return (
    <header className="p-3 bg-white border-b flex justify-between gap-5 sticky top-0 z-10">
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
