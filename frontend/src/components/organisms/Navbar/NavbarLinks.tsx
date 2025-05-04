import { NavbarLink } from '@/components/atoms/NavbarLink';

export const NavbarLinks = () => {
  return (
    <>
      <NavbarLink href="/" label="Accueil" />
      <NavbarLink href="/rides" label="Les trajets" />
      <NavbarLink href="/contact" label="Nous contacter" />
    </>
  );
};
