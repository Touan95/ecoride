import { NavbarLink } from '@/components/atoms/NavbarLink';
import clsxm from '@/utils/clsxm';

interface ConnectedLinksProps {
  isDriver?: boolean;
  isAdmin?: boolean;
  isStaff?: boolean;
  burger?: boolean;
}

export const ConnectedLinks = ({ isDriver, isAdmin, isStaff, burger = false }: ConnectedLinksProps) => {
  return (
    <>
      {isDriver && <NavbarLink href="/rides/add" label="Conduire" variant={burger ? 'default' : 'dropdown'} />}
      <NavbarLink href="/user" label="Préférences" variant={burger ? 'default' : 'dropdown'} />
      <NavbarLink href="/user/rides" label="Mes trajets" variant={burger ? 'default' : 'dropdown'} />
      {(isAdmin || isStaff) && <div className={clsxm('border-b w-full', burger && 'border-white')} />}
      {isAdmin && <NavbarLink href="/admin" label="Administrateur" variant={burger ? 'default' : 'dropdown'} />}
      {isStaff && <NavbarLink href="/staff" label="Employé" variant={burger ? 'default' : 'dropdown'} />}
      <div className={clsxm('border-b w-full', burger && 'border-white')} />
    </>
  );
};
