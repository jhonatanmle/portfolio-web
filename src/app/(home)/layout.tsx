import { createServerSupabaseClient } from '@/supabase';
import { redirect } from 'next/navigation';
import React, { PropsWithChildren } from 'react';
import { APP_ROUTE_PATHS } from '../app-routes';
import Navbar from '@/app/components/navbar';
import { GraphqlService } from '@/features/core/http-client';

async function HomeLayout({ children }: PropsWithChildren) {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) {
    redirect(APP_ROUTE_PATHS.signIn);
  }

  try {
    const { data: tokenData } = await supabase
      .from('externalToken')
      .select('token');

    GraphqlService.setToken(tokenData?.at(-1)?.token);
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <Navbar />
      <main className='mt-4 px-6 md:px-4'>{children}</main>
    </>
  );
}

export default HomeLayout;
