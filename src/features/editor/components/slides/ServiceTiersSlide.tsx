import { useState, useEffect } from 'react';
import type { Slide } from '../../../../lib/types';
import { BrushStroke } from '../../../../components/atoms/BrushStroke';
import { TierCard } from '../../../../components/molecules/TierCard';
import { Instagram, Linkedin, Facebook } from 'lucide-react';

export interface ServiceTiersSlideProps {
    slide: Slide;
    onUpdate: (content: Slide['content']) => void;
}

interface ServiceTier {
    name: string;
    features: Array<{ text: string; enabled: boolean }>;
    priceFrom: number;
    priceTo: number;
}

export function ServiceTiersSlide({ slide, onUpdate }: ServiceTiersSlideProps) {
    const [title, setTitle] = useState(slide.content.title || 'REDES SOCIAIS');
    const [subtitle, setSubtitle] = useState(
        slide.content.subtitle || 'Apresente-se com elegância e profissionalismo.'
    );
    const [footerNote, setFooterNote] = useState(
        slide.content.footerNote || '**Consulte a nossa equipe comercial para projetos exclusivos.'
    );

    const [tiers, setTiers] = useState<ServiceTier[]>(
        slide.content.serviceTiers || [
            {
                name: 'Smart',
                features: [
                    { text: 'Cronograma Estratégico', enabled: true },
                    { text: 'Posts Estáticos (4)', enabled: true },
                    { text: 'Repost nos Stories', enabled: true },
                    { text: 'Destaques no perfil (5)', enabled: true },
                    { text: 'Captação (1)', enabled: false },
                    { text: 'Carrossel | Reels (4)', enabled: false },
                    { text: 'Posts comemorativos', enabled: false },
                ],
                priceFrom: 3000,
                priceTo: 2500,
            },
            {
                name: 'Advanced',
                features: [
                    { text: 'Cronograma Estratégico', enabled: true },
                    { text: 'Posts Estáticos (4)', enabled: true },
                    { text: 'Repost nos Stories', enabled: true },
                    { text: 'Destaques no perfil (5)', enabled: true },
                    { text: 'Captação (1)', enabled: true },
                    { text: 'Carrossel | Reels (4)', enabled: true },
                    { text: 'Posts comemorativos', enabled: false },
                ],
                priceFrom: 4000,
                priceTo: 3200,
            },
            {
                name: 'Premium',
                features: [
                    { text: 'Cronograma Estratégico', enabled: true },
                    { text: 'Posts Estáticos (4)', enabled: true },
                    { text: 'Repost nos Stories', enabled: true },
                    { text: 'Destaques no perfil (5)', enabled: true },
                    { text: 'Captação (2)', enabled: true },
                    { text: 'Carrossel | Reels (8)', enabled: true },
                    { text: 'Posts comemorativos', enabled: true },
                ],
                priceFrom: 7000,
                priceTo: 6000,
            },
        ]
    );

    const backgroundColor = slide.content.backgroundColor || '#000000';
    const textColor = slide.content.textColor || '#FFFFFF';
    const accentColor = slide.content.accentColor || '#FFB500';

    useEffect(() => {
        onUpdate({
            ...slide.content,
            title,
            subtitle,
            footerNote,
            serviceTiers: tiers,
        });
    }, [title, subtitle, footerNote, tiers]);

    const updateTier = (index: number, updates: Partial<ServiceTier>) => {
        const newTiers = [...tiers];
        newTiers[index] = { ...newTiers[index], ...updates };
        setTiers(newTiers);
    };

    return (
        <div
            className="w-full h-full p-12 relative overflow-hidden flex flex-col"
            style={{ backgroundColor }}
        >
            {/* Brush Stroke */}
            <BrushStroke
                variant="horizontal"
                color={accentColor}
                opacity={0.4}
                position="top"
                className="top-0"
            />

            {/* Header com ícones */}
            <div className="relative z-10 mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <Instagram size={48} style={{ color: textColor }} />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex-1 text-5xl font-extrabold bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-[#FFB500]"
                        style={{ color: textColor }}
                    />
                    <Linkedin size={48} style={{ color: textColor }} />
                    <Facebook size={48} style={{ color: textColor }} />
                </div>
                <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="text-base bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-[#FFB500] w-full"
                    style={{ color: textColor }}
                />
            </div>

            {/* 3 Tier Cards */}
            <div className="relative z-10 flex-1 grid grid-cols-3 gap-6 mb-8">
                {tiers.map((tier, index) => (
                    <TierCard
                        key={index}
                        name={tier.name}
                        features={tier.features}
                        priceFrom={tier.priceFrom}
                        priceTo={tier.priceTo}
                        highlighted={index === 1} // Middle card highlighted
                        editable={true}
                        onNameChange={(value) => updateTier(index, { name: value })}
                        onPriceFromChange={(value) => updateTier(index, { priceFrom: value })}
                        onPriceToChange={(value) => updateTier(index, { priceTo: value })}
                        onFeaturesChange={(features) => updateTier(index, { features })}
                    />
                ))}
            </div>

            {/* Footer Note */}
            <div className="relative z-10">
                <input
                    type="text"
                    value={footerNote}
                    onChange={(e) => setFooterNote(e.target.value)}
                    className="text-sm bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-[#FFB500] w-full"
                    style={{ color: textColor }}
                />
            </div>

            {/* Logo */}
            <div className="absolute bottom-8 right-12 z-10">
                <div className="text-right">
                    <p className="text-2xl font-bold" style={{ color: textColor }}>
                        VOCÊ<span style={{ color: accentColor }}>DIGITAL</span>
                    </p>
                    <p className="text-sm text-white/70">PROPAGANDA</p>
                </div>
            </div>
        </div>
    );
}
