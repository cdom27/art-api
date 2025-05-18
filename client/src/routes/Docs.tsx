import RegisterForm from '../components/forms/RegisterForm';
import SiteLayout from '../layouts/SiteLayout';

export default function Docs() {
  return (
    <SiteLayout>
      <h1 className='text-4xl'>Something about the docs</h1>

      <h2 className='text-3xl'>Generate Key</h2>
      <p>Register your website to generate a public api key</p>

      <RegisterForm />
    </SiteLayout>
  );
}
