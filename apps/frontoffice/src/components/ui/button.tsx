import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsxm from '@/utils/clsxm';

const buttonVariants = cva(
  'cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-primary-400 shadow hover:bg-primary-900',
        secondary: 'bg-secondary-600 shadow hover:bg-secondary-900',
        tertiary: 'bg-tertiary-600 shadow hover:bg-tertiary-900'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-full px-3',
        lg: 'h-10 rounded-full px-8',
        icon: 'h-9 w-9'
      }
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLDivElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children: React.ReactNode;
}

const Button = ({ className, variant = 'primary', size = 'default', children, ...props }: ButtonProps) => {
  return (
    <div className={clsxm(buttonVariants({ variant, size, className }))} {...props}>
      {children}
    </div>
  );
};
Button.displayName = 'Button';

export { Button, buttonVariants };
