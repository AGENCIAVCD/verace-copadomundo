import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Proposal, Slide } from '../../../lib/types';
import { generateId } from '../../../lib/utils';

interface ProposalsState {
    proposals: Proposal[];
    createProposal: (clientName: string, vendorId: string) => Proposal;
    updateProposal: (id: string, updates: Partial<Proposal>) => void;
    updateSlideContent: (proposalId: string, slideId: string, content: Slide['content']) => void;
    deleteProposal: (id: string) => void;
    getProposal: (id: string) => Proposal | undefined;
}

const createDefaultSlides = (): Slide[] => [
    {
        id: generateId(),
        type: 'cover',
        order: 0,
        isVisible: true,
        isRemovable: false,
        content: { title: 'Proposta Comercial', clientName: '' },
    },
    {
        id: generateId(),
        type: 'about',
        order: 1,
        isVisible: true,
        isRemovable: false,
        content: {
            text: 'A Você Digital Propaganda é uma agência criativa especializada em soluções digitais inovadoras.',
        },
    },
    {
        id: generateId(),
        type: 'differentials',
        order: 2,
        isVisible: true,
        isRemovable: false,
        content: {
            items: [
                'Equipe experiente e dedicada',
                'Atendimento personalizado',
                'Resultados mensuráveis',
                'Inovação constante',
            ],
        },
    },
    {
        id: generateId(),
        type: 'services',
        order: 3,
        isVisible: true,
        isRemovable: true,
        content: {},
    },
    {
        id: generateId(),
        type: 'pricing',
        order: 4,
        isVisible: true,
        isRemovable: true,
        content: {},
    },
    {
        id: generateId(),
        type: 'conditions',
        order: 5,
        isVisible: true,
        isRemovable: true,
        content: {
            text: 'Pagamento: 50% início + 50% entrega\nPrazo: 30 dias\nValidade: 15 dias',
        },
    },
    {
        id: generateId(),
        type: 'closing',
        order: 6,
        isVisible: true,
        isRemovable: false,
        content: {
            cta: 'Vamos transformar sua presença digital?',
            contact: 'contato@vocedigital.com | (11) 99999-9999',
        },
    },
];

export const useProposalsStore = create<ProposalsState>()(
    persist(
        (set, get) => ({
            proposals: [],

            createProposal: (clientName: string, vendorId: string) => {
                const newProposal: Proposal = {
                    id: generateId(),
                    clientName,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    status: 'draft',
                    vendorId,
                    coVendors: [],
                    slides: createDefaultSlides(),
                    services: [],
                    pricing: {
                        subtotal: 0,
                        discount: 0,
                        total: 0,
                    },
                };

                set((state) => ({
                    proposals: [...state.proposals, newProposal],
                }));

                return newProposal;
            },

            updateProposal: (id: string, updates: Partial<Proposal>) => {
                set((state) => ({
                    proposals: state.proposals.map((p) =>
                        p.id === id
                            ? { ...p, ...updates, updatedAt: new Date() }
                            : p
                    ),
                }));
            },

            updateSlideContent: (proposalId: string, slideId: string, content: Slide['content']) => {
                set((state) => ({
                    proposals: state.proposals.map((p) => {
                        if (p.id !== proposalId) return p;

                        return {
                            ...p,
                            slides: p.slides.map((s) =>
                                s.id === slideId
                                    ? { ...s, content: { ...s.content, ...content } }
                                    : s
                            ),
                            updatedAt: new Date(),
                        };
                    }),
                }));
            },

            deleteProposal: (id: string) => {
                set((state) => ({
                    proposals: state.proposals.filter((p) => p.id !== id),
                }));
            },

            getProposal: (id: string) => {
                return get().proposals.find((p) => p.id === id);
            },
        }),
        {
            name: 'proposals-storage',
        }
    )
);
