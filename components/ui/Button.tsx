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
          'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 hover:scale-105 active:scale-95',
          {
            'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25': variant === 'default',
            'border-2 border-primary bg-transparent text-primary hover:bg-primary/10': variant === 'outline',
            'bg-transparent text-foreground hover:bg-accent/10': variant === 'ghost',
            'text-primary underline-offset-4 hover:underline': variant === 'link',
            'px-8 py-4 text-lg': size === 'lg',
            'px-6 py-3 text-base': size === 'default',
            'px-4 py-2 text-sm': size === 'sm',
            'p-2': size === 'icon',
          },
          className,
        )}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
