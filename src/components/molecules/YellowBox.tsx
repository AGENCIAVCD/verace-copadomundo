import type { ReactNode } from 'react';

export interface YellowBoxProps {
    label: string;
    value: string;
    className?: string;
    children?: ReactNode;
}

export function YellowBox({
    label,
    value,
    className = '',
    children,
}: YellowBoxProps) {
    return (
        <div
            className={`px-8 py-6 bg-transparent border-4 border-[#FFB500] rounded-2xl ${className}`}
        >
            {children || (
                <div className="flex items-center justify-center gap-4">
                    <span className="text-2xl font-bold text-[#FFB500] uppercase">
                        {label}
                    </span>
                    <span className="text-4xl font-extrabold text-white">
                        {value}
                    </span>
                </div>
            )}
        </div>
    );
}
