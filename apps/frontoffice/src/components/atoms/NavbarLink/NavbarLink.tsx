'use client';

import Link from 'next/link';
import { Typography } from '@/components/atoms/Typography';
import { usePathname } from 'next/navigation';

interface NavbarLinkProps {
  href: string;
  label: string;
}

export const NavbarLink = ({ href, label }: NavbarLinkProps) => {
  const pathname = usePathname();

  const isCurrentPathname = pathname === href;

  return (
    <Link href={href} className={isCurrentPathname ? 'cursor-default' : 'hover:text-secondary-500'}>
      <Typography variant="h3" weight={isCurrentPathname ? 'bold' : undefined}>
        {label}
      </Typography>
    </Link>
  );
};
