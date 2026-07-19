import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-accent text-on-accent hover:bg-accent-strong': variant === 'default',
            'border border-line bg-transparent text-ink hover:border-soft': variant === 'outline',
            'bg-transparent text-soft hover:text-ink': variant === 'ghost',
            'text-accent underline-offset-4 hover:underline': variant === 'link',
            'px-6 py-3 text-base': size === 'lg',
            'px-5 py-2.5 text-[15px]': size === 'default',
            'px-3.5 py-2 text-sm': size === 'sm',
            'p-2.5': size === 'icon',
          },
          className,
        )}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
