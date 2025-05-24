'use client';

import { inputClassname } from '@/components/ui/input';
import clsxm from '@/utils/clsxm';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import React from 'react';
import { useState } from 'react';
import { TbEye, TbEyeOff } from 'react-icons/tb';

dayjs.locale('fr');

const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(({ className, placeholder, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const Icon = showPassword ? TbEyeOff : TbEye;

  return (
    <div className="relative flex items-center gap-2">
      <input
        type={showPassword ? 'text' : 'password'}
        className={clsxm(inputClassname, className)}
        ref={ref}
        {...props}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <Icon
        className="cursor-pointer absolute right-2 text-primary-900"
        size={20}
        onClick={togglePasswordVisibility}
        role="button"
        aria-label="Afficher le mot de passe"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            togglePasswordVisibility();
          }
        }}
      />
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
