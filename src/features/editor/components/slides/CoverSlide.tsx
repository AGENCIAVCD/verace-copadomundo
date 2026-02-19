import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import type { Slide } from '../../../../lib/types';

export interface CoverSlideProps {
    slide: Slide;
    onUpdate: (content: Slide['content']) => void;
}

export function CoverSlide({ slide, onUpdate }: CoverSlideProps) {
    const [title, setTitle] = useState(slide.content.title || 'Proposta Comercial');
    const [subtitle, setSubtitle] = useState(slide.content.subtitle || 'Apresentação de Serviços');
    const [clientName, setClientName] = useState(slide.content.clientName || '');
    const [companyName, setCompanyName] = useState(slide.content.companyName || 'Você Digital Propaganda');

    // Cores profissionais: dark theme com amarelo/laranja
    const backgroundColor = slide.content.backgroundColor || '#1A1A1A';
    const textColor = slide.content.textColor || '#FFFFFF';
    const accentColor = slide.content.accentColor || '#FFB500';

    useEffect(() => {
        setTitle(slide.content.title || 'Proposta Comercial');
        setSubtitle(slide.content.subtitle || 'Apresentação de Serviços');
        setClientName(slide.content.clientName || '');
        setCompanyName(slide.content.companyName || 'Você Digital Propaganda');
    }, [slide.id]);

    const handleBlur = () => {
        onUpdate({
            ...slide.content,
            title,
            subtitle,
            clientName,
            companyName,
        });
    };

    return (
        <div
            className="w-full h-full flex relative overflow-hidden"
            style={{ backgroundColor }}
        >
            {/* Padrão de fundo - linhas diagonais sutis */}
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

            {/* Conteúdo principal */}
            <div className="flex-1 flex flex-col justify-center p-16 z-10">
                {/* Texto institucional pequeno no topo */}
                <p className="text-sm opacity-60 mb-8" style={{ color: textColor }}>
                    Utilizamos dados para acelerar o{' '}
                    <span className="font-bold" style={{ color: accentColor }}>
                        crescimento das empresas
                    </span>
                    {' '}implementando estratégias criativas e inovadoras de{' '}
                    <span className="font-bold" style={{ color: accentColor }}>
                        Marketing Digital
                    </span>.
                </p>

                {/* Título principal - editável */}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleBlur}
                    className="w-full text-6xl font-extrabold mb-6 bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-4"
                    style={{ color: textColor, outlineColor: accentColor }}
                    placeholder="Proposta Comercial"
                />

                {/* Nome do Cliente - destaque amarelo */}
                <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    onBlur={handleBlur}
                    className="w-full text-5xl font-bold mb-6 bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-4 italic"
                    style={{ color: accentColor, outlineColor: accentColor }}
                    placeholder="Nome do Cliente"
                />

                {/* Subtítulo */}
                <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    onBlur={handleBlur}
                    className="text-xl opacity-80 bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-4 mb-12"
                    style={{ color: textColor, outlineColor: accentColor }}
                    placeholder="Apresentação de Serviços"
                />

                {/* Nome da Empresa no rodapé */}
                <div className="mt-auto">
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        onBlur={handleBlur}
                        className="text-sm font-semibold bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-4"
                        style={{ color: accentColor, outlineColor: accentColor }}
                        placeholder="Nome da sua empresa"
                    />
                </div>
            </div>

            {/* Lado direito - área para foto/imagem */}
            <div className="w-2/5 relative flex items-center justify-center">
                {/* Placeholder para foto - será substituído por upload de imagem */}
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                        background: `linear-gradient(135deg, ${accentColor}20 0%, transparent 100%)`
                    }}
                >
                    {!slide.content.coverImage && (
                        <div className="text-center opacity-30">
                            <Sparkles size={64} style={{ color: accentColor }} className="mx-auto mb-4" />
                            <p className="text-sm" style={{ color: textColor }}>
                                Área para imagem
                            </p>
                            <p className="text-xs mt-2" style={{ color: textColor }}>
                                (Upload disponível em breve)
                            </p>
                        </div>
                    )}

                    {slide.content.coverImage && (
                        <img
                            src={slide.content.coverImage}
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

            </div>
        </div>
    );
}
