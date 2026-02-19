import { useState, useEffect } from 'react';
import { MessageCircle, BarChart3, Rocket } from 'lucide-react';
import type { Slide } from '../../../../lib/types';

export interface ProcessSlideProps {
    slide: Slide;
}

interface ProcessStep {
    id: string;
    title: string;
    items: string[];
    icon: 'message' | 'chart' | 'rocket';
}

export function ProcessSlide({ slide }: ProcessSlideProps) {
    const [steps, setSteps] = useState<ProcessStep[]>(
        slide.content.processSteps || [
            {
                id: '1',
                title: 'CONSULTORIA',
                items: [
                    'CONSULTORIA DE MARKETING/VENDAS',
                    'BRIEFING',
                    'MARKETING PLAN',
                    "DEFINIÇÃO DE KPI'S"
                ],
                icon: 'message'
            },
            {
                id: '2',
                title: 'ESTRUTURAÇÃO',
                items: [
                    'IDENTIDADE VISUAL',
                    'SITES',
                    'E-COMMERCES',
                    'EBOOKS,',
                    'INFOGRÁFICOS',
                    'E VÍDEOS'
                ],
                icon: 'chart'
            },
            {
                id: '3',
                title: 'EXECUÇÃO',
                items: [
                    'TRÁFEGO PAGO',
                    'SEO',
                    'PRODUÇÃO DE CONTEÚDO',
                    'AUTOMAÇÃO DE MARKETING'
                ],
                icon: 'rocket'
            }
        ]
    );

    const backgroundColor = slide.content.backgroundColor || '#1A1A1A';
    const textColor = slide.content.textColor || '#FFFFFF';
    const accentColor = slide.content.accentColor || '#FFB500';

    useEffect(() => {
        if (slide.content.processSteps) {
            setSteps(slide.content.processSteps);
        }
    }, [slide.id]);

    const iconMap = {
        message: MessageCircle,
        chart: BarChart3,
        rocket: Rocket,
    };

    return (
        <div
            className="w-full h-full p-12 relative overflow-hidden"
            style={{ backgroundColor }}
        >
            {/* Padrão de fundo */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 20px,
                        ${textColor} 20px,
                        ${textColor} 22px
                    )`
                }}
            />

            {/* Conteúdo */}
            <div className="relative z-10 h-full flex flex-col">
                {/* Título */}
                <div className="mb-12 text-center">
                    <h2 className="text-5xl font-extrabold">
                        <span style={{ color: textColor }}>Como </span>
                        <span className="italic" style={{ color: accentColor }}>FAZEMOS</span>
                    </h2>
                </div>

                {/* Cards de processo em formato de balão */}
                <div className="flex-1 flex items-center justify-center gap-6 mb-12">
                    {steps.map((step, index) => {
                        const IconComponent = iconMap[step.icon];

                        return (
                            <div key={step.id} className="flex items-center gap-4">
                                {/* Card em formato de balão de conversa */}
                                <div className="relative flex flex-col w-72">
                                    {/* Ícone circular no topo */}
                                    <div
                                        className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center -mt-4"
                                        style={{ backgroundColor: accentColor }}
                                    >
                                        <IconComponent size={32} style={{ color: backgroundColor }} />
                                    </div>

                                    {/* Card principal */}
                                    <div
                                        className="rounded-3xl p-6 relative"
                                        style={{
                                            backgroundColor: textColor,
                                            color: backgroundColor
                                        }}
                                    >
                                        {/* Título do passo */}
                                        <h3
                                            className="text-2xl font-extrabold text-center mb-6 pb-4 border-b-2"
                                            style={{ borderColor: accentColor }}
                                        >
                                            {step.title}
                                        </h3>

                                        {/* Lista de itens */}
                                        <div className="space-y-2">
                                            {step.items.map((item, idx) => (
                                                <p
                                                    key={idx}
                                                    className="text-sm font-semibold text-center"
                                                    style={{ color: backgroundColor }}
                                                >
                                                    {item}
                                                </p>
                                            ))}
                                        </div>

                                        {/* Cauda do balão */}
                                        <div
                                            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0"
                                            style={{
                                                borderLeft: '20px solid transparent',
                                                borderRight: '20px solid transparent',
                                                borderTop: `20px solid ${textColor}`
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Seta entre cards */}
                                {index < steps.length - 1 && (
                                    <div
                                        className="text-6xl font-bold -mt-12"
                                        style={{ color: accentColor }}
                                    >
                                        ➤
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Timeline inferior com ícones */}
                <div className="flex justify-center items-center gap-4 pt-8 border-t-2 border-dashed"
                    style={{ borderColor: accentColor + '40' }}>
                    {['Diagnóstico', 'Planejamento', 'Estruturação', 'Implementação', 'Execução', 'Análise'].map((phase, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                            <div className="text-center">
                                <div
                                    className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                                    style={{ backgroundColor: accentColor + '30' }}
                                >
                                    <span style={{ color: accentColor }} className="text-lg font-bold">
                                        {idx + 1}
                                    </span>
                                </div>
                                <p className="text-xs font-medium" style={{ color: textColor }}>
                                    {phase}
                                </p>
                            </div>
                            {idx < 5 && (
                                <div className="h-px w-8" style={{ backgroundColor: accentColor + '40' }} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
