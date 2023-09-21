import React from 'react';

import { createServerSupabaseClient } from '@/supabase';

import { AuthButton } from './auth-button-client';

export const AuthButtonServer = async () => {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <AuthButton session={session} />;
};
