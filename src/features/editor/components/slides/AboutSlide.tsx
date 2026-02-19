import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import type { Slide } from '../../../../lib/types';

export interface AboutSlideProps {
    slide: Slide;
    onUpdate: (content: Slide['content']) => void;
}

export function AboutSlide({ slide, onUpdate }: AboutSlideProps) {
    const [mainText, setMainText] = useState(
        slide.content.text ||
        'Somos APAIXONADOS por criar campanhas surpreendentes e empolgantes, que transformam produtos e serviços, ao mesmo tempo em que conectamos pessoas, gerando engajamento para as marcas.'
    );
    const [highlightText, setHighlightText] = useState(
        slide.content.highlightText ||
        'Muito mais que uma agência de marketing digital. O foco é transformar o seu investimento de marketing em resultados diretos e lucrativos de venda.'
    );

    const backgroundColor = slide.content.backgroundColor || '#1A1A1A';
    const textColor = slide.content.textColor || '#FFFFFF';
    const accentColor = slide.content.accentColor || '#FFB500';

    useEffect(() => {
        setMainText(slide.content.text || 'Somos APAIXONADOS por criar campanhas surpreendentes...');
        setHighlightText(slide.content.highlightText || 'Muito mais que uma agência...');
    }, [slide.id]);

    const handleBlur = () => {
        onUpdate({
            ...slide.content,
            text: mainText,
            highlightText,
        });
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
                {/* Título estilizado */}
                <div className="mb-12">
                    <h2 className="text-6xl font-extrabold">
                        <span style={{ color: textColor }}>QUEM </span>
                        <span className="italic" style={{ color: accentColor }}>SOMOS</span>
                    </h2>
                </div>

                {/* Layout duas colunas */}
                <div className="flex-1 flex gap-12">
                    {/* Coluna esquerda - Texto */}
                    <div className="flex-1 space-y-8">
                        {/* Texto principal */}
                        <textarea
                            value={mainText}
                            onChange={(e) => setMainText(e.target.value)}
                            onBlur={handleBlur}
                            className="w-full text-lg leading-relaxed bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-4 resize-none"
                            style={{ color: textColor, outlineColor: accentColor }}
                            rows={6}
                            placeholder="Texto principal sobre a empresa..."
                        />

                        {/* Box de destaque */}
                        <div
                            className="p-6 rounded-xl border-l-4"
                            style={{
                                borderColor: accentColor,
                                backgroundColor: accentColor + '10'
                            }}
                        >
                            <h3
                                className="text-xl font-bold mb-3"
                                style={{ color: accentColor }}
                            >
                                Muito <span className="italic">mais</span> que uma agência de{' '}
                                <span className="italic">marketing digital</span>
                            </h3>
                            <textarea
                                value={highlightText}
                                onChange={(e) => setHighlightText(e.target.value)}
                                onBlur={handleBlur}
                                className="w-full text-base leading-relaxed bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-4 resize-none"
                                style={{ color: textColor, outlineColor: accentColor }}
                                rows={4}
                                placeholder="Texto de destaque..."
                            />
                        </div>
                    </div>

                    {/* Coluna direita - Imagem da equipe */}
                    <div className="w-2/5 relative rounded-2xl overflow-hidden"
                        style={{ backgroundColor: accentColor + '15' }}>
                        {!slide.content.teamImage ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <Users size={80} style={{ color: accentColor }} className="mb-4 opacity-40" />
                                <p className="text-lg font-semibold text-center px-8" style={{ color: textColor, opacity: 0.4 }}>
                                    Foto da Equipe
                                </p>
                                <p className="text-sm text-center px-8 mt-2" style={{ color: textColor, opacity: 0.3 }}>
                                    (Upload disponível em breve)
                                </p>
                            </div>
                        ) : (
                            <img
                                src={slide.content.teamImage}
                                alt="Team"
                                className="w-full h-full object-cover"
                            />
                        )}

                        {/* Decoração - logo overlay no canto */}
                        <div
                            className="absolute bottom-6 left-6 w-16 h-16 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: accentColor }}
                        >
                            <span className="text-3xl font-bold" style={{ color: backgroundColor }}>V</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
