import clsxm from '@/utils/clsxm';
import * as React from 'react';

export const inputClassname =
  'flex h-9 w-full text-primary-900 rounded-full bg-white py-2 px-4 shadow-sm transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-sm';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={clsxm(inputClassname, className)}
      ref={ref}
      {...props}
      aria-label={props['aria-label'] ?? props.placeholder}
    />
  );
});
Input.displayName = 'Input';

export { Input };
