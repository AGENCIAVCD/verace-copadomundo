import type { Service } from '../../../lib/types';

export const servicesData: Service[] = [
    // 🌐 Desenvolvimento de Sites
    {
        id: 'site-landing',
        name: 'Landing Page',
        category: 'Desenvolvimento de Sites',
        basePrice: 2500,
        description: 'Página de conversão otimizada para captação de leads ou vendas',
        icon: 'Layout',
    },
    {
        id: 'site-onepage',
        name: 'Site Onepage',
        category: 'Desenvolvimento de Sites',
        basePrice: 3500,
        description: 'Site compacto em uma única página para apresentação de serviços',
        icon: 'FileText',
    },
    {
        id: 'site-multipage',
        name: 'Site Multipage',
        category: 'Desenvolvimento de Sites',
        basePrice: 6500,
        description: 'Site institucional com até 7 páginas, ideal para empresas com estrutura completa',
        icon: 'Layers',
    },

    // 🚀 Gestão de Tráfego Pago
    {
        id: 'trafego-smart',
        name: 'Pacote de Gestão de Tráfego (Smart)',
        category: 'Gestão de Tráfego Pago',
        basePrice: 1500,
        description: 'Campanhas no Google ou Facebook, com análise SWOT e relatórios semanais',
        icon: 'TrendingUp',
    },
    {
        id: 'trafego-advanced',
        name: 'Pacote de Gestão de Tráfego (Advanced)',
        category: 'Gestão de Tráfego Pago',
        basePrice: 2500,
        description: 'Campanhas Google e Facebook com reuniões mensais de acompanhamento',
        icon: 'BarChart3',
    },
    {
        id: 'trafego-premium',
        name: 'Pacote de Gestão de Tráfego (Premium)',
        category: 'Gestão de Tráfego Pago',
        basePrice: 4500,
        description: 'Gestão completa de tráfego pago, otimização de site, campanhas avançadas e reuniões mensais',
        icon: 'Rocket',
    },

    // 🎨 Identidade Visual
    {
        id: 'identidade-smart',
        name: 'Identidade Visual Smart',
        category: 'Identidade Visual',
        basePrice: 1800,
        description: 'Logotipo, cartão de visitas e avatar para redes sociais — ideal para negócios em início de operação',
        icon: 'Palette',
    },

    // 🖨️ Materiais Gráficos
    {
        id: 'outdoor',
        name: 'Outdoor',
        category: 'Materiais Gráficos',
        basePrice: 500,
        description: 'Arte gráfica impactante para mídia externa',
        icon: 'Image',
    },
    {
        id: 'flyer',
        name: 'Flyer Frente e Verso',
        category: 'Materiais Gráficos',
        basePrice: 300,
        description: 'Material promocional para campanhas, eventos e ações comerciais',
        icon: 'FileImage',
    },
    {
        id: 'catalogo',
        name: 'Catálogo',
        category: 'Materiais Gráficos',
        basePrice: 800,
        description: 'Desenvolvimento de catálogo com personalização por lauda para apresentação de produtos',
        icon: 'Book',
    },

    // 🎥 Audiovisual
    {
        id: 'video-institucional',
        name: 'Vídeo Institucional',
        category: 'Audiovisual',
        basePrice: 3500,
        description: 'Produção de vídeo profissional para promover empresas ou marcas',
        icon: 'Video',
    },
    {
        id: 'criacao-audiovisual',
        name: 'Criação Audiovisual',
        category: 'Audiovisual',
        basePrice: 2500,
        description: 'Produções audiovisuais personalizadas para diversas necessidades',
        icon: 'Film',
    },

    // 🎬 Motion Design
    {
        id: 'motion-design',
        name: 'Motion Design',
        category: 'Motion Design',
        basePrice: 1200,
        description: 'Animações profissionais de até 1 minuto para Reels, apresentações e campanhas digitais',
        icon: 'Sparkles',
    },

    // 📱 Social Media
    {
        id: 'gestao-midias',
        name: 'Gestão de Mídias Sociais',
        category: 'Social Media',
        basePrice: 1800,
        description: 'Gerenciamento completo de redes sociais com planejamento e criação de conteúdo',
        icon: 'Share2',
    },

    // 🤖 Automação de Marketing
    {
        id: 'automacao-marketing',
        name: 'Automação de Marketing',
        category: 'Automação de Marketing',
        basePrice: 2000,
        description: 'Configuração e gestão de automações para otimizar processos de marketing',
        icon: 'Zap',
    },

    // 🌟 Marketing de Influência
    {
        id: 'marketing-influencia',
        name: 'Influencers / Marketing de Influência',
        category: 'Marketing de Influência',
        basePrice: 3000,
        description: 'Planejamento e ações com criadores de conteúdo',
        icon: 'Users',
    },
];
