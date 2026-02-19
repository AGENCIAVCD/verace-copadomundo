import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Button, Input } from '../../../components/atoms';
import { VoceDigitalLogo } from '../../../components/atoms/VoceDigitalLogo';

export function LoginPage() {
    const navigate = useNavigate();
    const { login, loading } = useAuthStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="inline-flex items-center justify-center w-20 h-20 mb-4"
                    >
                        <VoceDigitalLogo className="w-full h-full" />
                    </motion.div>

                    <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
                        Você Digital
                    </h1>
                    <p className="text-text-secondary">
                        Sistema de Propostas Comerciais
                    </p>
                </div>

                {/* Login Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-surface/50 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-premium"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            type="email"
                            label="E-mail"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<Mail size={18} />}
                            required
                            autoComplete="email"
                        />

                        <Input
                            type="password"
                            label="Senha"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={<Lock size={18} />}
                            required
                            autoComplete="current-password"
                        />

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-error/10 border border-error/20 rounded-lg text-sm text-error"
                            >
                                {error}
                            </motion.div>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            isLoading={loading}
                        >
                            Entrar
                        </Button>
                    </form>

                    {/* Demo credentials hint */}
                    <div className="mt-6 p-4 bg-background/50 rounded-lg border border-border">
                        <p className="text-xs text-text-tertiary text-center">
                            <strong className="text-text-secondary">Demo:</strong>{' '}
                            joao@vocedigital.com ou maria@vocedigital.com
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
