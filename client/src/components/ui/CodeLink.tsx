import { Link } from 'react-router';

export default function CodeLink() {
  return (
    <Link
      to='https://github.com/cdom27/influential-artists-api'
      target='_blank'
      rel='noopener noreferrer'
    >
      <span>View Code</span>
    </Link>
  );
}
