import { Link } from 'react-router';
import Logo from '../../assets/logo.webp';

export default function Header() {
  return (
    <header className='flex items-center px-3 py-6 justify-between'>
      <div className='flex items-center gap-2'>
        <img src={Logo} className='size-6 rounded-xs' />
        <Link to='/'>IAA</Link>
      </div>

      <nav className='flex items-center gap-4'>
        <Link
          className='github-button'
          to='https://github.com/cdom27/influential-artists-api'
          data-color-scheme='no-preference: dark; light: dark; dark: dark;'
          data-icon='octicon-star'
          data-size='large'
          aria-label='Star cdom27/influential-artists-api on GitHub'
        >
          Star on GitHub
        </Link>
      </nav>
    </header>
  );
}
