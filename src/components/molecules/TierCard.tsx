export interface TierCardProps {
    name: string;
    features: Array<{ text: string; enabled: boolean }>;
    priceFrom: number;
    priceTo: number;
    highlighted?: boolean;
    onNameChange?: (value: string) => void;
    onPriceFromChange?: (value: number) => void;
    onPriceToChange?: (value: number) => void;
    onFeaturesChange?: (features: Array<{ text: string; enabled: boolean }>) => void;
    editable?: boolean;
}

export function TierCard({
    name,
    features,
    priceFrom,
    priceTo,
    highlighted = false,
    onNameChange,
    onPriceFromChange,
    onPriceToChange,
    onFeaturesChange,
    editable = false,
}: TierCardProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const toggleFeature = (index: number) => {
        if (!editable || !onFeaturesChange) return;
        const newFeatures = [...features];
        newFeatures[index].enabled = !newFeatures[index].enabled;
        onFeaturesChange(newFeatures);
    };

    return (
        <div
            className={`relative flex flex-col p-6 bg-transparent rounded-3xl ${highlighted
                    ? 'border-[6px] border-white'
                    : 'border-4 border-white/50'
                }`}
        >
            {/* Nome do Tier - Badge amarelo */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-8 py-2 bg-[#FFB500] rounded-full">
                {editable && onNameChange ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                        className="text-base font-bold text-black text-center bg-transparent border-none outline-none min-w-[100px]"
                    />
                ) : (
                    <span className="text-base font-bold text-black">{name}</span>
                )}
            </div>

            {/* Features List */}
            <div className="mt-8 mb-6 flex-1">
                <ul className="space-y-2">
                    {features.map((feature, index) => (
                        <li
                            key={index}
                            className={`flex items-center text-sm ${feature.enabled ? 'text-white' : 'text-white/40 line-through'
                                }`}
                            onClick={() => toggleFeature(index)}
                        >
                            <span className="mr-2">•</span>
                            <span>{feature.text}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Pacote Mensal Label */}
            <div className="mb-3 text-center">
                <p className="text-xs text-white/70">*Pacote Mensal:</p>
            </div>

            {/* Preço DE (riscado) */}
            <div className="mb-1 text-center">
                {editable && onPriceFromChange ? (
                    <input
                        type="number"
                        value={priceFrom}
                        onChange={(e) => onPriceFromChange(parseFloat(e.target.value) || 0)}
                        className="w-full text-base font-medium text-white/70 text-center bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-[#FFB500] line-through"
                    />
                ) : (
                    <p className="text-base font-medium text-white/70 line-through">
                        de: {formatCurrency(priceFrom)}
                    </p>
                )}
            </div>

            {/* Preço POR */}
            <div className="text-center">
                <span className="text-sm font-bold text-[#FFB500]">por:</span>
            </div>
            <div className="text-center">
                {editable && onPriceToChange ? (
                    <input
                        type="number"
                        value={priceTo}
                        onChange={(e) => onPriceToChange(parseFloat(e.target.value) || 0)}
                        className="w-full text-3xl font-bold text-[#FFB500] text-center bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-[#FFB500]"
                    />
                ) : (
                    <p className="text-3xl font-bold text-[#FFB500]">
                        {formatCurrency(priceTo)}
                    </p>
                )}
            </div>
        </div>
    );
}
