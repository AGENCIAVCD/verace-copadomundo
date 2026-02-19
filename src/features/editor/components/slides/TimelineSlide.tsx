import { useState, useEffect } from 'react';
import { Calendar, Plus, X } from 'lucide-react';
import type { Slide } from '../../../../lib/types';

export interface TimelineSlideProps {
    slide: Slide;
    onUpdate: (content: Slide['content']) => void;
}

interface Phase {
    id: string;
    name: string;
    duration: string;
    deliverables: string;
}

export function TimelineSlide({ slide, onUpdate }: TimelineSlideProps) {
    const [phases, setPhases] = useState<Phase[]>(
        slide.content.phases || [
            { id: '1', name: 'Planejamento', duration: '1 semana', deliverables: 'Briefing e estratégia' },
            { id: '2', name: 'Desenvolvimento', duration: '3 semanas', deliverables: 'Implementação e testes' },
            { id: '3', name: 'Entrega', duration: '1 semana', deliverables: 'Deploy e treinamento' },
        ]
    );

    const backgroundColor = slide.content.backgroundColor || '#FFFFFF';
    const textColor = slide.content.textColor || '#1A1A1A';
    const accentColor = slide.content.accentColor || '#FFB500';

    useEffect(() => {
        setPhases(slide.content.phases || [
            { id: '1', name: 'Planejamento', duration: '1 semana', deliverables: 'Briefing e estratégia' },
            { id: '2', name: 'Desenvolvimento', duration: '3 semanas', deliverables: 'Implementação e testes' },
            { id: '3', name: 'Entrega', duration: '1 semana', deliverables: 'Deploy e treinamento' },
        ]);
    }, [slide.id]);

    const handlePhaseChange = (id: string, field: keyof Phase, value: string) => {
        const updated = phases.map(p =>
            p.id === id ? { ...p, [field]: value } : p
        );
        setPhases(updated);
    };

    const handleBlur = () => {
        onUpdate({ ...slide.content, phases });
    };

    const addPhase = () => {
        const newPhase: Phase = {
            id: Date.now().toString(),
            name: 'Nova Fase',
            duration: '1 semana',
            deliverables: 'Entregáveis',
        };
        const updated = [...phases, newPhase];
        setPhases(updated);
        onUpdate({ ...slide.content, phases: updated });
    };

    const removePhase = (id: string) => {
        const updated = phases.filter(p => p.id !== id);
        setPhases(updated);
        onUpdate({ ...slide.content, phases: updated });
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
                Cronograma
            </h2>

            <div
                className="w-24 h-1 rounded-full mx-auto mb-12"
                style={{ backgroundColor: accentColor }}
            />

            {/* Timeline */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto space-y-6">
                    {phases.map((phase, index) => (
                        <div key={phase.id} className="relative flex gap-6">
                            {/* Timeline Line */}
                            <div className="flex flex-col items-center">
                                {/* Number Badge */}
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                                    style={{
                                        backgroundColor: accentColor,
                                        color: backgroundColor
                                    }}
                                >
                                    {index + 1}
                                </div>

                                {/* Vertical Line */}
                                {index < phases.length - 1 && (
                                    <div
                                        className="w-1 flex-1 mt-2"
                                        style={{ backgroundColor: accentColor + '30' }}
                                    />
                                )}
                            </div>

                            {/* Phase Content */}
                            <div className="flex-1 pb-8">
                                <div
                                    className="p-6 rounded-xl border-2"
                                    style={{ borderColor: accentColor + '20', backgroundColor: backgroundColor }}
                                >
                                    {/* Remove Button */}
                                    {phases.length > 1 && (
                                        <button
                                            onClick={() => removePhase(phase.id)}
                                            className="float-right p-1 rounded opacity-50 hover:opacity-100 transition-opacity"
                                            style={{ color: textColor }}
                                        >
                                            <X size={16} />
                                        </button>
                                    )}

                                    {/* Phase Name */}
                                    <input
                                        type="text"
                                        value={phase.name}
                                        onChange={(e) => handlePhaseChange(phase.id, 'name', e.target.value)}
                                        onBlur={handleBlur}
                                        className="text-2xl font-bold mb-3 bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-2 w-full"
                                        style={{ color: textColor, outlineColor: accentColor }}
                                        placeholder="Nome da fase"
                                    />

                                    {/* Duration */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <Calendar size={18} style={{ color: accentColor }} />
                                        <input
                                            type="text"
                                            value={phase.duration}
                                            onChange={(e) => handlePhaseChange(phase.id, 'duration', e.target.value)}
                                            onBlur={handleBlur}
                                            className="text-sm font-medium bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-2"
                                            style={{ color: accentColor, outlineColor: accentColor }}
                                            placeholder="Duração"
                                        />
                                    </div>

                                    {/* Deliverables */}
                                    <textarea
                                        value={phase.deliverables}
                                        onChange={(e) => handlePhaseChange(phase.id, 'deliverables', e.target.value)}
                                        onBlur={handleBlur}
                                        className="w-full text-sm opacity-75 bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-2 resize-none"
                                        style={{ color: textColor, outlineColor: accentColor }}
                                        placeholder="Entregáveis"
                                        rows={2}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add Phase Button */}
                    <div className="flex gap-6">
                        <div className="w-12" /> {/* Spacer for alignment */}
                        <button
                            onClick={addPhase}
                            className="flex-1 p-4 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 hover:opacity-80 transition-opacity"
                            style={{ borderColor: accentColor + '40', color: accentColor }}
                        >
                            <Plus size={20} />
                            <span className="font-medium">Adicionar Fase</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
