/**
 * v0 by Vercel.
 * @see https://v0.dev/t/dfJTEUFJ2m5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { NavbarLink } from '@/components/atoms/NavbarLink';
import { ConnectedLinks } from '../ConnectedMenu/ConnectedLinks';
import { LoggedUser, UserType } from '@/interfaces/user';
import { NavbarLinks } from '../NavbarLinks';
import { TbMenu2, TbX } from 'react-icons/tb';
import { LogoutButton } from '../ConnectedMenu/LogoutButton';
import { ROUTES } from '@/configs/routes';

interface BurgerMenuProps {
  user?: LoggedUser;
}

export const BurgerMenu = ({ user }: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const connectedNavbar = !!user;

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div>
        <Button variant="outline" size="icon" className="text-white" onClick={onToggle}>
          {isOpen ? <TbX className="h-6 w-6" /> : <TbMenu2 className="h-6 w-6 text-white" />}
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </div>
      {isOpen && (
        <div className="absolute -left-10 mt-[18px] h-screen w-screen bg-primary-700 dark:bg-gray-800 p-10" onClick={onCloseMenu}>
          <div className="grid gap-4 py-4">
            <NavbarLinks />
            <div className="flex-1" />
            {connectedNavbar ? (
              <>
                <div className="border-b w-full border-white" />
                <ConnectedLinks isDriver={user.type !== UserType.PASSENGER} isStaff={user.isStaff} isAdmin={user.isAdmin} burger={true} />
                <LogoutButton burger={true} />
              </>
            ) : (
              <NavbarLink href={ROUTES.AUTHENTICATION} label="Se connecter" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
