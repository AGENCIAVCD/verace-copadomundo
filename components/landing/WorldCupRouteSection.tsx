'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { useRef } from 'react';

const steps = [
  {
    phase: 'Rodada 01',
    title: 'Escolha seu país campeão',
    desc: 'Defina qual seleção histórica vai representar seu kit colecionável.',
  },
  {
    phase: 'Rodada 02',
    title: 'Atinga a meta de consumo',
    desc: 'Com consumo qualificado, você desbloqueia condição especial do Kit Torcedor ou Premium.',
  },
  {
    phase: 'Rodada 03',
    title: 'Leve sua taça para casa',
    desc: 'Retire seu kit no ato e entre para o clube de colecionadores Verace da Copa.',
  },
];

export function WorldCupRouteSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const amount = Math.round(sliderRef.current.clientWidth * 0.82);
    sliderRef.current.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-[#A3853F]/35 bg-gradient-to-r from-[#1A1114] via-[#24161A] to-[#16221B] p-6 sm:p-8"
      >
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#A3853F]/20 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-[#7C1D2C]/25 blur-3xl" />

        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#A3853F]/35 bg-[#2A181B]/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#E6D5AE]">
            <Trophy className="h-3.5 w-3.5" />
            Rota da Taça
          </p>

          <h2 className="mt-4 max-w-3xl font-title text-3xl text-[#F8F1E6] sm:text-4xl">
            A campanha em ritmo de campeonato
          </h2>

          <div className="mt-6 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => scrollSlider('left')}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#A3853F]/45 bg-[#221518]/75 text-[#E8D9B8] transition-colors hover:bg-[#2F1B20]"
              aria-label="Voltar cards"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollSlider('right')}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#A3853F]/45 bg-[#221518]/75 text-[#E8D9B8] transition-colors hover:bg-[#2F1B20]"
              aria-label="Avançar cards"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={sliderRef}
            className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {steps.map((step, index) => (
              <motion.article
                key={step.phase}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="min-w-[84%] snap-start rounded-2xl border border-white/10 bg-[#1B1315]/75 p-4 sm:min-w-[58%] lg:min-w-[33%]"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#D9C7A3]">{step.phase}</p>
                <p className="mt-2 font-title text-2xl text-[#F5EEE2]">{step.title}</p>
                <p className="mt-2 text-sm text-[#DFD3C1]">{step.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
