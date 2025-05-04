import { NavbarLink } from '@/components/atoms/NavbarLink';
import SectionContainer from '@/components/layout/SectionContainer';
import { useAuthContext } from '@/contexts/auth';
import Link from 'next/link';
import { ConnectedMenu } from './ConnectedMenu';
import { UserType } from '@/interfaces/user';
import { NavbarLinks } from './NavbarLinks';
import { BurgerMenu } from './BurgerMenu';

export const Navbar = () => {
  const { user } = useAuthContext();
  console.log('🚀 ~ user:', user);
  const connectedNavbar = !!user;

  return (
    <SectionContainer fluid className="bg-primary-700 sticky top-0 z-1">
      <div className="hidden md:flex relative justify-between">
        <div className="flex items-center h-full w-full gap-10">
          <Link href="/">
            <img src={'/assets/ecoride-white.png'} alt={'Logo Ecoride'} className="h-18 p-2 object-cover" />
          </Link>
          {<NavbarLinks />}
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
      <div className="md:hidden justify-center flex items-center relative">
        <div className="absolute left-0">
          <BurgerMenu user={user ?? undefined} />
        </div>
        <Link href="/">
          <img src={'/assets/ecoride-white.png'} alt={'Logo Ecoride'} className="h-18 p-2 object-cover" />
        </Link>
      </div>
    </SectionContainer>
  );
};
