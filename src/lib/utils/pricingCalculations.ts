import type { Service, ProposalService } from '../types';

export function calculateSubtotal(
    services: ProposalService[],
    servicesData: Service[]
): number {
    return services.reduce((total, proposalService) => {
        if (proposalService.isBonified) return total;

        const service = servicesData.find(s => s.id === proposalService.serviceId);
        if (!service) return total;

        const serviceTotal = service.basePrice * proposalService.quantity;
        return total + serviceTotal;
    }, 0);
}

export function applyDiscount(
    subtotal: number,
    discount?: { type: 'percentage' | 'fixed'; value: number }
): number {
    if (!discount) return 0;

    if (discount.type === 'percentage') {
        return subtotal * (discount.value / 100);
    }

    return discount.value;
}

export function calculateTotal(
    services: ProposalService[],
    servicesData: Service[],
    globalDiscount?: { type: 'percentage' | 'fixed'; value: number }
): { subtotal: number; discount: number; total: number } {
    const subtotal = calculateSubtotal(services, servicesData);
    const discount = applyDiscount(subtotal, globalDiscount);
    const total = subtotal - discount;

    return {
        subtotal,
        discount,
        total,
    };
}
