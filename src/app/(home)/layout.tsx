import { createServerSupabaseClient } from '@/supabase';
import { redirect } from 'next/navigation';
import React, { PropsWithChildren } from 'react';
import { APP_ROUTE_PATHS } from '../app-routes';
import Navbar from '@/app/components/navbar';

async function HomeLayout({ children }: PropsWithChildren) {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) {
    redirect(APP_ROUTE_PATHS.signIn);
  }

  return (
    <>
      <Navbar />
      <main className='mt-4'>{children}</main>
    </>
  );
}

export default HomeLayout;
