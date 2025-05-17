import { NavbarLink } from '@/components/atoms/NavbarLink';
import { ROUTES } from '@/configs/routes';
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
      {isDriver && <NavbarLink href={ROUTES.RIDE_ADD} label="Conduire" variant={burger ? 'default' : 'dropdown'} />}
      <NavbarLink href={ROUTES.USER_ACCOUNT} label="Préférences" variant={burger ? 'default' : 'dropdown'} />
      <NavbarLink href={ROUTES.USER_ACCOUNT_RIDES} label="Mes trajets" variant={burger ? 'default' : 'dropdown'} />
      {(isAdmin || isStaff) && <div className={clsxm('border-b w-full', burger && 'border-white')} />}
      {isAdmin && <NavbarLink href={ROUTES.ADMIN_DASHBOARD} label="Administrateur" variant={burger ? 'default' : 'dropdown'} />}
      {isStaff && <NavbarLink href={ROUTES.STAFF_DASHBOARD} label="Employé" variant={burger ? 'default' : 'dropdown'} />}
      <div className={clsxm('border-b w-full', burger && 'border-white')} />
    </>
  );
};
