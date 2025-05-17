import { NavbarLink } from '@/components/atoms/NavbarLink';
import { ROUTES } from '@/configs/routes';

export const NavbarLinks = () => {
  return (
    <>
      <NavbarLink href={ROUTES.HOME} label="Accueil" />
      <NavbarLink href={ROUTES.RIDES} label="Les trajets" />
      <NavbarLink href={ROUTES.CONTACT} label="Nous contacter" />
    </>
  );
};
