import type { SVGProps } from 'react';

export function VoceDigitalLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {/* Speech Bubble */}
            <circle cx="50" cy="45" r="35" fill="#FFB500" />

            {/* Speech Bubble Tail */}
            <path
                d="M 35 72 Q 30 80, 25 90 Q 32 78, 40 75 Z"
                fill="#FFB500"
            />

            {/* Letter V */}
            <path
                d="M 35 30 L 50 60 L 65 30"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </svg>
    );
}
