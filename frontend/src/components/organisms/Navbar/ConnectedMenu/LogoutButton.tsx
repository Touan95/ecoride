import { NavbarLink } from '@/components/atoms/NavbarLink';
import { ROUTES } from '@/configs/routes';
import { useAuthContext } from '@/contexts/auth';

interface LogoutButtonProps {
  burger?: boolean;
}

export const LogoutButton = ({ burger = false }: LogoutButtonProps) => {
  const { clearUser } = useAuthContext();

  return <NavbarLink href={ROUTES.AUTHENTICATION} label="Se déconnecter" onClick={clearUser} variant={!burger ? 'dropdown' : 'default'} />;
};
