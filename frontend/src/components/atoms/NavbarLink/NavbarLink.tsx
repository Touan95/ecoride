'use client';

import Link from 'next/link';
import { Typography } from '@/components/atoms/Typography';
import { usePathname } from 'next/navigation';
import clsxm from '@/utils/clsxm';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface NavbarLinkProps {
  href: string;
  label: string;
  variant?: 'default' | 'dropdown';
  onClick?: () => void;
}

export const NavbarLink = ({ href, label, variant = 'default', onClick }: NavbarLinkProps) => {
  const pathname = usePathname();

  const isCurrentPathname = pathname === href;

  const textColor = variant === 'default' ? 'white' : 'black';

  const EmptyWrapper = ({ children }: { children: React.ReactNode }) => <>{children}</>;

  const Wrapper = variant === 'default' ? EmptyWrapper : DropdownMenuItem;

  return (
    <Wrapper asChild>
      <Link href={href} className={clsxm([isCurrentPathname ? 'cursor-default' : 'cursor-pointer', 'flex w-fit'])} onClick={onClick}>
        <Typography
          color={isCurrentPathname ? 'secondary' : textColor}
          variant="h3"
          weight={isCurrentPathname ? 'bold' : undefined}
          customClassName="hover:text-secondary-500"
        >
          {label}
        </Typography>
      </Link>
    </Wrapper>
  );
};
