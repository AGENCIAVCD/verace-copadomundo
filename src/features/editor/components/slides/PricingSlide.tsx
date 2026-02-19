import type { Slide } from '../../../../lib/types';
import { BrushStroke } from '../../../../components/atoms/BrushStroke';
import { Card, CardContent, CardHeader } from '../../../../components/ui/card';
import NumberFlow from '@number-flow/react';
import { DEFAULT_PRICING_PLANS } from './pricingDefaults';

export interface PricingSlideProps {
    slide: Slide;
}

interface PricingPlan {
    id: string;
    name: string;
    basePrice: number;
    description?: string;
    highlight?: boolean;
}

export function PricingSlide({ slide }: PricingSlideProps) {
    const title = slide.content.title || 'Planos de Investimento';
    const subtitle =
        slide.content.subtitle ||
        'Escolha o plano ideal e escale com segurança';
    const plans: PricingPlan[] = slide.content.pricingPlans?.length
        ? slide.content.pricingPlans
        : DEFAULT_PRICING_PLANS;
    const scalePercent = slide.content.pricingScalePercent ?? 100;
    const discountPercent = slide.content.pricingDiscountPercent ?? 20;
    const applyPromotion = slide.content.pricingApplyPromotion ?? true;

    const backgroundColor = slide.content.backgroundColor || '#0B0B0B';
    const textColor = slide.content.textColor || '#FFFFFF';
    const accentColor = slide.content.accentColor || '#FFB500';

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            maximumFractionDigits: 0,
        }).format(value);

    const planPrices = plans.map((plan) => {
        const scaledPrice = Math.round(plan.basePrice * (scalePercent / 100));
        const discountedPrice = Math.round(
            scaledPrice * (1 - discountPercent / 100)
        );
        return {
            scaledPrice,
            discountedPrice,
        };
    });

    return (
        <div
            className="w-full h-full p-10 relative overflow-hidden flex flex-col gap-8"
            style={{ backgroundColor }}
        >
            <BrushStroke
                variant="horizontal"
                color={accentColor}
                opacity={0.15}
                position="top"
                className="top-0"
            />

            <div className="text-left max-w-3xl">
                <h2
                    className="text-4xl md:text-5xl font-extrabold mb-3"
                    style={{ color: textColor }}
                >
                    {title}
                </h2>
                <p className="text-base md:text-lg text-white/70" style={{ color: textColor }}>
                    {subtitle}
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
                {plans.map((plan, index) => {
                    const prices = planPrices[index];
                    const displayPrice = applyPromotion
                        ? prices.discountedPrice
                        : prices.scaledPrice;
                    return (
                        <Card
                            key={plan.id}
                            className={`relative overflow-hidden border ${
                                plan.highlight
                                    ? 'ring-2 ring-offset-0 bg-white/10 border-white/30'
                                    : 'bg-white/5 border-white/10'
                            }`}
                            style={{
                                boxShadow: plan.highlight
                                    ? `0 0 30px ${accentColor}40`
                                    : undefined,
                            }}
                        >
                            <CardHeader className="text-left">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3
                                            className="text-2xl md:text-3xl font-semibold mb-2"
                                            style={{ color: textColor }}
                                        >
                                            {plan.name}
                                        </h3>
                                        {plan.description && (
                                            <p className="text-sm text-white/70">
                                                {plan.description}
                                            </p>
                                        )}
                                    </div>
                                    {plan.highlight && (
                                        <span
                                            className="px-3 py-1 rounded-full text-xs font-semibold"
                                            style={{
                                                backgroundColor: accentColor,
                                                color: '#000000',
                                            }}
                                        >
                                            Mais escolhido
                                        </span>
                                    )}
                                </div>

                                <div className="mt-4 flex items-end gap-2">
                                    <span className="text-4xl font-semibold" style={{ color: textColor }}>
                                        R$
                                    </span>
                                    <NumberFlow
                                        value={displayPrice}
                                        className="text-5xl font-semibold"
                                        style={{ color: textColor }}
                                    />
                                    <span className="text-sm text-white/60 mb-2">
                                        /mês
                                    </span>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-0">
                                {applyPromotion && (
                                    <div className="mb-4 text-xs text-white/60">
                                        <span className="line-through mr-2">
                                            {formatCurrency(prices.scaledPrice)}
                                        </span>
                                        <span style={{ color: accentColor }}>
                                            {discountPercent}% OFF
                                        </span>
                                    </div>
                                )}

                                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                                    <p className="font-medium text-white mb-2">
                                        O que está incluso
                                    </p>
                                    <ul className="space-y-2">
                                        <li>Setup estratégico e briefing inicial</li>
                                        <li>Gestão e otimizações mensais</li>
                                        <li>Relatórios e recomendações</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
