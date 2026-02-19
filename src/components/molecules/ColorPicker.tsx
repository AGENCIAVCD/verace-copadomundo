import { HexColorPicker } from 'react-colorful';

export interface ColorPickerProps {
    label: string;
    color: string;
    onChange: (color: string) => void;
    className?: string;
    compact?: boolean;
}

export function ColorPicker({
    label,
    color,
    onChange,
    className = '',
    compact = false,
}: ColorPickerProps) {
    if (compact) {
        return (
            <div className={`space-y-1 ${className}`}>
                <label className="block text-xs font-medium text-text-secondary">
                    {label}
                </label>
                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded-md border border-border shadow-sm"
                        style={{ backgroundColor: color }}
                    />
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => onChange(e.target.value)}
                        className="flex-1 px-2 py-1.5 bg-surface text-text-primary border border-border rounded-md text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="#000000"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={`space-y-2 ${className}`}>
            <label className="block text-sm font-medium text-text-secondary">
                {label}
            </label>
            <div className="space-y-3">
                {/* Color preview */}
                <div className="flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-lg border-2 border-border shadow-sm"
                        style={{ backgroundColor: color }}
                    />
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => onChange(e.target.value)}
                        className="flex-1 px-3 py-2 bg-surface text-text-primary border border-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="#000000"
                    />
                </div>

                {/* Hex color picker */}
                <div className="rounded-lg overflow-hidden border border-border">
                    <HexColorPicker color={color} onChange={onChange} style={{ width: '100%' }} />
                </div>
            </div>
        </div>
    );
}
