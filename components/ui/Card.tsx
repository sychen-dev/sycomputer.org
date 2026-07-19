import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          'rounded-lg border border-line bg-card',
          hoverable &&
            'transition-all duration-200 hover:-translate-y-0.5 hover:border-soft hover:shadow-[0_12px_32px_-16px_rgb(0_0_0/0.25)]',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

export { Card };
