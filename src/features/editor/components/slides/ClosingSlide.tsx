import { useState, useEffect } from 'react';
import { Mail, Phone, Globe } from 'lucide-react';
import type { Slide } from '../../../../lib/types';

export interface ClosingSlideProps {
    slide: Slide;
    onUpdate: (content: Slide['content']) => void;
}

export function ClosingSlide({ slide, onUpdate }: ClosingSlideProps) {
    const [cta, setCta] = useState(slide.content.cta || 'Vamos transformar sua presença digital?');
    const [email, setEmail] = useState(slide.content.email || 'contato@vocedigital.com');
    const [phone, setPhone] = useState(slide.content.phone || '(11) 99999-9999');
    const [website, setWebsite] = useState(slide.content.website || 'www.vocedigital.com');

    const backgroundColor = slide.content.backgroundColor || '#1A1A1A';
    const textColor = slide.content.textColor || '#FFFFFF';
    const accentColor = slide.content.accentColor || '#FFB500';

    useEffect(() => {
        setCta(slide.content.cta || 'Vamos transformar sua presença digital?');
        setEmail(slide.content.email || 'contato@vocedigital.com');
        setPhone(slide.content.phone || '(11) 99999-9999');
        setWebsite(slide.content.website || 'www.vocedigital.com');
    }, [slide.id]);

    const handleBlur = () => {
        onUpdate({
            ...slide.content,
            cta,
            email,
            phone,
            website,
        });
    };

    return (
        <div
            className="w-full h-full flex flex-col items-center justify-center p-12 relative"
            style={{ backgroundColor }}
        >
            {/* CTA - Call to Action */}
            <textarea
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                onBlur={handleBlur}
                className="w-full max-w-3xl text-5xl font-display font-bold text-center mb-12 bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-4 resize-none"
                style={{ color: textColor, outlineColor: accentColor }}
                placeholder="Digite o call-to-action"
                rows={2}
            />

            <div
                className="w-32 h-1 rounded-full mb-12"
                style={{ backgroundColor: accentColor }}
            />

            {/* Contact Information */}
            <div className="space-y-6 max-w-2xl w-full">
                {/* Email */}
                <div className="flex items-center justify-center gap-4">
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: accentColor + '15' }}
                    >
                        <Mail size={24} style={{ color: accentColor }} />
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={handleBlur}
                        className="text-xl bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-2"
                        style={{ color: textColor, outlineColor: accentColor }}
                        placeholder="email@example.com"
                    />
                </div>

                {/* Phone */}
                <div className="flex items-center justify-center gap-4">
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: accentColor + '15' }}
                    >
                        <Phone size={24} style={{ color: accentColor }} />
                    </div>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={handleBlur}
                        className="text-xl bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-2"
                        style={{ color: textColor, outlineColor: accentColor }}
                        placeholder="(00) 00000-0000"
                    />
                </div>

                {/* Website */}
                <div className="flex items-center justify-center gap-4">
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: accentColor + '15' }}
                    >
                        <Globe size={24} style={{ color: accentColor }} />
                    </div>
                    <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        onBlur={handleBlur}
                        className="text-xl bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-2"
                        style={{ color: textColor, outlineColor: accentColor }}
                        placeholder="www.example.com"
                    />
                </div>
            </div>

            {/* Footer Message */}
            <div className="absolute bottom-12">
                <p className="text-lg font-medium" style={{ color: accentColor }}>
                    Obrigado pela atenção!
                </p>
            </div>
        </div>
    );
}
