import { Link } from 'react-router';
import Logo from '../../assets/logo.webp';
import Gh from '../../assets/gh.svg';

export default function Footer() {
  return (
    <footer className='flex items-center px-3 py-6 justify-between font-medium'>
      <div className='flex items-center gap-2'>
        <img src={Logo} className='size-6 rounded-xs' />
        <Link to='/' className='font-bold text-xl'>
          IAA
        </Link>
      </div>

      <div className='flex items-center gap-4'>
        <Link
          to='https://github.com/cdom27/influential-artists-api'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-primary text-secondary flex items-center gap-2 text-sm py-2 px-4 rounded-sm'
        >
          <img src={Gh} className='size-5' />
          <span>View Code</span>
        </Link>
      </div>
    </footer>
  );
}
