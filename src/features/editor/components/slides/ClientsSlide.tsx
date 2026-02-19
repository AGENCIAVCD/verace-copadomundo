import { useState, useEffect } from 'react';
import { Plus, X, Upload } from 'lucide-react';
import type { Slide } from '../../../../lib/types';

export interface ClientsSlideProps {
    slide: Slide;
    onUpdate: (content: Slide['content']) => void;
}

interface ClientLogo {
    id: string;
    name: string;
    logo?: string; // base64 ou URL
}

export function ClientsSlide({ slide, onUpdate }: ClientsSlideProps) {
    const [clients, setClients] = useState<ClientLogo[]>(
        slide.content.clients || [
            { id: '1', name: 'SICOOB' },
            { id: '2', name: 'Verace' },
            { id: '3', name: 'SAJOTUR' },
            { id: '4', name: 'FA Oliva' },
            { id: '5', name: 'Chroma' },
            { id: '6', name: 'JungMed' },
            { id: '7', name: 'KUKO FRESKA' },
            { id: '8', name: 'DETROIT' },
            { id: '9', name: 'forfex' },
            { id: '10', name: 'CLAROFLEX' },
        ]
    );

    const backgroundColor = slide.content.backgroundColor || '#1A1A1A';
    const textColor = slide.content.textColor || '#FFFFFF';
    const accentColor = slide.content.accentColor || '#FFB500';

    useEffect(() => {
        if (slide.content.clients) {
            setClients(slide.content.clients);
        }
    }, [slide.id]);

    const handleClientChange = (id: string, name: string) => {
        const updated = clients.map(c =>
            c.id === id ? { ...c, name } : c
        );
        setClients(updated);
    };

    const handleBlur = () => {
        onUpdate({ ...slide.content, clients });
    };

    const addClient = () => {
        const newClient: ClientLogo = {
            id: Date.now().toString(),
            name: 'Cliente',
        };
        const updated = [...clients, newClient];
        setClients(updated);
        onUpdate({ ...slide.content, clients: updated });
    };

    const removeClient = (id: string) => {
        const updated = clients.filter(c => c.id !== id);
        setClients(updated);
        onUpdate({ ...slide.content, clients: updated });
    };

    return (
        <div
            className="w-full h-full p-12 relative overflow-hidden"
            style={{ backgroundColor }}
        >
            {/* Faixas decorativas diagonais nos cantos */}
            <div
                className="absolute top-0 left-0 w-64 h-64"
                style={{
                    background: `linear-gradient(135deg, ${accentColor} 0%, transparent 70%)`,
                    clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                    opacity: 0.15
                }}
            />
            <div
                className="absolute bottom-0 right-0 w-96 h-96"
                style={{
                    background: `linear-gradient(315deg, ${accentColor} 0%, transparent 70%)`,
                    clipPath: 'polygon(100% 100%, 0 100%, 100% 0)',
                    opacity: 0.15
                }}
            />

            {/* Conteúdo */}
            <div className="relative z-10 h-full flex flex-col">
                {/* Título */}
                <div className="mb-12 text-center">
                    <h2 className="text-5xl font-extrabold">
                        <span style={{ color: textColor }}>alguns de nossos </span>
                        <span className="italic" style={{ color: accentColor }}>CLIENTES</span>
                    </h2>
                </div>

                {/* Grid de logos 5x4 */}
                <div className="flex-1 grid grid-cols-5 gap-8 overflow-y-auto pb-4">
                    {clients.map((client) => (
                        <div
                            key={client.id}
                            className="relative flex flex-col items-center justify-center group"
                        >
                            {/* Remove Button */}
                            <button
                                onClick={() => removeClient(client.id)}
                                className="absolute -top-2 -right-2 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                style={{ backgroundColor: accentColor, color: backgroundColor }}
                            >
                                <X size={14} />
                            </button>

                            {/* Logo placeholder ou imagem */}
                            <div
                                className="w-full aspect-video rounded-lg flex flex-col items-center justify-center mb-2 transition-all hover:scale-105"
                                style={{
                                    backgroundColor: textColor + '10',
                                    border: `1px solid ${textColor}20`
                                }}
                            >
                                {!client.logo ? (
                                    <>
                                        <Upload size={24} style={{ color: textColor, opacity: 0.3 }} className="mb-2" />
                                        <input
                                            type="text"
                                            value={client.name}
                                            onChange={(e) => handleClientChange(client.id, e.target.value)}
                                            onBlur={handleBlur}
                                            className="w-full text-center text-sm font-bold bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-offset-2 px-2"
                                            style={{ color: textColor, outlineColor: accentColor, opacity: 0.6 }}
                                            placeholder="Logo"
                                        />
                                    </>
                                ) : (
                                    <img
                                        src={client.logo}
                                        alt={client.name}
                                        className="w-full h-full object-contain p-2"
                                        style={{ filter: 'brightness(0) invert(1)' }} // Torna logo branca
                                    />
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Botão adicionar cliente */}
                    <button
                        onClick={addClient}
                        className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg hover:opacity-80 transition-opacity aspect-video"
                        style={{ borderColor: accentColor + '40', color: accentColor }}
                    >
                        <Plus size={28} />
                        <p className="text-xs font-medium mt-1">Adicionar</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
