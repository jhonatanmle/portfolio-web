import React from 'react';
import { AuthButton } from './auth-button-client';
import { createServerSupabaseClient } from '@/supabase';

export const AuthButtonServer = async () => {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <AuthButton session={session} />;
};
