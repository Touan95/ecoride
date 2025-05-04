import { NavbarLink } from '@/components/atoms/NavbarLink';
import { useAuthContext } from '@/contexts/auth';

interface LogoutButtonProps {
  burger?: boolean;
}

export const LogoutButton = ({ burger = false }: LogoutButtonProps) => {
  const { clearUser } = useAuthContext();

  return <NavbarLink href="/login" label="Se déconnecter" onClick={clearUser} variant={!burger ? 'dropdown' : 'default'} />;
};
