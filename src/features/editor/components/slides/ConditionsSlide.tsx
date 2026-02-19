import { useState, useEffect } from 'react';
import { Plus, X, CheckCircle } from 'lucide-react';
import type { Slide } from '../../../../lib/types';

export interface ConditionsSlideProps {
    slide: Slide;
    onUpdate: (content: Slide['content']) => void;
}

export function ConditionsSlide({ slide, onUpdate }: ConditionsSlideProps) {
    const [conditions, setConditions] = useState<string[]>(
        slide.content.items || [
            'Pagamento: 50% início + 50% entrega',
            'Prazo de execução: 30 dias',
            'Validade da proposta: 15 dias',
        ]
    );

    const backgroundColor = slide.content.backgroundColor || '#FFFFFF';
    const textColor = slide.content.textColor || '#1A1A1A';
    const accentColor = slide.content.accentColor || '#FFB500';

    useEffect(() => {
        setConditions(slide.content.items || [
            'Pagamento: 50% início + 50% entrega',
            'Prazo de execução: 30 dias',
            'Validade da proposta: 15 dias',
        ]);
    }, [slide.id]);

    const handleConditionChange = (index: number, value: string) => {
        const updated = [...conditions];
        updated[index] = value;
        setConditions(updated);
    };

    const handleBlur = () => {
        onUpdate({ ...slide.content, items: conditions });
    };

    const addCondition = () => {
        const updated = [...conditions, 'Nova condição'];
        setConditions(updated);
        onUpdate({ ...slide.content, items: updated });
    };

    const removeCondition = (index: number) => {
        const updated = conditions.filter((_, i) => i !== index);
        setConditions(updated);
        onUpdate({ ...slide.content, items: updated });
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
                Condições Comerciais
            </h2>

            <div
                className="w-24 h-1 rounded-full mx-auto mb-12"
                style={{ backgroundColor: accentColor }}
            />

            {/* Conditions List */}
            <div className="flex-1 max-w-3xl mx-auto w-full space-y-4">
                {conditions.map((condition, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-lg"
                        style={{ backgroundColor: backgroundColor }}
                    >
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-1">
                            <CheckCircle size={24} style={{ color: accentColor }} />
                        </div>

                        {/* Condition Text */}
                        <textarea
                            value={condition}
                            onChange={(e) => handleConditionChange(index, e.target.value)}
                            onBlur={handleBlur}
                            className="flex-1 text-lg bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-2 resize-none"
                            style={{ color: textColor, outlineColor: accentColor }}
                            placeholder="Digite a condição"
                            rows={2}
                        />

                        {/* Remove Button */}
                        {conditions.length > 1 && (
                            <button
                                onClick={() => removeCondition(index)}
                                className="flex-shrink-0 p-1 rounded opacity-50 hover:opacity-100 transition-opacity"
                                style={{ color: textColor }}
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                ))}

                {/* Add Button */}
                <button
                    onClick={addCondition}
                    className="w-full p-4 rounded-lg border-2 border-dashed flex items-center justify-center gap-2 hover:opacity-80 transition-opacity"
                    style={{ borderColor: accentColor + '40', color: accentColor }}
                >
                    <Plus size={20} />
                    <span className="font-medium">Adicionar Condição</span>
                </button>
            </div>
        </div>
    );
}
