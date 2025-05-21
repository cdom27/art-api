import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RegisterDomainSchema,
  type RegisterDomainData,
} from '../../lib/registerDomainSchema';
import useRegister from '../../hooks/useRegister';

export default function RegisterForm() {
  const { registerDomain, pubKey, isLoading, respMessage } = useRegister();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterDomainData>({
    resolver: zodResolver(RegisterDomainSchema),
  });

  const onSubmit = async (data: RegisterDomainData) => {
    await registerDomain(data.domain);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 max-w-sm'
    >
      <label htmlFor='domain' className='font-medium'>
        Your Domain
      </label>
      <input
        {...register('domain')}
        type='url'
        id='domain'
        className='border border-gray-300 p-2 rounded'
        placeholder='https://cidominguez.com'
      />
      {errors.domain && (
        <span className='text-red-500 text-sm'>{errors.domain.message}</span>
      )}

      <button
        type='submit'
        className='bg-black text-white py-2 px-4 rounded-sm disabled:opacity-50'
        disabled={isLoading}
      >
        {isLoading ? 'Generating Key...' : 'Generate Key'}
      </button>

      {respMessage && <p className='text-red-500'>{respMessage}</p>}
      {pubKey && <p className='text-green-600 break-all'>🔑 {pubKey}</p>}
    </form>
  );
}
