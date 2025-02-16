import { NavbarLink } from '@/components/atoms/NavbarLink';
import SectionContainer from '@/components/layout/SectionContainer';
import { useAuthContext } from '@/contexts/auth';
import Link from 'next/link';
import { ConnectedMenu } from '../ConnectedMenu';

export const Navbar = () => {
  const {isLogged, clearUser, user} = useAuthContext()
  const connectedNavbar = isLogged && user

  return (
    <SectionContainer fluid className="bg-primary-700 sticky top-0 z-1">
      <div className="flex relative justify-between">
        <div className="flex items-center h-full w-full gap-10">
          <Link href="/">
            <img src={'/assets/logo.png'} alt={'ecoride logo'} className="h-20 w-20 object-cover" />
          </Link>
          <NavbarLink href="/" label="Accueil" />
          <NavbarLink href="/rides" label="Les trajets" />
          <NavbarLink href="/contact" label="Nous contacter" />
          <div className="flex-1" />
          { connectedNavbar ?  <ConnectedMenu username={user.username}/> : <NavbarLink href="/login" label="Se connecter" />}
        </div>
      </div>
    </SectionContainer>
  );
};
