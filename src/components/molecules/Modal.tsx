import { Fragment } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';


export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md',
    className,
}: ModalProps) {
    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <Fragment>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={cn(
                                'relative w-full bg-surface rounded-2xl shadow-premium border border-border',
                                sizes[size],
                                className
                            )}
                        >
                            {/* Header */}
                            {title && (
                                <div className="flex items-center justify-between p-6 border-b border-border">
                                    <h2 className="text-2xl font-display font-semibold text-text-primary">
                                        {title}
                                    </h2>
                                    <button
                                        onClick={onClose}
                                        className="text-text-tertiary hover:text-text-primary smooth-transition p-2 rounded-lg hover:bg-surface-hover"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            )}

                            {!title && (
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary smooth-transition p-2 rounded-lg hover:bg-surface-hover z-10"
                                >
                                    <X size={20} />
                                </button>
                            )}

                            {/* Content */}
                            <div className="p-6">
                                {children}
                            </div>

                            {/* Footer */}
                            {footer && (
                                <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
                                    {footer}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </Fragment>
            )}
        </AnimatePresence>
    );
}
