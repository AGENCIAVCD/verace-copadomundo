import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            icon,
            iconPosition = 'left',
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const baseStyles =
            'inline-flex items-center justify-center gap-2 font-medium smooth-transition rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none';

        const variants = {
            primary:
                'bg-primary text-white hover:bg-primary-600 active:bg-primary-700 shadow-md hover:shadow-glow',
            secondary:
                'bg-surface text-text-primary hover:bg-surface-hover active:bg-surface-active border border-border',
            ghost:
                'text-text-primary hover:bg-surface active:bg-surface-hover',
            danger:
                'bg-error text-white hover:bg-error-hover active:bg-red-700 shadow-md',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-base',
            lg: 'px-6 py-3 text-lg',
        };

        return (
            <motion.button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={disabled || isLoading}
                whileTap={{ scale: 0.98 }}
                {...props}
            >
                {isLoading && (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                )}
                {!isLoading && icon && iconPosition === 'left' && icon}
                {children}
                {!isLoading && icon && iconPosition === 'right' && icon}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';
