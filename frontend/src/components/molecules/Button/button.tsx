import * as React from 'react';
import clsxm from '@/utils/clsxm';
import { outfit } from '@/components/atoms/FontInitializer';
import { Typography } from '@/components/atoms/Typography';

type ButtonColor = 'primary' | 'secondary' | 'tertiary';
type ButtonVariant = 'solid' | 'outlined';
export interface ButtonProps {
  className?: string;
  children: string | React.ReactNode;
  color?: ButtonColor;
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
}
export interface GetTextColorProps {
  color?: ButtonColor;
  variant?: ButtonVariant;
}

const getTextColor = ({ color, variant }: GetTextColorProps) => {
  if (variant === 'solid') {
    return 'white';
  }
  return color;
};

export const Button = ({ className, type = 'button', disabled, onClick, color = 'primary', variant = 'solid', children }: ButtonProps) => {
  const textColor = getTextColor({ color, variant });
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsxm([
        'h-9 px-4 py-2 text-white shadow cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-offset-2 focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        disabled && 'cursor-not-allowed',
        [
          color === 'primary' && variant === 'solid' && !disabled && 'bg-primary-700 hover:bg-secondary-500',
          color === 'secondary' && variant === 'solid' && !disabled && 'bg-secondary-600 hover:bg-secondary-900',
          color === 'tertiary' && variant === 'solid' && !disabled && 'bg-tertiary-600 hover:bg-tertiary-900',
          color === 'primary' && variant === 'outlined' && !disabled && 'text-primary-900 border hover:bg-secondary-300'
        ],
        [
          color === 'primary' && variant === 'solid' && disabled && 'bg-primary-800',
          color === 'secondary' && variant === 'solid' && disabled && 'bg-secondary-900',
          color === 'tertiary' && variant === 'solid' && disabled && 'bg-tertiary-900',
          color === 'primary' && variant === 'outlined' && disabled && 'text-primary-900'
        ],
        `${outfit.variable} font-outfit`,
        className
      ])}
    >
      <Typography align="center" variant="cardTitleSm" color={textColor} tag="p" customClassName={disabled ? 'opacity-70' : undefined}>
        {children}
      </Typography>
    </button>
  );
};
