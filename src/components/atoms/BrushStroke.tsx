interface BrushStrokeProps {
    variant?: 'horizontal' | 'vertical' | 'diagonal' | 'curve';
    color?: string;
    opacity?: number;
    position?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right';
    className?: string;
}

export function BrushStroke({
    variant = 'horizontal',
    color = '#FFB500',
    opacity = 1,
    position = 'top',
    className = '',
}: BrushStrokeProps) {
    const getPositionClasses = () => {
        const positions = {
            'top': 'top-0 left-0 right-0',
            'bottom': 'bottom-0 left-0 right-0',
            'left': 'left-0 top-0 bottom-0',
            'right': 'right-0 top-0 bottom-0',
            'top-left': 'top-0 left-0',
            'top-right': 'top-0 right-0',
        };
        return positions[position];
    };

    const getBrushPath = () => {
        switch (variant) {
            case 'horizontal':
                return (
                    <svg
                        viewBox="0 0 1200 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                    >
                        <path
                            d="M0 30 Q 100 10, 200 25 T 400 20 T 600 30 T 800 25 T 1000 30 T 1200 25 L 1200 100 L 0 100 Z"
                            fill={color}
                            opacity={opacity}
                        />
                        <path
                            d="M0 20 Q 150 5, 300 15 T 600 10 T 900 20 T 1200 15 L 1200 80 L 0 80 Z"
                            fill={color}
                            opacity={opacity * 0.7}
                        />
                    </svg>
                );

            case 'diagonal':
                return (
                    <svg
                        viewBox="0 0 200 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                    >
                        <path
                            d="M-20 -20 L220 -20 L150 220 L-20 180 Z"
                            fill={color}
                            opacity={opacity}
                            transform="rotate(-15)"
                        />
                    </svg>
                );

            case 'curve':
                return (
                    <svg
                        viewBox="0 0 300 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                    >
                        <path
                            d="M0 50 Q 75 20, 150 50 T 300 50 L 300 100 L 0 100 Z"
                            fill={color}
                            opacity={opacity}
                        />
                    </svg>
                );

            case 'vertical':
                return (
                    <svg
                        viewBox="0 0 100 1200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                    >
                        <path
                            d="M30 0 Q 10 100, 25 200 T 20 400 T 30 600 T 25 800 T 30 1000 T 25 1200 L 100 1200 L 100 0 Z"
                            fill={color}
                            opacity={opacity}
                        />
                    </svg>
                );
        }
    };

    const getSizeClasses = () => {
        if (variant === 'horizontal') return 'h-20 w-full';
        if (variant === 'vertical') return 'w-20 h-full';
        if (variant === 'diagonal') return 'w-64 h-64';
        return 'w-full h-24';
    };

    return (
        <div
            className={`absolute ${getPositionClasses()} ${getSizeClasses()} pointer-events-none overflow-hidden ${className}`}
            style={{ zIndex: 0 }}
        >
            {getBrushPath()}
        </div>
    );
}
