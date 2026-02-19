'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

type ScarcitySectionProps = {
  totalKits: number;
  soldKits: number;
  message: string;
};

export function ScarcitySection({ totalKits, soldKits, message }: ScarcitySectionProps) {
  const progress = Math.min(Math.round((soldKits / totalKits) * 100), 100);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
        className="rounded-2xl border border-[#A3853F]/30 bg-gradient-to-r from-[#2B171B]/90 to-[#18251D]/90 p-6 sm:p-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-[#3A2127]/70 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#E8D7AF]">
              <AlertCircle className="h-4 w-4" />
              Apito Final
            </p>
            <h2 className="mt-3 font-title text-3xl text-[#F8F2E8] sm:text-4xl">Últimos minutos da campanha</h2>
            <p className="mt-3 max-w-3xl text-sm text-[#E4D7C6] sm:text-base">{message}</p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-sm text-[#D6C8B0]">Reservados até agora</p>
            <p className="font-title text-4xl text-[#E7C77B]">{soldKits}</p>
          </div>
        </div>

        <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-black/30">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-[#7C1D2C] via-[#A3853F] to-[#D1B46A]"
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-[#D8CAB2]">
          <span>0 kits</span>
          <span>{totalKits} kits</span>
        </div>
      </motion.div>
    </section>
  );
}
