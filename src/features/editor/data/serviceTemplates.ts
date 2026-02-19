// Service templates and categories
export interface Service {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
    price?: number;
    isSelected: boolean;
}

export const SERVICE_CATEGORIES = {
    marketing: 'Marketing Digital',
    web: 'Desenvolvimento Web',
    design: 'Design & Branding',
    content: 'Produção de Conteúdo',
    automation: 'Automação',
} as const;

export const SERVICE_TEMPLATES: Service[] = [
    // Marketing Digital
    {
        id: 'google-ads',
        name: 'Google Ads',
        description: 'Anúncios nos canais do Google',
        icon: 'globe',
        category: 'marketing',
        isSelected: false,
    },
    {
        id: 'facebook-ads',
        name: 'Facebook Ads',
        description: 'Anúncios na plataforma do Facebook',
        icon: 'facebook',
        category: 'marketing',
        isSelected: false,
    },
    {
        id: 'instagram-ads',
        name: 'Instagram Ads',
        description: 'Anúncios no Instagram',
        icon: 'instagram',
        category: 'marketing',
        isSelected: false,
    },
    {
        id: 'linkedin-ads',
        name: 'LinkedIn Ads',
        description: 'Anúncios profissionais no LinkedIn',
        icon: 'linkedin',
        category: 'marketing',
        isSelected: false,
    },
    {
        id: 'tiktok-ads',
        name: 'TikTok Ads',
        description: 'Anúncios em vídeo no TikTok',
        icon: 'video',
        category: 'marketing',
        isSelected: false,
    },
    {
        id: 'traffic-management',
        name: 'Gestão de Tráfego Pago',
        description: 'Gerenciamento completo de campanhas pagas',
        icon: 'trending-up',
        category: 'marketing',
        isSelected: false,
    },

    // Web Development
    {
        id: 'website-multipage',
        name: 'Website Multipage',
        description: 'Desenvolvimento de site institucional personalizado',
        icon: 'globe',
        category: 'web',
        isSelected: false,
    },
    {
        id: 'ecommerce',
        name: 'E-commerce',
        description: 'Loja virtual completa',
        icon: 'shopping-cart',
        category: 'web',
        isSelected: false,
    },
    {
        id: 'landing-page',
        name: 'Landing Page',
        description: 'Página de conversão otimizada',
        icon: 'file-text',
        category: 'web',
        isSelected: false,
    },
    {
        id: 'seo',
        name: 'SEO',
        description: 'Otimização para mecanismos de busca',
        icon: 'search',
        category: 'web',
        isSelected: false,
    },

    // Design & Branding
    {
        id: 'brand-identity',
        name: 'Identidade Visual',
        description: 'Criação de marca impactante no mercado',
        icon: 'eye',
        category: 'design',
        isSelected: false,
    },
    {
        id: 'logo-design',
        name: 'Design de Logo',
        description: 'Criação de logotipo profissional',
        icon: 'award',
        category: 'design',
        isSelected: false,
    },
    {
        id: 'social-media-design',
        name: 'Design para Mídias Sociais',
        description: 'Artes e posts para redes sociais',
        icon: 'share-2',
        category: 'design',
        isSelected: false,
    },
    {
        id: 'infographics',
        name: 'Infográficos',
        description: 'Conteúdo visual informativo',
        icon: 'bar-chart-2',
        category: 'design',
        isSelected: false,
    },

    // Content Production
    {
        id: 'video-production',
        name: 'Produção de Vídeo',
        description: 'Produção e edição audiovisual profissional',
        icon: 'video',
        category: 'content',
        isSelected: false,
    },
    {
        id: 'motion-graphics',
        name: 'Motion Graphics',
        description: 'Animações e vídeos motion',
        icon: 'film',
        category: 'content',
        isSelected: false,
    },
    {
        id: 'copywriting',
        name: 'Copywriting',
        description: 'Redação persuasiva para marketing',
        icon: 'edit-3',
        category: 'content',
        isSelected: false,
    },
    {
        id: 'blog-content',
        name: 'Conteúdo para Blog',
        description: 'Pesquisa e criação de artigos',
        icon: 'book-open',
        category: 'content',
        isSelected: false,
    },

    // Automation
    {
        id: 'marketing-automation',
        name: 'Automação de Marketing',
        description: 'Nutrição de leads até o momento da compra',
        icon: 'zap',
        category: 'automation',
        isSelected: false,
    },
    {
        id: 'email-marketing',
        name: 'Email Marketing',
        description: 'Campanhas de email automatizadas',
        icon: 'mail',
        category: 'automation',
        isSelected: false,
    },
    {
        id: 'chatbot',
        name: 'Chatbot',
        description: 'Atendimento automatizado inteligente',
        icon: 'message-circle',
        category: 'automation',
        isSelected: false,
    },
];
