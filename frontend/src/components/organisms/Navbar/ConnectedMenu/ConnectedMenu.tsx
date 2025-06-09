'use client';

import * as React from 'react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Typography } from '@/components/atoms/Typography';
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
    <button type="button" className="cursor-pointer w-fit" aria-label="Mon compte">
      <Typography color="white" variant="h3" customClassName="hover:text-secondary-500">
        Mon compte
      </Typography>
    </button>
  );
};

export const ConnectedMenu = ({ username, isDriver, isStaff, isAdmin }: ConnectedMenuProps) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div>
          <AccountButton />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-5 py-2 w-48 bg-primary-300 border-primary-800">
        <div className="flex flex-col items-end gap-2 w-40">
          <Typography variant="cardTitle" color="black" align="right" customClassName="w-full" ellipsis>
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
