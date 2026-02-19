import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import type { Slide } from '../../../../lib/types';

export interface NotesSlideProps {
    slide: Slide;
    onUpdate: (content: Slide['content']) => void;
}

export function NotesSlide({ slide, onUpdate }: NotesSlideProps) {
    const [notes, setNotes] = useState(
        slide.content.text || 'Digite suas observações aqui...'
    );

    const backgroundColor = slide.content.backgroundColor || '#FFFFFF';
    const textColor = slide.content.textColor || '#1A1A1A';
    const accentColor = slide.content.accentColor || '#FFB500';

    useEffect(() => {
        setNotes(slide.content.text || 'Digite suas observações aqui...');
    }, [slide.id]);

    const handleBlur = () => {
        onUpdate({ ...slide.content, text: notes });
    };

    return (
        <div
            className="w-full h-full flex flex-col p-12 relative"
            style={{ backgroundColor }}
        >
            {/* Title */}
            <h2
                className="text-4xl font-display font-bold mb-2 text-center"
                style={{ color: textColor }}
            >
                Observações
            </h2>

            <div
                className="w-24 h-1 rounded-full mx-auto mb-12"
                style={{ backgroundColor: accentColor }}
            />

            {/* Notes Area */}
            <div className="flex-1 max-w-4xl mx-auto w-full">
                <div
                    className="h-full rounded-2xl p-8 border-2 relative"
                    style={{ borderColor: accentColor + '20', backgroundColor: backgroundColor }}
                >
                    {/* Icon */}
                    <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                        style={{ backgroundColor: accentColor + '15' }}
                    >
                        <FileText size={24} style={{ color: accentColor }} />
                    </div>

                    {/* Notes Textarea */}
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        onBlur={handleBlur}
                        className="w-full h-[calc(100%-80px)] text-lg leading-relaxed bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-4 resize-none"
                        style={{ color: textColor, outlineColor: accentColor }}
                        placeholder="Digite suas observações, notas importantes, avisos ou qualquer informação adicional relevante para esta proposta..."
                    />
                </div>
            </div>
        </div>
    );
}
