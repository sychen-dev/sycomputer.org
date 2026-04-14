import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glass?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = true, glass = true, children, ...props }, ref) => {
    // 排除與Framer Motion衝突的props
    const {
      onDrag, onDragStart, onDragEnd, onDragEnter, onDragLeave, onDragOver, onDrop,
      onAnimationStart, onAnimationEnd, onAnimationIteration,
      onTransitionEnd,
      ...motionProps
    } = props;

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
        {...motionProps}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export { Card };