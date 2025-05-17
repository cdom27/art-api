import SiteLayout from '../layouts/SiteLayout';

export default function Docs() {
  return (
    <SiteLayout>
      <h1 className='text-4xl'>Something about the docs</h1>

      <h2 className='text-3xl'>Generate Key</h2>
      <p>Register your website to generate a public api key</p>

      <form className='flex items-center gap-2'>
        <label htmlFor='url'>Your website</label>

        <input
          type='url'
          id='url'
          name='url'
          placeholder='https://cidominguez.com'
          className='border-2 border-black'
        />

        <button type='submit' className='bg-black text-white py-1 px-3'>
          Generate Key
        </button>
      </form>
    </SiteLayout>
  );
}
