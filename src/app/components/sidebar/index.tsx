'use client';

import { Button } from '@nextui-org/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  IconCalendar,
  IconChartPie2,
  IconCoins,
  IconLogout2,
  IconShoppingCart,
  IconWallet,
} from '@tabler/icons-react';
import { nanoid } from 'nanoid';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useMemo } from 'react';

import { APP_ROUTE_PATHS } from '@/app/app-routes';
import { useHomeStore } from '@/app/store/home-store';

type Color = 'danger' | 'foreground' | undefined;

interface MenuItem {
  id: string;
  title: string;
  path: string;
  color?: Color;
  icon: ReactNode;
  onClick: (path?: string) => void;
}

interface Props {
  className?: string;
  show?: boolean;
}

const SIDEBAR_WIDTH = 280;

export default function Sidebar({ className = '' }: Props) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const pathname = usePathname();
  const { setShowSidebar, showSidebar } = useHomeStore((state) => ({
    showSidebar: state.showSidebar,
    setShowSidebar: state.setShowSidebar,
  }));

  const sidebarPosition = useMemo(() => {
    if (!showSidebar) {
      return -SIDEBAR_WIDTH;
    }

    return 0;
  }, [showSidebar]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const MENU_ITEMS: MenuItem[] = [
    {
      id: nanoid(),
      title: 'Dividendos',
      path: APP_ROUTE_PATHS.dividendIncome,
      icon: <IconCoins stroke={1} />,
      onClick: (path) => onClickMenu(path!),
    },
    {
      id: nanoid(),
      title: 'Cartera',
      path: APP_ROUTE_PATHS.wallet,
      icon: <IconChartPie2 stroke={1} />,
      onClick: (path) => onClickMenu(path!),
    },
    {
      id: nanoid(),
      title: 'Compras Stock',
      path: APP_ROUTE_PATHS.stockPurchaseHistory,
      icon: <IconShoppingCart stroke={1} />,
      onClick: (path) => onClickMenu(path!),
    },
    {
      id: nanoid(),
      title: 'Calendario',
      path: APP_ROUTE_PATHS.dividendCalendar,
      icon: <IconCalendar stroke={1} />,
      onClick: (path) => onClickMenu(path!),
    },
    {
      id: nanoid(),
      title: 'Cerrar sesión',
      path: '',
      color: 'danger',
      icon: <IconLogout2 stroke={1} />,
      onClick: handleSignOut,
    },
  ];

  const onClickMenu = (pathname: string) => {
    router.push(pathname);
    setShowSidebar(false);
  };

  return (
    <>
      <div
        style={{
          transform: `translateX(${sidebarPosition}px)`,
        }}
        className={`${className} block lg:hidden absolute lg:static transition-all h-full  z-10 bg-black`}
      >
        <aside className={`w-[280px] border-r-1 h-full border-gray-700 p-6`}>
          <div className='flex justify-start items-center gap-x-2 px-4'>
            <IconWallet stroke={1} />
            <h1 className='text-xl text-center'>Portafolio {showSidebar}</h1>
          </div>
          <nav className='mt-10'>
            <ul className='flex flex-col gap-y-4'>
              {MENU_ITEMS.map((menu) => (
                <li key={menu.id}>
                  <Button
                    color={pathname === menu.path ? 'primary' : 'default'}
                    variant={pathname === menu.path ? 'shadow' : 'light'}
                    className='justify-start '
                    fullWidth
                    startContent={menu.icon}
                    onClick={() => menu.onClick(menu.path)}
                  >
                    {menu.title}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
      {showSidebar ? (
        <div
          className='fixed inset-0'
          onClick={() => {
            setShowSidebar(false);
          }}
        ></div>
      ) : null}
      <aside
        className={`w-[280px] hidden lg:block border-r-1 h-full border-gray-700 p-6`}
      >
        <div className='flex justify-start items-center gap-x-2 px-4'>
          <IconWallet stroke={1} />
          <h1 className='text-xl text-center'>Portafolio {showSidebar}</h1>
        </div>
        <nav className='mt-10'>
          <ul className='flex flex-col gap-y-4'>
            {MENU_ITEMS.map((menu) => (
              <li key={menu.id}>
                <Button
                  color={pathname === menu.path ? 'primary' : 'default'}
                  variant={pathname === menu.path ? 'shadow' : 'light'}
                  className='justify-start '
                  fullWidth
                  startContent={menu.icon}
                  onClick={() => menu.onClick(menu.path)}
                >
                  {menu.title}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
