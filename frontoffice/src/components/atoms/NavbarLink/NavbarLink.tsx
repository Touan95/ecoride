'use client';

import Link from 'next/link';
import { Typography } from '@/components/atoms/Typography';
import { usePathname } from 'next/navigation';
import clsxm from '@/utils/clsxm';

interface NavbarLinkProps {
  href: string;
  label: string;
  variant?: 'default' | 'dropdown'
}

export const NavbarLink = ({ href, label, variant = 'default' }: NavbarLinkProps) => {
  const pathname = usePathname();

  const isCurrentPathname = pathname === href;

  const textColor = variant === 'default' ? 'white' : 'black'

  return (
    <Link href={href} className={clsxm([isCurrentPathname ? 'cursor-default' : 'cursor-pointer', 'flex w-fit'])}>
      <Typography
        color={isCurrentPathname ? 'secondary' : textColor}
        variant="h3"
        weight={isCurrentPathname ? 'bold' : undefined}
        customClassName="hover:text-secondary-500"
      >
        {label}
      </Typography>
    </Link>
  );
};
