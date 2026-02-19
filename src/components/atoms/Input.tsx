import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, icon, id, ...props }, ref) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-text-primary mb-1.5"
                    >
                        {label}
                    </label>
                )}

                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
                            {icon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            'w-full px-4 py-2.5 bg-surface text-text-primary border rounded-lg',
                            'smooth-transition focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                            'placeholder:text-text-muted disabled:opacity-50 disabled:cursor-not-allowed',
                            error
                                ? 'border-error focus:ring-error'
                                : 'border-border hover:border-border-light',
                            icon && 'pl-10',
                            className
                        )}
                        {...props}
                    />
                </div>

                {error && (
                    <p className="mt-1.5 text-sm text-error">{error}</p>
                )}

                {helperText && !error && (
                    <p className="mt-1.5 text-sm text-text-tertiary">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
