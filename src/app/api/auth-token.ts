import { refreshAuthPortfolio } from '@/features/auth-lib/services'
import { AuthPortfolio } from '@/interfaces/AuthPortfolio';

export const regenerateWalletToken = async (refreshToken: string): Promise<AuthPortfolio> => {
  try {
    return await refreshAuthPortfolio(refreshToken);
  } catch (error: any) {
    console.log(error?.message);
    return {
      accessToken: undefined,
      refreshToken: undefined
    };
  }
}