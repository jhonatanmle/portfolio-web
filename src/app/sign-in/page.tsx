import React from 'react';
import { AuthButtonServer } from '../components/auth-button-server';

const Page = () => {
  return (
    <section className='grid place-content-center min-h-screen'>
      <h1 className='text-xl font-bold mb-4'>Inicia sesión</h1>
      <AuthButtonServer />
    </section>
  );
};

export default Page;
