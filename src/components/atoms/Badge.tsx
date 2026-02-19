import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
import type { ProposalStatus } from '../../lib/types';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: ProposalStatus | 'default';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
    const variants = {
        draft: 'bg-text-muted/20 text-text-secondary border-text-muted/30',
        sent: 'bg-primary/20 text-primary-400 border-primary/30',
        closed: 'bg-success/20 text-success border-success/30',
        default: 'bg-surface text-text-secondary border-border',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
