import { Link } from 'react-router';
import RegisterForm from '../components/forms/RegisterForm';
import SiteLayout from '../layouts/SiteLayout';

export default function Home() {
  return (
    <SiteLayout>
      <div className='flex flex-col gap-4'>
        <h1 className='text-4xl'>Artist API 🖼️</h1>

        <p>
          Artist API is a free and lightweight RESTful Web API that provides
          structured information about 50 of the most influential artists in
          history, along with selected public domain artworks. <br />
          <br />
          Developers can access detailed artist bios, artwork data, and run
          keyword-based search queries. Whether you&apos;re building educational
          apps, creative galleries, or simply experimenting, this API is a
          reliable resource. You can get started by generating a free public API
          key below. No sign-in or credit card required.
        </p>
      </div>

      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl'>Generate Key</h2>

        <p>Register your domain to generate a public api key.</p>

        <RegisterForm />
      </div>

      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl'>API Information</h2>

        <ul className='list-disc px-3 space-y-2'>
          <li>
            <span className='font-bold'>Version</span>: <span>v1</span>
          </li>

          <li>
            <span className='font-bold'>Base Url</span>:{' '}
            <code className='bg-[#EAEAEA] border-[1px] border-[#D2D2D2] px-4 py-2 rounded-sm'>
              https://art.cidominguez.com/api/v1
            </code>
          </li>

          <li>
            <span className='font-bold'>Authentication</span>:{' '}
            <span>
              Requires a free API key. Include it in the request header as
              'x-api-key'.
            </span>
          </li>

          <li>
            <span className='font-bold'>Rate limiting</span>:
            <ul className='list-disc pl-3'>
              <li>
                <span>200 requests per 15 minutes</span>
              </li>

              <li>
                <span>
                  After 75 requests, a delay of up to 3 seconds per request is
                  applied
                </span>
              </li>
            </ul>
          </li>

          <li>
            <span className='font-bold'>Image Licensing</span>:{' '}
            <span>All images served are from the public domain.</span>
          </li>

          <li>
            <span className='font-bold'>Search</span>:{' '}
            <span>
              Currently supports{' '}
              <span className='font-bold'>keyword-based</span> filtering.
              Full-text search is planned for v2. If you use this API in a
              public or production setting, please consider linking to our repo
              for credit.
            </span>
          </li>
        </ul>

        <p>
          We welcome contributions in the form of data collection (public domain
          only) or code improvements <br /> <br />
          Visit our{' '}
          <Link
            to='https://github.com/cdom27/influential-artists-api'
            target='_blank'
            rel='noopener noreferrer'
            className='text-accent-primary underline'
          >
            GitHub repo
          </Link>{' '}
          for detailed information regarding available endpoints, basic usage,
          and detailed examples meanwhile our docs page is built. Thank you.
        </p>
      </div>
    </SiteLayout>
  );
}
