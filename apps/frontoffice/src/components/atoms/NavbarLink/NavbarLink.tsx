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

  const textColorClassname = isCurrentPathname ? 'text-secondary-500' : 'text-white hover:text-secondary-500';

  return (
    <Link href={href} className={isCurrentPathname ? 'cursor-default' : 'cursor-pointer'}>
      <Typography variant="h3" weight={isCurrentPathname ? 'bold' : undefined} customClassName={textColorClassname}>
        {label}
      </Typography>
    </Link>
  );
};
