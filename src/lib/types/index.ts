// User types
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'vendor' | 'co-vendor';
    avatar?: string;
}

// Co-vendor types
export interface CoVendor {
    id: string;
    name: string;
    role: string;
    splitPercentage: number;
}

// Service types
export interface Service {
    id: string;
    name: string;
    category: string;
    basePrice: number;
    description?: string;
    icon: string;
}

// Proposal Service (service added to a proposal)
export interface ProposalService {
    serviceId: string;
    quantity: number;
    discount?: {
        type: 'percentage' | 'fixed';
        value: number;
    };
    isBonified: boolean;
}

// Pricing
export interface Pricing {
    subtotal: number;
    discount: number;
    total: number;
    specialConditions?: string;
}

// Slide types
export type SlideType =
    | 'cover'
    | 'about'
    | 'differentials'
    | 'services'
    | 'pricing'
    | 'conditions'
    | 'timeline'
    | 'notes'
    | 'closing'
    | 'process'
    | 'clients'
    | 'service-tiers';

// Slide content customization
export interface SlideCustomization {
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
    fontFamily?: string;
    fontSize?: number;
    template?: string;
    fontWeight?: number;
    fontStyle?: 'normal' | 'italic';
}

// Image support for slides
export interface SlideImages {
    coverImage?: string; // base64
    teamImage?: string;
    productImages?: string[];
    clientLogos?: string[];
}

// Slide content by type
export interface SlideContent extends SlideCustomization {
    // Common fields
    title?: string;
    subtitle?: string;
    text?: string;
    highlightText?: string;

    // Type-specific fields
    clientName?: string; // cover
    companyName?: string; // cover
    items?: string[]; // differentials, conditions
    cta?: string; // closing
    contact?: string; // closing

    // Images
    coverImage?: string;
    teamImage?: string;
    productImage?: string;

    // Services data
    services?: Service[];
    processSteps?: any[];
    clients?: any[];

    // Pricing data (for PricingSlide)
    pricingPlans?: {
        id: string;
        name: string;
        basePrice: number;
        description?: string;
        highlight?: boolean;
    }[];
    pricingScalePercent?: number;
    pricingDiscountPercent?: number;
    pricingApplyPromotion?: boolean;
    discountNote?: string;

    // Allow additional fields
    [key: string]: any;
}

export interface Slide {
    id: string;
    type: SlideType;
    order: number;
    isVisible: boolean;
    isRemovable: boolean;
    content: SlideContent;
}

// Proposal
export type ProposalStatus = 'draft' | 'sent' | 'closed';

export interface Proposal {
    id: string;
    clientName: string;
    clientLogo?: string; // base64 logo
    createdAt: Date;
    updatedAt: Date;
    status: ProposalStatus;
    vendorId: string;
    coVendors: CoVendor[];
    slides: Slide[];
    services: ProposalService[];
    pricing: Pricing;
}
