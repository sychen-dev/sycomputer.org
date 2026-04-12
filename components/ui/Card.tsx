import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glass?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = true, glass = true, children, ...props }, ref) => {
    return (
      <motion.div
        whileHover={hoverable ? { scale: 1.02, y: -5 } : {}}
        className={cn(
          'rounded-2xl border border-border transition-all',
          {
            'glass hover:border-primary/30 hover-lift': glass,
            'bg-card': !glass,
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export { Card };