import { Link } from 'react-router';
import Logo from '../../assets/logo.webp';

export default function Header() {
  const navLinks = [
    {
      name: 'Explore',
      href: '/explore',
    },
    {
      name: 'Developers',
      href: '/docs',
    },
    {
      name: 'About',
      href: '/about',
    },
  ];

  return (
    <header className='flex items-center px-3 py-6 justify-between'>
      <div className='flex items-center gap-2'>
        <img src={Logo} className='size-6 rounded-xs' />
        <Link to='/'>IAA</Link>
      </div>

      <nav className='flex items-center gap-4'>
        {navLinks.map((link) => {
          return (
            <Link key={link.name} to={link.href}>
              {link.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
