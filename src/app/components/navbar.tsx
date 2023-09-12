'use client';

import React from 'react';
import {
  Navbar as NavbarUI,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';

import { usePathname, useRouter } from 'next/navigation';
import { APP_ROUTE_PATHS } from '../app-routes';

const WEB_NAME = 'Portfolio';

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const onClickMenu = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <NavbarUI disableAnimation isBordered maxWidth='full'>
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent className='sm:hidden pr-3' justify='center'>
        <NavbarBrand>
          <p className='font-bold text-inherit'>{WEB_NAME}</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className='hidden sm:flex gap-4'>
        <NavbarBrand>
          <p className='font-bold text-inherit'>{WEB_NAME}</p>
        </NavbarBrand>
        <NavbarItem isActive={pathname === APP_ROUTE_PATHS.dividendIncome}>
          <Link
            color='foreground'
            onClick={() => onClickMenu(APP_ROUTE_PATHS.dividendIncome)}
          >
            Registros de dividendos
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === APP_ROUTE_PATHS.dividendCalendar}>
          <Link
            color='foreground'
            onClick={() => onClickMenu(APP_ROUTE_PATHS.dividendCalendar)}
          >
            Calendario de Dividendos
          </Link>
        </NavbarItem>
      </NavbarContent>
    </NavbarUI>
  );
}

export default Navbar;
