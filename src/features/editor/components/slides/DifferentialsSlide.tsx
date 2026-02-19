import { useState, useEffect } from 'react';
import { Plus, X, Check } from 'lucide-react';
import type { Slide } from '../../../../lib/types';

export interface DifferentialsSlideProps {
    slide: Slide;
    onUpdate: (content: Slide['content']) => void;
}

export function DifferentialsSlide({ slide, onUpdate }: DifferentialsSlideProps) {
    const [title, setTitle] = useState(slide.content.title || 'Nossos Diferenciais');
    const [items, setItems] = useState<string[]>(
        slide.content.items || [
            'Equipe experiente e dedicada',
            'Atendimento personalizado',
            'Resultados mensuráveis',
            'Inovação constante',
        ]
    );

    const backgroundColor = slide.content.backgroundColor || '#FFFFFF';
    const textColor = slide.content.textColor || '#1A1A1A';
    const accentColor = slide.content.accentColor || '#FFB500';

    useEffect(() => {
        setTitle(slide.content.title || 'Nossos Diferenciais');
        setItems(
            slide.content.items || [
                'Equipe experiente e dedicada',
                'Atendimento personalizado',
                'Resultados mensuráveis',
                'Inovação constante',
            ]
        );
    }, [slide.id]);

    const handleTitleBlur = () => {
        onUpdate({ ...slide.content, title });
    };

    const handleItemChange = (index: number, value: string) => {
        const newItems = [...items];
        newItems[index] = value;
        setItems(newItems);
    };

    const handleItemBlur = () => {
        onUpdate({ ...slide.content, items });
    };

    const handleAddItem = () => {
        const newItems = [...items, 'Novo diferencial'];
        setItems(newItems);
        onUpdate({ ...slide.content, items: newItems });
    };

    const handleRemoveItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        onUpdate({ ...slide.content, items: newItems });
    };

    return (
        <div
            className="w-full h-full flex flex-col p-12 relative"
            style={{ backgroundColor }}
        >
            {/* Title - Editable */}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleBlur}
                className="text-4xl font-display font-bold mb-8 bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-4"
                style={{ color: accentColor, outlineColor: accentColor }}
                placeholder="Título"
            />

            {/* Divider */}
            <div
                className="w-20 h-1 rounded-full mb-8"
                style={{ backgroundColor: accentColor }}
            />

            {/* Items - Editable List */}
            <div className="flex-1 grid grid-cols-2 gap-6">
                {items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                        {/* Check icon */}
                        <div
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1"
                            style={{ backgroundColor: accentColor }}
                        >
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>

                        {/* Item text */}
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => handleItemChange(index, e.target.value)}
                                onBlur={handleItemBlur}
                                className="w-full text-lg bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-2 pr-8"
                                style={{ color: textColor, outlineColor: accentColor }}
                                placeholder="Digite o diferencial..."
                            />

                            {/* Remove button */}
                            <button
                                onClick={() => handleRemoveItem(index)}
                                className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                                title="Remover"
                            >
                                <X className="w-4 h-4 text-red-600" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add button */}
            <button
                onClick={handleAddItem}
                className="mt-6 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-black/5 transition-colors self-start"
                style={{ color: accentColor }}
            >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Adicionar Diferencial</span>
            </button>
        </div>
    );
}
