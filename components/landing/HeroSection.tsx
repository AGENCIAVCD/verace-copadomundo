'use client';

import { motion } from 'framer-motion';
import { ArrowDownCircle, Trophy } from 'lucide-react';

type HeroSectionProps = {
  headline: string;
  subheadline: string;
  kitsSectionId: string;
};

export function HeroSection({ headline, subheadline, kitsSectionId }: HeroSectionProps) {
  const scrollToKits = () => {
    const section = document.getElementById(kitsSectionId);
    if (!section) return;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B0F12]/95 via-[#2A1B1A]/85 to-[#0E1711]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(163,133,63,0.15),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(124,29,44,0.25),transparent_40%)]" />
      <div className="pitch-lines absolute inset-0 opacity-[0.18]" />
      <div className="stadium-vignette absolute inset-0" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-6 py-20 text-center text-[#F5EFE6] md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="mb-5 inline-flex w-fit self-center items-center gap-2 rounded-full border border-[#A3853F]/40 bg-[#1A1314]/60 px-4 py-2 text-xs tracking-[0.22em] uppercase md:self-start"
        >
          <Trophy className="h-4 w-4 text-[#D1B46A]" />
          Noite de Copa na Verace
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="mx-auto max-w-3xl font-title text-4xl leading-tight sm:text-5xl lg:mx-0 lg:text-6xl"
        >
          {headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: 'easeOut' }}
          className="mx-auto mt-6 max-w-2xl text-base text-[#E5DDD0] sm:text-lg lg:mx-0"
        >
          {subheadline}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={scrollToKits}
          className="mx-auto mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-[#A3853F] px-6 py-3 text-sm font-semibold text-[#17100E] shadow-[0_8px_30px_rgba(163,133,63,0.35)] transition-colors hover:bg-[#C4A95E] lg:mx-0"
        >
          Ver os Kits
          <ArrowDownCircle className="h-5 w-5" />
        </motion.button>
      </div>
    </section>
  );
}
