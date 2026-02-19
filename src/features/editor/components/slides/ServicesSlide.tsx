import { useState, useEffect } from 'react';
import { Plus, X, Eye, Globe, Video, Mail, Facebook, Edit3, Megaphone } from 'lucide-react';
import { BrushStroke } from '../../../../components/atoms/BrushStroke';
import type { Slide } from '../../../../lib/types';

export interface ServicesSlideProps {
    slide: Slide;
    onUpdate: (content: Slide['content']) => void;
}

// Service type is now imported from lib/types
// Kept here for backward compatibility with existing slide data
interface ServiceForSlide {
    id: string;
    name: string;
    description: string;
    icon: string;
}

// Ícones disponíveis
const iconMap: Record<string, any> = {
    eye: Eye,
    globe: Globe,
    video: Video,
    mail: Mail,
    facebook: Facebook,
    edit: Edit3,
    megaphone: Megaphone,
};

export function ServicesSlide({ slide, onUpdate }: ServicesSlideProps) {
    const [services, setServices] = useState<ServiceForSlide[]>(
        (slide.content.services as ServiceForSlide[]) || [
            { id: '1', name: 'Identidade Visual', description: 'Criação de marca impactante no mercado.', icon: 'eye' },
            { id: '2', name: 'Criação de Sites/SEO', description: 'Criação/otimização de websites personalizados.', icon: 'globe' },
            { id: '3', name: 'Conteúdo de Vídeo', description: 'Produção e edição audiovisual; Animações Motion Graphics.', icon: 'video' },
            { id: '4', name: 'Automação de Marketing', description: 'Nutrição de leads até o momento da compra.', icon: 'mail' },
            { id: '5', name: 'Mídias Sociais', description: 'Conteúdo para as redes sociais.', icon: 'facebook' },
            { id: '6', name: 'Google AdWords', description: 'Anúncios nos canais do Google.', icon: 'globe' },
            { id: '7', name: 'Facebook Ads', description: 'Anúncios na plataforma do Facebook.', icon: 'facebook' },
            { id: '8', name: 'Marketing de Conteúdo', description: 'Pesquisa e criação de conteúdo para Blog.', icon: 'edit' },
        ]
    );

    const backgroundColor = slide.content.backgroundColor || '#1A1A1A';
    const textColor = slide.content.textColor || '#FFFFFF';
    const accentColor = slide.content.accentColor || '#FFB500';

    useEffect(() => {
        if (slide.content.services && slide.content.services.length > 0) {
            setServices(slide.content.services as ServiceForSlide[]);
        }
    }, [slide.id]);

    const handleServiceChange = (id: string, field: keyof ServiceForSlide, value: string) => {
        const updatedServices = services.map(s =>
            s.id === id ? { ...s, [field]: value } : s
        );
        setServices(updatedServices);
    };

    const handleServiceBlur = () => {
        onUpdate({ ...slide.content, services: services as any });
    };

    const addService = () => {
        const newService: ServiceForSlide = {
            id: Date.now().toString(),
            name: 'Novo Serviço',
            description: 'Descrição',
            icon: 'megaphone',
        };
        const updatedServices = [...services, newService];
        setServices(updatedServices);
        onUpdate({ ...slide.content, services: updatedServices as any });
    };

    const removeService = (id: string) => {
        if (services.length <= 1) return;
        const updatedServices = services.filter(s => s.id !== id);
        setServices(updatedServices);
        onUpdate({ ...slide.content, services: updatedServices as any });
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

            {/* Brush Stroke atrás do título */}
            <BrushStroke
                variant="horizontal"
                color={accentColor}
                opacity={0.3}
                position="top"
                className="top-8"
            />

            {/* Conteúdo */}
            <div className="relative z-10 h-full flex flex-col">
                {/* Título estilizado */}
                <div className="mb-10 text-center relative">
                    <h2 className="text-5xl font-extrabold">
                        <span style={{ color: textColor }}>Nossos </span>
                        <span className="italic" style={{ color: accentColor }}>SERVIÇOS</span>
                    </h2>
                </div>

                {/* Grid 4x2 de serviços */}
                <div className="flex-1 grid grid-cols-4 gap-6 overflow-y-auto pb-4">
                    {services.map((service) => {
                        const IconComponent = iconMap[service.icon] || Megaphone;

                        return (
                            <div
                                key={service.id}
                                className="relative flex flex-col items-center text-center group"
                            >
                                {/* Remove Button - aparece no hover */}
                                <button
                                    onClick={() => removeService(service.id)}
                                    className="absolute -top-2 -right-2 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                    style={{ backgroundColor: accentColor, color: backgroundColor }}
                                >
                                    <X size={14} />
                                </button>

                                {/* Ícone grande */}
                                <div
                                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
                                    style={{ backgroundColor: accentColor + '20' }}
                                >
                                    <IconComponent size={40} style={{ color: accentColor }} />
                                </div>

                                {/* Nome do serviço */}
                                <input
                                    type="text"
                                    value={service.name}
                                    onChange={(e) => handleServiceChange(service.id, 'name', e.target.value)}
                                    onBlur={handleServiceBlur}
                                    className="w-full text-center text-base font-bold mb-2 bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-2"
                                    style={{ color: textColor, outlineColor: accentColor }}
                                    placeholder="Nome"
                                />

                                {/* Descrição */}
                                <textarea
                                    value={service.description}
                                    onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                                    onBlur={handleServiceBlur}
                                    className="w-full text-center text-xs leading-relaxed bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-2 resize-none opacity-70"
                                    style={{ color: textColor, outlineColor: accentColor }}
                                    placeholder="Descrição"
                                    rows={2}
                                />
                            </div>
                        );
                    })}

                    {/* Botão adicionar serviço */}
                    <button
                        onClick={addService}
                        className="flex flex-col items-center justify-center border-2 border-dashed rounded-2xl hover:opacity-80 transition-opacity"
                        style={{ borderColor: accentColor + '40', color: accentColor }}
                    >
                        <Plus size={32} />
                        <p className="text-sm font-medium mt-2">Adicionar</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
