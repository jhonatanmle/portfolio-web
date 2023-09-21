'use client';

import { Link } from '@nextui-org/link';
import {
  Navbar as NavbarUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { nanoid } from 'nanoid';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { APP_ROUTE_PATHS } from '../app-routes';

const WEB_NAME = 'Portfolio';

type Color = 'danger' | 'foreground' | undefined;
interface MenuItem {
  id: string;
  title: string;
  path: string;
  color?: Color;
  onClick: (path?: string) => void;
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const supabase = createClientComponentClient();
  const pathname = usePathname();
  const router = useRouter();

  const MENU_ITEMS: MenuItem[] = [
    {
      id: nanoid(),
      title: 'Registros de dividendos',
      path: APP_ROUTE_PATHS.dividendIncome,
      onClick: (path) => onClickMenu(path!),
    },
    {
      id: nanoid(),
      title: 'Historial de compras stock',
      path: APP_ROUTE_PATHS.stockPurchaseHistory,
      onClick: (path) => onClickMenu(path!),
    },
    {
      id: nanoid(),
      title: 'Calendario de Dividendos',
      path: APP_ROUTE_PATHS.dividendCalendar,
      onClick: (path) => onClickMenu(path!),
    },
    {
      id: nanoid(),
      title: 'Cerrar sesión',
      path: '',
      color: 'danger',
      onClick: () => handleSignOut(),
    },
  ];

  const onClickMenu = (pathname: string) => {
    router.push(pathname);
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <NavbarUI
      isBordered
      maxWidth='full'
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent className='sm:hidden' justify='center'>
        <NavbarBrand>
          <p className='font-bold text-inherit'>{WEB_NAME}</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className='hidden sm:flex gap-4'>
        <NavbarBrand>
          <p className='font-bold text-inherit'>{WEB_NAME}</p>
        </NavbarBrand>
        {MENU_ITEMS.map((menu) => (
          <NavbarItem key={menu.id} isActive={pathname === menu.path}>
            <Link
              color={`${menu.color ?? 'foreground'}`}
              onClick={() => menu.onClick(menu.path)}
            >
              {menu.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        {MENU_ITEMS.map((menu) => (
          <NavbarMenuItem key={menu.id}>
            <Link
              className='w-full'
              color={`${menu.color ?? 'foreground'}`}
              onClick={() => menu.onClick(menu.path)}
            >
              {menu.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarUI>
  );
}

export default Navbar;
