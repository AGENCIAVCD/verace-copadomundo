export interface PricingCardProps {
    title: string;
    priceFrom: number;
    priceTo: number;
    onPriceFromChange?: (value: number) => void;
    onPriceToChange?: (value: number) => void;
    onTitleChange?: (value: string) => void;
    className?: string;
    editable?: boolean;
}

export function PricingCard({
    title,
    priceFrom,
    priceTo,
    onPriceFromChange,
    onPriceToChange,
    onTitleChange,
    className = '',
    editable = false,
}: PricingCardProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <div
            className={`relative flex flex-col items-center p-6 bg-transparent border-4 border-white rounded-3xl ${className}`}
        >
            {/* Badge amarelo */}
            <div className="absolute -top-4 px-6 py-2 bg-[#FFB500] rounded-full">
                <span className="text-sm font-bold text-black">
                    Valor do Investimento
                </span>
            </div>

            {/* Título do serviço */}
            <div className="mt-6 mb-6 text-center">
                {editable && onTitleChange ? (
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        className="w-full text-xl font-bold text-white text-center bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-[#FFB500]"
                    />
                ) : (
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                )}
            </div>

            {/* Preço DE (riscado) */}
            <div className="mb-2">
                <span className="text-white/70 text-sm">de:</span>
            </div>
            <div className="mb-4">
                {editable && onPriceFromChange ? (
                    <input
                        type="number"
                        value={priceFrom}
                        onChange={(e) => onPriceFromChange(parseFloat(e.target.value) || 0)}
                        className="w-full text-2xl font-medium text-white text-center bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-[#FFB500] line-through"
                    />
                ) : (
                    <p className="text-2xl font-medium text-white line-through">
                        {formatCurrency(priceFrom)}
                    </p>
                )}
            </div>

            {/* Preço POR */}
            <div className="mb-2">
                <span className="text-[#FFB500] text-sm font-bold">por:</span>
            </div>
            <div>
                {editable && onPriceToChange ? (
                    <input
                        type="number"
                        value={priceTo}
                        onChange={(e) => onPriceToChange(parseFloat(e.target.value) || 0)}
                        className="w-full text-4xl font-bold text-[#FFB500] text-center bg-transparent border-none outline-none focus:outline-2 focus:outline-dashed focus:outline-[#FFB500]"
                    />
                ) : (
                    <p className="text-4xl font-bold text-[#FFB500]">
                        {formatCurrency(priceTo)}
                    </p>
                )}
            </div>
        </div>
    );
}
