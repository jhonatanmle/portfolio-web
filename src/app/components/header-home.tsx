'use client';

import { Button } from '@nextui-org/button';
import { IconMenu } from '@tabler/icons-react';

import { useHomeStore } from '../store/home-store';

export default function HeaderHome() {
  const { setShowSidebar, showSidebar } = useHomeStore((state) => ({
    setShowSidebar: state.setShowSidebar,
    showSidebar: state.showSidebar,
  }));

  const onButtonClick = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <header>
      <div className='flex lg:hidden items-center min-h-[76px] px-6 border-b-1 border-gray-700'>
        <Button
          isIconOnly
          color='default'
          variant='light'
          onClick={onButtonClick}
        >
          <IconMenu />
        </Button>
      </div>
    </header>
  );
}
