'use client';

import * as React from 'react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import { ConnectedLinks } from './ConnectedLinks';
import { LogoutButton } from './LogoutButton';

interface ConnectedMenuProps {
  username: string;
  isDriver: boolean;
  isStaff: boolean;
  isAdmin: boolean;
}

const AccountButton = () => {
  return (
    <div className={clsxm('flex w-fit')}>
      <Typography color="white" variant="h3" customClassName="hover:text-secondary-500 cursor-pointer">
        Mon compte
      </Typography>
    </div>
  );
};

export const ConnectedMenu = ({ username, isDriver, isStaff, isAdmin }: ConnectedMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <AccountButton />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-5 py-2 w-48 bg-primary-300 border-primary-800">
        <div className="flex flex-col items-end gap-2">
          <Typography variant="cardTitle" color="black" align="right">
            {username}
          </Typography>
          <div className="border-b w-full" />
          <ConnectedLinks isDriver={isDriver} isAdmin={isAdmin} isStaff={isStaff} />
          <LogoutButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
