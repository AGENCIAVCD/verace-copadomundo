import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Save,
    Download,
    Settings,
    Eye,
    EyeOff,
    Plus,
    Package,
} from 'lucide-react';
import { useProposalsStore } from '../../proposals/stores/proposalsStore';
import { Button, Badge } from '../../../components/atoms';
import { ImageUploader } from '../../../components/molecules/ImageUploader';
import { ServiceSelector } from './ServiceSelector';
import { SlideRenderer } from './slides/SlideRenderer';
import type { Slide } from '../../../lib/types';
import type { Service } from '../data/serviceTemplates';
import { DEFAULT_PRICING_PLANS } from './slides/pricingDefaults';


export function EditorPage() {
    const { proposalId } = useParams<{ proposalId: string }>();
    const navigate = useNavigate();
    const { getProposal, updateProposal, updateSlideContent } = useProposalsStore();

    const proposal = proposalId ? getProposal(proposalId) : null;
    const [selectedSlideId, setSelectedSlideId] = useState<string | null>(
        proposal?.slides[0]?.id || null
    );
    const [isServiceSelectorOpen, setIsServiceSelectorOpen] = useState(false);
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);

    if (!proposal) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-display font-bold text-text-primary mb-4">
                        Proposta não encontrada
                    </h2>
                    <Button onClick={() => navigate('/dashboard')}>
                        Voltar ao Dashboard
                    </Button>
                </div>
            </div>
        );
    }

    const selectedSlide = proposal.slides.find((s) => s.id === selectedSlideId);

    const updateSelectedSlideContent = (updates: Partial<Slide['content']>) => {
        if (!selectedSlide) return;
        updateSlideContent(proposal.id, selectedSlide.id, {
            ...selectedSlide.content,
            ...updates,
        });
    };

    const parsePercentInput = (value: string) => {
        const parsed = Number(value.replace(',', '.'));
        return Number.isFinite(parsed) ? parsed : 0;
    };

    const defaultPricingPlans = useMemo(() => DEFAULT_PRICING_PLANS, []);
    const googleFonts = useMemo(
        () => [
            'Poppins',
            'Inter',
            'DM Sans',
            'Manrope',
            'Montserrat',
            'Outfit',
            'Sora',
            'Space Grotesk',
            'Urbanist',
            'Playfair Display',
            'Bebas Neue',
        ],
        []
    );

    const brandPalette = {
        background: '#0B0B0B',
        text: '#FFFFFF',
        accent: '#FFB500',
    };

    const handleToggleSlideVisibility = (slideId: string) => {
        const updatedSlides = proposal.slides.map((slide) =>
            slide.id === slideId ? { ...slide, isVisible: !slide.isVisible } : slide
        );
        updateProposal(proposal.id, { slides: updatedSlides });
    };

    const handleServicesChange = (services: Service[]) => {
        setSelectedServices(services);
        // Store in slide content (will be accessed by ServicesSlide)
        // Don't update proposal.services directly as it has a different structure
    };

    const handleLogoUpload = (logo: string) => {
        updateProposal(proposal.id, { clientLogo: logo });
    };

    const getSlideTitle = (slide: Slide) => {
        const titles: Record<Slide['type'], string> = {
            cover: 'Capa',
            about: 'Quem Somos',
            differentials: 'Diferenciais',
            services: 'Serviços',
            pricing: 'Tabela de Preços',
            conditions: 'Condições Comerciais',
            timeline: 'Cronograma',
            notes: 'Observações',
            closing: 'Encerramento',
            process: 'Como Fazemos',
            clients: 'Clientes',
            'service-tiers': 'Pacotes de Serviços',
        };
        return titles[slide.type];
    };

    const pricingPlans =
        selectedSlide?.content.pricingPlans?.length
            ? selectedSlide.content.pricingPlans
            : defaultPricingPlans;

    const pricingScalePercent = selectedSlide?.content.pricingScalePercent ?? 100;
    const pricingDiscountPercent = selectedSlide?.content.pricingDiscountPercent ?? 20;
    const pricingApplyPromotion = selectedSlide?.content.pricingApplyPromotion ?? true;
    const slideFontWeight = selectedSlide?.content.fontWeight ?? 600;
    const slideFontStyle = selectedSlide?.content.fontStyle ?? 'normal';

    return (
        <div className="h-screen flex flex-col bg-background">
            {/* Toolbar */}
            <header className="border-b border-border bg-surface/50 backdrop-blur-xl flex-shrink-0">
                <div className="px-6 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                icon={<ArrowLeft size={18} />}
                                onClick={() => navigate('/dashboard')}
                            >
                                Voltar
                            </Button>

                            <div className="h-6 w-px bg-border" />

                            <div>
                                <h1 className="text-lg font-display font-semibold text-text-primary">
                                    {proposal.clientName}
                                </h1>
                                <p className="text-xs text-text-tertiary">
                                    Proposta Comercial
                                </p>
                            </div>

                            <Badge variant={proposal.status}>
                                {proposal.status === 'draft' && 'Rascunho'}
                                {proposal.status === 'sent' && 'Enviada'}
                                {proposal.status === 'closed' && 'Fechada'}
                            </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                icon={<Settings size={18} />}
                            >
                                Configurações
                            </Button>

                            <Button
                                variant="secondary"
                                size="sm"
                                icon={<Save size={18} />}
                            >
                                Salvar
                            </Button>

                            <Button
                                variant="primary"
                                size="sm"
                                icon={<Download size={18} />}
                            >
                                Exportar PDF
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Editor Layout */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar: Slides */}
                <div className="w-64 border-r border-border bg-surface/30 overflow-y-auto scrollbar-hide flex-shrink-0">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-text-primary">
                                Slides ({proposal.slides.length})
                            </h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                icon={<Plus size={14} />}
                                className="text-xs"
                            >
                                Adicionar
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <AnimatePresence>
                                {proposal.slides.map((slide, index) => (
                                    <motion.div
                                        key={slide.id}
                                        layoutId={slide.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ delay: index * 0.03 }}
                                    >
                                        <div
                                            onClick={() => setSelectedSlideId(slide.id)}
                                            className={`
                        p-3 rounded-lg border cursor-pointer smooth-transition
                        ${selectedSlideId === slide.id
                                                    ? 'bg-primary/10 border-primary'
                                                    : 'bg-surface border-border hover:border-border-light'
                                                }
                      `}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-medium text-text-secondary">
                                                    {index + 1}
                                                </span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleToggleSlideVisibility(slide.id);
                                                    }}
                                                    className="text-text-tertiary hover:text-text-primary smooth-transition"
                                                >
                                                    {slide.isVisible ? (
                                                        <Eye size={14} />
                                                    ) : (
                                                        <EyeOff size={14} />
                                                    )}
                                                </button>
                                            </div>

                                            <p className="text-sm font-medium text-text-primary">
                                                {getSlideTitle(slide)}
                                            </p>

                                            {!slide.isVisible && (
                                                <span className="text-xs text-text-muted">Oculto</span>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Canvas */}
                <div className="flex-1 overflow-y-auto bg-background-secondary p-8">
                    <div className="max-w-5xl mx-auto space-y-4">
                        {/* Appearance bar (Canva-style) */}
                        {selectedSlide && (
                            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-surface/60 px-4 py-3">
                                <select
                                    value={selectedSlide.content.fontFamily || 'Poppins'}
                                    onChange={(e) =>
                                        updateSelectedSlideContent({ fontFamily: e.target.value })
                                    }
                                    className="px-3 py-2 bg-surface text-text-primary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    {googleFonts.map((font) => (
                                        <option key={font} value={font}>
                                            {font}
                                        </option>
                                    ))}
                                </select>

                                <div className="h-6 w-px bg-border" />

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateSelectedSlideContent({
                                                fontWeight: slideFontWeight >= 700 ? 500 : 700,
                                            })
                                        }
                                        className={`px-3 py-2 rounded-lg border text-sm font-semibold ${
                                            slideFontWeight >= 700
                                                ? 'bg-primary text-black border-primary'
                                                : 'text-text-secondary border-border'
                                        }`}
                                    >
                                        B
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateSelectedSlideContent({
                                                fontStyle:
                                                    slideFontStyle === 'italic' ? 'normal' : 'italic',
                                            })
                                        }
                                        className={`px-3 py-2 rounded-lg border text-sm italic ${
                                            slideFontStyle === 'italic'
                                                ? 'bg-primary text-black border-primary'
                                                : 'text-text-secondary border-border'
                                        }`}
                                    >
                                        I
                                    </button>
                                </div>

                                <div className="h-6 w-px bg-border" />

                                <div className="flex items-center gap-2 text-xs text-text-secondary">
                                    <span>Fundo</span>
                                    <label className="relative h-8 w-8 cursor-pointer">
                                        <input
                                            type="color"
                                            value={selectedSlide.content.backgroundColor || brandPalette.background}
                                            onChange={(e) =>
                                                updateSelectedSlideContent({ backgroundColor: e.target.value })
                                            }
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <span
                                            className="absolute inset-0 rounded-md border border-border shadow-sm"
                                            style={{
                                                backgroundColor:
                                                    selectedSlide.content.backgroundColor ||
                                                    brandPalette.background,
                                            }}
                                        />
                                    </label>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-text-secondary">
                                    <span>Texto</span>
                                    <label className="relative h-8 w-8 cursor-pointer">
                                        <input
                                            type="color"
                                            value={selectedSlide.content.textColor || brandPalette.text}
                                            onChange={(e) =>
                                                updateSelectedSlideContent({ textColor: e.target.value })
                                            }
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <span
                                            className="absolute inset-0 rounded-md border border-border shadow-sm"
                                            style={{
                                                backgroundColor:
                                                    selectedSlide.content.textColor || brandPalette.text,
                                            }}
                                        />
                                    </label>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-text-secondary">
                                    <span>Destaque</span>
                                    <label className="relative h-8 w-8 cursor-pointer">
                                        <input
                                            type="color"
                                            value={selectedSlide.content.accentColor || brandPalette.accent}
                                            onChange={(e) =>
                                                updateSelectedSlideContent({ accentColor: e.target.value })
                                            }
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <span
                                            className="absolute inset-0 rounded-md border border-border shadow-sm"
                                            style={{
                                                backgroundColor:
                                                    selectedSlide.content.accentColor || brandPalette.accent,
                                            }}
                                        />
                                    </label>
                                </div>

                                <div className="ml-auto">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateSelectedSlideContent({
                                                backgroundColor: brandPalette.background,
                                                textColor: brandPalette.text,
                                                accentColor: brandPalette.accent,
                                            })
                                        }
                                        className="text-xs px-3 py-1.5 rounded-full border border-border text-text-secondary hover:text-text-primary"
                                    >
                                        VCD
                                    </button>
                                </div>
                            </div>
                        )}

                        <motion.div
                            key={selectedSlideId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-lg shadow-premium aspect-[16/9] overflow-hidden"
                            style={
                                selectedSlide?.content.fontFamily
                                    ? ({
                                          '--font-display': selectedSlide.content.fontFamily,
                                          '--font-sans': selectedSlide.content.fontFamily,
                                          fontWeight: slideFontWeight,
                                          fontStyle: slideFontStyle,
                                      } as CSSProperties)
                                    : ({
                                          fontWeight: slideFontWeight,
                                          fontStyle: slideFontStyle,
                                      } as CSSProperties)
                            }
                        >
                            {selectedSlide && (
                                <SlideRenderer
                                    slide={selectedSlide}
                                    onUpdate={(content) => updateSlideContent(proposal.id, selectedSlide.id, content)}
                                />
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Properties Panel */}
                <div className="w-80 border-l border-border bg-surface/30 overflow-y-auto scrollbar-hide flex-shrink-0">
                    <div className="p-4">
                        <h3 className="text-sm font-semibold text-text-primary mb-4">
                            Propriedades
                        </h3>

                        {/* Proposal-Level Settings (when no slide selected) */}
                        {!selectedSlide && (
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                                        🏢 Configurações da Proposta
                                    </h4>

                                    {/* Client Logo */}
                                    <div className="mb-4">
                                        <label className="block text-xs font-medium text-text-secondary mb-2">
                                            Logo do Cliente
                                        </label>
                                        <ImageUploader
                                            currentImage={proposal.clientLogo}
                                            onImageUpload={handleLogoUpload}
                                            aspectRatio="1:1"
                                            maxSizeMB={2}
                                            placeholder="Logo do cliente (aparecerá na capa)"
                                        />
                                    </div>

                                    {/* Manage Services Button */}
                                    <div>
                                        <label className="block text-xs font-medium text-text-secondary mb-2">
                                            Serviços Incluídos
                                        </label>
                                        <button
                                            onClick={() => setIsServiceSelectorOpen(true)}
                                            className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 font-medium"
                                        >
                                            <Package size={18} />
                                            Gerenciar Serviços ({selectedServices.length})
                                        </button>
                                        {selectedServices.length > 0 && (
                                            <p className="text-xs text-text-secondary mt-2">
                                                {selectedServices.map(s => s.name).join(', ')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedSlide && (
                            <>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-text-secondary mb-2">
                                            Tipo
                                        </label>
                                        <p className="text-sm text-text-primary">
                                            {getSlideTitle(selectedSlide)}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-text-secondary mb-2">
                                            Visibilidade
                                        </label>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => handleToggleSlideVisibility(selectedSlide.id)}
                                            icon={selectedSlide.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                                            className="w-full"
                                        >
                                            {selectedSlide.isVisible ? 'Visível' : 'Oculto'}
                                        </Button>
                                    </div>
                                </div>

                                {/* Slide-specific editor */}
                                <div className="mt-5 pt-5 border-t border-border space-y-4">
                                    <h4 className="text-sm font-semibold text-text-primary mb-1">
                                        Edição do Slide
                                    </h4>

                                    {selectedSlide.type === 'pricing' && (
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="block text-xs font-medium text-text-secondary">
                                                    Título
                                                </label>
                                                <input
                                                    type="text"
                                                    value={selectedSlide.content.title || 'Planos de Investimento'}
                                                    onChange={(e) =>
                                                        updateSelectedSlideContent({ title: e.target.value })
                                                    }
                                                    className="w-full px-3 py-2 bg-surface text-text-primary border border-border rounded-lg text-sm"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-xs font-medium text-text-secondary">
                                                    Subtítulo
                                                </label>
                                                <textarea
                                                    value={
                                                        selectedSlide.content.subtitle ||
                                                        'Escolha o plano ideal e escale com segurança'
                                                    }
                                                    onChange={(e) =>
                                                        updateSelectedSlideContent({ subtitle: e.target.value })
                                                    }
                                                    className="w-full px-3 py-2 bg-surface text-text-primary border border-border rounded-lg text-sm resize-none"
                                                    rows={3}
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="space-y-2">
                                                    <label className="block text-xs font-medium text-text-secondary">
                                                        Escala geral (%)
                                                    </label>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateSelectedSlideContent({
                                                                    pricingScalePercent: Math.max(
                                                                        0,
                                                                        Math.round(pricingScalePercent - 10)
                                                                    ),
                                                                })
                                                            }
                                                            className="w-8 h-8 rounded-full border border-border text-text-primary"
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="text"
                                                            value={pricingScalePercent}
                                                            onChange={(e) =>
                                                                updateSelectedSlideContent({
                                                                    pricingScalePercent: parsePercentInput(
                                                                        e.target.value
                                                                    ),
                                                                })
                                                            }
                                                            className="flex-1 text-center px-2 py-2 bg-surface text-text-primary border border-border rounded-lg text-sm"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateSelectedSlideContent({
                                                                    pricingScalePercent: Math.round(
                                                                        pricingScalePercent + 10
                                                                    ),
                                                                })
                                                            }
                                                            className="w-8 h-8 rounded-full border border-border text-text-primary"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-xs font-medium text-text-secondary">
                                                        Promoção
                                                    </label>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateSelectedSlideContent({
                                                                pricingApplyPromotion: !pricingApplyPromotion,
                                                            })
                                                        }
                                                        className={`w-full px-3 py-2 rounded-lg border text-sm font-medium ${
                                                            pricingApplyPromotion
                                                                ? 'bg-primary text-black border-primary'
                                                                : 'bg-surface text-text-secondary border-border'
                                                        }`}
                                                    >
                                                        {pricingApplyPromotion ? 'Ativa' : 'Desativada'}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-xs font-medium text-text-secondary">
                                                    Desconto (%)
                                                </label>
                                                <div className="flex items-center gap-2">
                                                    {[10, 20, 30].map((value) => (
                                                        <button
                                                            key={value}
                                                            type="button"
                                                            onClick={() =>
                                                                updateSelectedSlideContent({
                                                                    pricingDiscountPercent: value,
                                                                })
                                                            }
                                                            className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                                                                Math.round(pricingDiscountPercent) === value
                                                                    ? 'bg-white text-black border-white'
                                                                    : 'text-text-secondary border-border'
                                                            }`}
                                                        >
                                                            {value}%
                                                        </button>
                                                    ))}
                                                    <input
                                                        type="text"
                                                        value={pricingDiscountPercent}
                                                        onChange={(e) =>
                                                            updateSelectedSlideContent({
                                                                pricingDiscountPercent: parsePercentInput(
                                                                    e.target.value
                                                                ),
                                                            })
                                                        }
                                                        className="w-16 text-center px-2 py-1.5 bg-surface text-text-primary border border-border rounded-lg text-xs"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                {pricingPlans.map((plan, index) => (
                                                    <div
                                                        key={plan.id}
                                                        className="p-3 rounded-lg border border-border bg-surface/60 space-y-2"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <label className="text-xs font-semibold text-text-secondary">
                                                                Plano {index + 1}
                                                            </label>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const updated = pricingPlans.map((item, i) =>
                                                                        i === index
                                                                            ? { ...item, highlight: !item.highlight }
                                                                            : { ...item, highlight: false }
                                                                    );
                                                                    updateSelectedSlideContent({
                                                                        pricingPlans: updated,
                                                                    });
                                                                }}
                                                                className={`text-xs px-2 py-1 rounded-full border ${
                                                                    plan.highlight
                                                                        ? 'bg-primary text-black border-primary'
                                                                        : 'text-text-secondary border-border'
                                                                }`}
                                                            >
                                                                {plan.highlight ? 'Destaque' : 'Normal'}
                                                            </button>
                                                        </div>

                                                        <input
                                                            type="text"
                                                            value={plan.name}
                                                            onChange={(e) => {
                                                                const updated = pricingPlans.map((item, i) =>
                                                                    i === index
                                                                        ? { ...item, name: e.target.value }
                                                                        : item
                                                                );
                                                                updateSelectedSlideContent({
                                                                    pricingPlans: updated,
                                                                });
                                                            }}
                                                            className="w-full px-3 py-2 bg-surface text-text-primary border border-border rounded-lg text-sm"
                                                        />

                                                        <input
                                                            type="number"
                                                            value={plan.basePrice}
                                                            onChange={(e) => {
                                                                const updated = pricingPlans.map((item, i) =>
                                                                    i === index
                                                                        ? {
                                                                              ...item,
                                                                              basePrice:
                                                                                  parseFloat(e.target.value) || 0,
                                                                          }
                                                                        : item
                                                                );
                                                                updateSelectedSlideContent({
                                                                    pricingPlans: updated,
                                                                });
                                                            }}
                                                            className="w-full px-3 py-2 bg-surface text-text-primary border border-border rounded-lg text-sm"
                                                        />

                                                        <textarea
                                                            value={plan.description || ''}
                                                            onChange={(e) => {
                                                                const updated = pricingPlans.map((item, i) =>
                                                                    i === index
                                                                        ? { ...item, description: e.target.value }
                                                                        : item
                                                                );
                                                                updateSelectedSlideContent({
                                                                    pricingPlans: updated,
                                                                });
                                                            }}
                                                            className="w-full px-3 py-2 bg-surface text-text-primary border border-border rounded-lg text-sm resize-none"
                                                            rows={2}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {selectedSlide.type === 'cover' && (
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                value={selectedSlide.content.title || 'Proposta Comercial'}
                                                onChange={(e) =>
                                                    updateSelectedSlideContent({ title: e.target.value })
                                                }
                                                className="w-full px-3 py-2 bg-surface text-text-primary border border-border rounded-lg text-sm"
                                                placeholder="Título"
                                            />
                                            <input
                                                type="text"
                                                value={selectedSlide.content.clientName || ''}
                                                onChange={(e) =>
                                                    updateSelectedSlideContent({ clientName: e.target.value })
                                                }
                                                className="w-full px-3 py-2 bg-surface text-text-primary border border-border rounded-lg text-sm"
                                                placeholder="Nome do Cliente"
                                            />
                                            <input
                                                type="text"
                                                value={selectedSlide.content.subtitle || 'Apresentação de Serviços'}
                                                onChange={(e) =>
                                                    updateSelectedSlideContent({ subtitle: e.target.value })
                                                }
                                                className="w-full px-3 py-2 bg-surface text-text-primary border border-border rounded-lg text-sm"
                                                placeholder="Subtítulo"
                                            />
                                            <input
                                                type="text"
                                                value={selectedSlide.content.companyName || 'Você Digital Propaganda'}
                                                onChange={(e) =>
                                                    updateSelectedSlideContent({ companyName: e.target.value })
                                                }
                                                className="w-full px-3 py-2 bg-surface text-text-primary border border-border rounded-lg text-sm"
                                                placeholder="Empresa"
                                            />
                                        </div>
                                    )}

                                    {selectedSlide.type === 'about' && (
                                        <textarea
                                            value={
                                                selectedSlide.content.text ||
                                                'A Você Digital Propaganda é uma agência criativa especializada em soluções digitais inovadoras.'
                                            }
                                            onChange={(e) =>
                                                updateSelectedSlideContent({ text: e.target.value })
                                            }
                                            className="w-full px-3 py-2 bg-surface text-text-primary border border-border rounded-lg text-sm resize-none"
                                            rows={6}
                                        />
                                    )}

                                    {selectedSlide.type === 'differentials' && (
                                        <textarea
                                            value={
                                                (selectedSlide.content.items || [
                                                    'Equipe experiente e dedicada',
                                                    'Atendimento personalizado',
                                                    'Resultados mensuráveis',
                                                    'Inovação constante',
                                                ]).join('\\n')
                                            }
                                            onChange={(e) =>
                                                updateSelectedSlideContent({
                                                    items: e.target.value
                                                        .split('\\n')
                                                        .map((item) => item.trim())
                                                        .filter(Boolean),
                                                })
                                            }
                                            className="w-full px-3 py-2 bg-surface text-text-primary border border-border rounded-lg text-sm resize-none"
                                            rows={6}
                                        />
                                    )}

                                    {selectedSlide.type === 'conditions' && (
                                        <textarea
                                            value={
                                                selectedSlide.content.text ||
                                                'Pagamento: 50% início + 50% entrega\\nPrazo: 30 dias\\nValidade: 15 dias'
                                            }
                                            onChange={(e) =>
                                                updateSelectedSlideContent({ text: e.target.value })
                                            }
                                            className="w-full px-3 py-2 bg-surface text-text-primary border border-border rounded-lg text-sm resize-none"
                                            rows={6}
                                        />
                                    )}

                                    {selectedSlide.type === 'notes' && (
                                        <textarea
                                            value={selectedSlide.content.text || ''}
                                            onChange={(e) =>
                                                updateSelectedSlideContent({ text: e.target.value })
                                            }
                                            className="w-full px-3 py-2 bg-surface text-text-primary border border-border rounded-lg text-sm resize-none"
                                            rows={6}
                                        />
                                    )}

                                    {selectedSlide.type === 'closing' && (
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                value={
                                                    selectedSlide.content.cta ||
                                                    'Vamos transformar sua presença digital?'
                                                }
                                                onChange={(e) =>
                                                    updateSelectedSlideContent({ cta: e.target.value })
                                                }
                                                className="w-full px-3 py-2 bg-surface text-text-primary border border-border rounded-lg text-sm"
                                                placeholder="CTA"
                                            />
                                            <input
                                                type="text"
                                                value={
                                                    selectedSlide.content.contact ||
                                                    'contato@vocedigital.com | (11) 99999-9999'
                                                }
                                                onChange={(e) =>
                                                    updateSelectedSlideContent({ contact: e.target.value })
                                                }
                                                className="w-full px-3 py-2 bg-surface text-text-primary border border-border rounded-lg text-sm"
                                                placeholder="Contato"
                                            />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Service Selector Modal */}
            {isServiceSelectorOpen && (
                <ServiceSelector
                    selectedServices={selectedServices}
                    onServicesChange={handleServicesChange}
                    onClose={() => setIsServiceSelectorOpen(false)}
                />
            )}
        </div>
    );
}
