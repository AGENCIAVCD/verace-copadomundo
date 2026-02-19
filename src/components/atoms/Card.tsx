import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
    clickable?: boolean;
    hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, clickable = false, hover = true, children, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn(
                    'bg-surface rounded-xl border border-border p-6 smooth-transition',
                    hover && 'hover:border-border-light',
                    clickable && 'cursor-pointer hover:shadow-medium active:scale-[0.99]',
                    className
                )}
                {...(clickable
                    ? {
                          whileHover: { y: -2 },
                          whileTap: { scale: 0.99 },
                      }
                    : {})}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

Card.displayName = 'Card';
