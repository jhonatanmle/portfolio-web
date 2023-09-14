import { signInPortfolio } from '@/features/auth-lib/services';
import { GraphqlService } from '@/features/core/http-client';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

// esto es una opción de Next.js, para evitar que cachee de forma
// estática la ruta, y que siempre se ejecute en el servidor
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get('code');

  if (code !== null) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);

    const userData = await signInPortfolio(
      process.env.NEXT_PUBLIC_USER_ID!,
      process.env.NEXT_PUBLIC_USER_RECOVERY_CODE!
    );

    await supabase
      .from('externalToken')
      .insert([
        { token: userData.accessToken, refreshToken: userData.refreshToken },
      ])
      .select();
  }

  return NextResponse.redirect(requestUrl.origin);
}
