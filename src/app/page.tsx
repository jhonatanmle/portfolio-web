import { redirect } from 'next/navigation';
import { APP_ROUTE_PATHS } from './app-routes';

export default function Home() {
  redirect(APP_ROUTE_PATHS.dividendIncome);
}
