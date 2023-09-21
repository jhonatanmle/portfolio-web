import { redirect } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

import { GraphqlService } from '@/features/core/http-client';
import { createServerSupabaseClient } from '@/supabase';

import { APP_ROUTE_PATHS } from '../app-routes';
import HeaderHome from '../components/header-home';
import Sidebar from '../components/sidebar';

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
    <div className='flex flex-col lg:flex-row h-screen'>
      <Sidebar />
      <div className='flex-1 lg:container'>
        <HeaderHome />
        <main className='p-8 h-full overflow-y-auto'>{children}</main>
      </div>
    </div>
  );
}

export default HomeLayout;
