'use client';

import * as React from 'react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavbarLink } from '@/components/atoms/NavbarLink';
import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import { useAuthContext } from '@/contexts/auth';

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

const LogoutButton = () => {
  const { clearUser } = useAuthContext();

  return (
    <div className={clsxm('flex w-fit')} onClick={clearUser}>
      <Typography color="black" variant="h3" customClassName="hover:text-secondary-500 cursor-pointer">
        Déconnexion
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
          {isDriver && <NavbarLink href="/rides/add" label="Conduire" variant="dropdown" />}
          <NavbarLink href="/user" label="Préférences" variant="dropdown" />
          <NavbarLink href="/user/rides" label="Mes trajets" variant="dropdown" />
          <div className="border-b w-full" />
          {isAdmin && <NavbarLink href="/admin" label="Administrateur" variant="dropdown" />}
          {isStaff && <NavbarLink href="/staff" label="Employé" variant="dropdown" />}
          <div className="border-b w-full" />
          <LogoutButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
