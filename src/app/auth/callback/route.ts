import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { signInPortfolio } from '@/features/auth-lib/services';

// esto es una opción de Next.js, para evitar que cachee de forma
// estática la ruta, y que siempre se ejecute en el servidor
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get('code');

  if (code !== null) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);

    const { accessToken, refreshToken } = await signInPortfolio(
      process.env.USER_ID!,
      process.env.USER_RECOVERY_CODE!
    );

    const cookieStore = cookies();
    cookieStore.set('token', accessToken!);
    cookieStore.set('refreshToken', refreshToken!);
  }

  return NextResponse.redirect(requestUrl.origin);
}
