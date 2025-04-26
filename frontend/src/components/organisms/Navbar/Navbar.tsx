import { NavbarLink } from '@/components/atoms/NavbarLink';
import SectionContainer from '@/components/layout/SectionContainer';
import { useAuthContext } from '@/contexts/auth';
import Link from 'next/link';
import { ConnectedMenu } from '../ConnectedMenu';
import { UserType } from '@/interfaces/user';

export const Navbar = () => {
  const { user } = useAuthContext();
  const connectedNavbar = !!user;

  return (
    <SectionContainer fluid className="bg-primary-700 sticky top-0 z-1">
      <div className="flex relative justify-between">
        <div className="flex items-center h-full w-full gap-10">
          <Link href="/">
            <img src={'/assets/ecoride-white.png'} alt={'ecoride logo'} className="h-18 p-2 object-cover" />
          </Link>
          <NavbarLink href="/" label="Accueil" />
          <NavbarLink href="/rides" label="Les trajets" />
          <NavbarLink href="/contact" label="Nous contacter" />
          <div className="flex-1" />
          {connectedNavbar ? (
            <ConnectedMenu
              username={user.username}
              isDriver={user.type !== UserType.PASSENGER}
              isStaff={user.isStaff}
              isAdmin={user.isAdmin}
            />
          ) : (
            <NavbarLink href="/login" label="Se connecter" />
          )}
        </div>
      </div>
    </SectionContainer>
  );
};
