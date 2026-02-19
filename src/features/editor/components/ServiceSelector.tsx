import { useState, useMemo } from 'react';
import { X, Search, Check, Package } from 'lucide-react';
import type { Service } from '../data/serviceTemplates';
import { SERVICE_CATEGORIES, SERVICE_TEMPLATES } from '../data/serviceTemplates';

// Import icon map
import {
    Globe, Facebook, Video, Mail, Share2, BarChart2, TrendingUp,
    ShoppingCart, FileText, SearchIcon, Eye, Award, Film, Edit3,
    BookOpen, Zap, MessageCircle, Megaphone,
} from 'lucide-react';

const iconMap: Record<string, any> = {
    globe: Globe,
    facebook: Facebook,
    instagram: Share2,
    linkedin: Share2,
    video: Video,
    mail: Mail,
    'share-2': Share2,
    'bar-chart-2': BarChart2,
    'trending-up': TrendingUp,
    'shopping-cart': ShoppingCart,
    'file-text': FileText,
    search: SearchIcon,
    eye: Eye,
    award: Award,
    film: Film,
    'edit-3': Edit3,
    'book-open': BookOpen,
    zap: Zap,
    'message-circle': MessageCircle,
    megaphone: Megaphone,
};

export interface ServiceSelectorProps {
    selectedServices: Service[];
    onServicesChange: (services: Service[]) => void;
    onClose: () => void;
}

export function ServiceSelector({
    selectedServices,
    onServicesChange,
    onClose,
}: ServiceSelectorProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Merge selected services with templates
    const allServices = useMemo(() => {
        return SERVICE_TEMPLATES.map(template => {
            const existing = selectedServices.find(s => s.id === template.id);
            return existing || template;
        });
    }, [selectedServices]);

    // Filter services
    const filteredServices = useMemo(() => {
        return allServices.filter(service => {
            const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [allServices, searchQuery, selectedCategory]);

    const selectedCount = allServices.filter(s => s.isSelected).length;

    const toggleService = (serviceId: string) => {
        const updated = allServices.map(s =>
            s.id === serviceId ? { ...s, isSelected: !s.isSelected } : s
        );
        onServicesChange(updated.filter(s => s.isSelected));
    };

    const toggleAll = () => {
        const allSelected = filteredServices.every(s => s.isSelected);
        const updated = allServices.map(s => {
            if (filteredServices.find(fs => fs.id === s.id)) {
                return { ...s, isSelected: !allSelected };
            }
            return s;
        });
        onServicesChange(updated.filter(s => s.isSelected));
    };

    const handleSave = () => {
        const selected = allServices.filter(s => s.isSelected);
        onServicesChange(selected);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-surface rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                            <Package size={28} className="text-primary" />
                            Gerenciar Serviços
                        </h2>
                        <p className="text-sm text-text-secondary mt-1">
                            Selecione os serviços que deseja incluir nesta proposta ({selectedCount} selecionados)
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-surface-light rounded-lg transition-colors"
                    >
                        <X size={24} className="text-text-secondary" />
                    </button>
                </div>

                {/* Search & Filters */}
                <div className="p-6 border-b border-border space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
                        <input
                            type="text"
                            placeholder="Buscar serviços..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === 'all'
                                ? 'bg-primary text-white'
                                : 'bg-surface-light text-text-secondary hover:bg-surface-hover'
                                }`}
                        >
                            Todos
                        </button>
                        {Object.entries(SERVICE_CATEGORIES).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setSelectedCategory(key)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === key
                                    ? 'bg-primary text-white'
                                    : 'bg-surface-light text-text-secondary hover:bg-surface-hover'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Select All */}
                    <button
                        onClick={toggleAll}
                        className="text-sm text-primary hover:underline font-medium"
                    >
                        {filteredServices.every(s => s.isSelected) ? 'Desmarcar Todos' : 'Selecionar Todos'}
                    </button>
                </div>

                {/* Service Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-2 gap-4">
                        {filteredServices.map((service) => {
                            const IconComponent = iconMap[service.icon] || Megaphone;

                            return (
                                <button
                                    key={service.id}
                                    onClick={() => toggleService(service.id)}
                                    className={`
                                        p-4 rounded-xl border-2 text-left transition-all
                                        ${service.isSelected
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary/50 bg-surface-light'
                                        }
                                    `}
                                >
                                    <div className="flex items-start gap-3">
                                        {/* Icon */}
                                        <div
                                            className={`
                                                w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                                                ${service.isSelected ? 'bg-primary/20' : 'bg-background'}
                                            `}
                                        >
                                            <IconComponent
                                                size={24}
                                                className={service.isSelected ? 'text-primary' : 'text-text-tertiary'}
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-text-primary mb-1 flex items-center gap-2">
                                                {service.name}
                                                {service.isSelected && (
                                                    <Check size={16} className="text-primary flex-shrink-0" />
                                                )}
                                            </h3>
                                            <p className="text-xs text-text-secondary line-clamp-2">
                                                {service.description}
                                            </p>
                                            <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-background text-text-tertiary">
                                                {SERVICE_CATEGORIES[service.category as keyof typeof SERVICE_CATEGORIES]}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {filteredServices.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-text-secondary">Nenhum serviço encontrado</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border flex items-center justify-between">
                    <p className="text-sm text-text-secondary">
                        {selectedCount} de {allServices.length} serviços selecionados
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-surface-light text-text-primary rounded-lg hover:bg-surface-hover transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                        >
                            Salvar Seleção
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
