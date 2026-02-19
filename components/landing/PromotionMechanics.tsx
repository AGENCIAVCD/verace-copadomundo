'use client';

import { motion } from 'framer-motion';
import { Beer, PackageCheck, Wine } from 'lucide-react';
import type { KitLevel } from '../../data/campaignData';

type PromotionMechanicsProps = {
  id: string;
  levels: KitLevel[];
};

const fadeInUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export function PromotionMechanics({ id, levels }: PromotionMechanicsProps) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <motion.h2
        {...fadeInUp}
        className="font-title text-3xl text-[#F7F1E8] sm:text-4xl"
      >
        A Tabela da Promoção
      </motion.h2>
      <motion.p {...fadeInUp} className="mt-3 max-w-2xl text-sm text-[#D7CCBC] sm:text-base">
        Em dia de jogo, seu consumo vira classificação para kits colecionáveis da edição Copa.
      </motion.p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {levels.map((level, index) => {
          const Icon = level.id === 'torcedor' ? Beer : Wine;

          return (
            <motion.article
              key={level.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.08 * index, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg"
            >
              <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full blur-3xl" style={{ backgroundColor: `${level.accent}55` }} />

              <div className="relative">
                <img
                  src={level.image}
                  alt={level.imageAlt}
                  className="mb-5 block w-full rounded-xl border border-white/10 bg-[#120C0D] object-contain p-2"
                />

                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A3853F]/35 bg-[#201718]/60 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-[#E9DFC9]">
                  <Icon className="h-4 w-4 text-[#D1B46A]" />
                  {level.id === 'torcedor' ? 'Fase de Grupos' : 'Mata-mata Premium'}
                </div>

                <h3 className="font-title text-2xl text-[#F8F2E9]">{level.title}</h3>
                <p className="mt-3 text-sm text-[#E5D9C7]">{level.rule}</p>
                <p className="mt-1 text-sm font-semibold text-[#D7B86A]">{level.benefit}</p>

                <ul className="mt-5 space-y-2 text-sm text-[#E6DDCE]">
                  {level.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#C7A85F]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 inline-flex rounded-md bg-[#2D1A1E] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#F3EADD]">
                  {level.availability}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
