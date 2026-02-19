import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Plus,
    FileText,
    LogOut,
    Search,
    DollarSign,
} from 'lucide-react';
import { useAuthStore } from '../../auth/stores/authStore';
import { useProposalsStore } from '../../proposals/stores/proposalsStore';
import { Button, Card, Badge } from '../../../components/atoms';
import { Modal } from '../../../components/molecules/Modal';
import { Input } from '../../../components/atoms';
import { formatCurrency, formatDate } from '../../../lib/utils';
import type { Proposal } from '../../../lib/types';
import { VoceDigitalLogo } from '../../../components/atoms/VoceDigitalLogo';

export function DashboardPage() {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const { proposals, createProposal, deleteProposal } = useProposalsStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clientName, setClientName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleCreateProposal = () => {
        if (!clientName.trim() || !user) return;

        const proposal = createProposal(clientName, user.id);
        setIsModalOpen(false);
        setClientName('');
        navigate(`/editor/${proposal.id}`);
    };

    const filteredProposals = proposals.filter((p) =>
        p.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        total: proposals.length,
        draft: proposals.filter((p) => p.status === 'draft').length,
        sent: proposals.filter((p) => p.status === 'sent').length,
        closed: proposals.filter((p) => p.status === 'closed').length,
        totalValue: proposals.reduce((sum, p) => sum + p.pricing.total, 0),
    };

    const getStatusLabel = (status: Proposal['status']) => {
        const labels = {
            draft: 'Rascunho',
            sent: 'Enviada',
            closed: 'Fechada',
        };
        return labels[status];
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-surface/50 backdrop-blur-xl sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 flex items-center justify-center">
                                <VoceDigitalLogo className="w-full h-full" />
                            </div>
                            <div>
                                <h1 className="text-xl font-display font-bold text-text-primary">
                                    Você Digital
                                </h1>
                                <p className="text-sm text-text-tertiary">Propostas Comerciais</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-text-primary">{user?.name}</p>
                                <p className="text-xs text-text-tertiary">{user?.email}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={logout}
                                icon={<LogOut size={16} />}
                            >
                                Sair
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-text-secondary mb-1">Total</p>
                                    <p className="text-3xl font-display font-bold text-primary">
                                        {stats.total}
                                    </p>
                                </div>
                                <FileText className="text-primary" size={32} />
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        <Card>
                            <p className="text-sm text-text-secondary mb-1">Rascunhos</p>
                            <p className="text-2xl font-display font-semibold text-text-primary">
                                {stats.draft}
                            </p>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card>
                            <p className="text-sm text-text-secondary mb-1">Enviadas</p>
                            <p className="text-2xl font-display font-semibold text-text-primary">
                                {stats.sent}
                            </p>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                    >
                        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                            <p className="text-sm text-text-secondary mb-1">Fechadas</p>
                            <p className="text-2xl font-display font-semibold text-success">
                                {stats.closed}
                            </p>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                            <div className="flex items-center gap-2 mb-1">
                                <DollarSign className="text-accent" size={16} />
                                <p className="text-sm text-text-secondary">Valor Total</p>
                            </div>
                            <p className="text-xl font-display font-semibold text-accent">
                                {formatCurrency(stats.totalValue)}
                            </p>
                        </Card>
                    </motion.div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => setIsModalOpen(true)}
                        icon={<Plus size={20} />}
                        className="flex-shrink-0"
                    >
                        Nova Proposta
                    </Button>

                    <div className="flex-1">
                        <Input
                            placeholder="Buscar por nome do cliente..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            icon={<Search size={18} />}
                        />
                    </div>
                </div>

                {/* Proposals List */}
                {filteredProposals.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <FileText className="mx-auto text-text-muted mb-4" size={64} />
                        <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
                            {searchTerm ? 'Nenhuma proposta encontrada' : 'Nenhuma proposta ainda'}
                        </h3>
                        <p className="text-text-tertiary mb-6">
                            {searchTerm
                                ? 'Tente buscar por outro termo'
                                : 'Crie sua primeira proposta comercial'}
                        </p>
                        {!searchTerm && (
                            <Button
                                variant="primary"
                                onClick={() => setIsModalOpen(true)}
                                icon={<Plus size={18} />}
                            >
                                Criar Proposta
                            </Button>
                        )}
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProposals.map((proposal, index) => (
                            <motion.div
                                key={proposal.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card
                                    clickable
                                    onClick={() => navigate(`/editor/${proposal.id}`)}
                                    className="h-full"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-display font-semibold text-text-primary">
                                            {proposal.clientName}
                                        </h3>
                                        <Badge variant={proposal.status}>
                                            {getStatusLabel(proposal.status)}
                                        </Badge>
                                    </div>

                                    <p className="text-sm text-text-tertiary mb-4">
                                        Criada em {formatDate(proposal.createdAt)}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-border">
                                        <div>
                                            <p className="text-xs text-text-tertiary mb-1">Valor</p>
                                            <p className="text-lg font-semibold text-primary">
                                                {formatCurrency(proposal.pricing.total)}
                                            </p>
                                        </div>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (confirm('Deseja realmente excluir esta proposta?')) {
                                                    deleteProposal(proposal.id);
                                                }
                                            }}
                                            className="text-error hover:text-error hover:bg-error/10"
                                        >
                                            Excluir
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            {/* Create Proposal Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setClientName('');
                }}
                title="Nova Proposta"
                footer={
                    <>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setIsModalOpen(false);
                                setClientName('');
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleCreateProposal}
                            disabled={!clientName.trim()}
                        >
                            Criar Proposta
                        </Button>
                    </>
                }
            >
                <Input
                    label="Nome do Cliente"
                    placeholder="Ex: Empresa XYZ"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && clientName.trim()) {
                            handleCreateProposal();
                        }
                    }}
                    autoFocus
                />
            </Modal>
        </div>
    );
}
