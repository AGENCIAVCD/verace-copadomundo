'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import type { FaqItem } from '../../data/campaignData';

type FaqSectionProps = {
  items: FaqItem[];
};

export function FaqSection({ items }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-title text-3xl text-[#F7F1E8] sm:text-4xl"
      >
        FAQ
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mt-3 max-w-3xl text-sm text-[#D7CCBC] sm:text-base"
      >
        Dúvidas frequentes sobre a mecânica da campanha e disponibilidade dos kits.
      </motion.p>

      <div className="mt-8 space-y-3">
        {items.map((item) => {
          const isOpen = openId === item.id;

          return (
            <article key={item.id} className="overflow-hidden rounded-xl border border-white/10 bg-[#1C1315]">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
              >
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#F4ECDD] sm:text-base">
                  <HelpCircle className="h-4 w-4 text-[#D8B768]" />
                  {item.question}
                </span>
                <ChevronDown className={`h-4 w-4 text-[#D6C7AD] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-white/10 px-4 py-4 text-sm leading-relaxed text-[#E7DDCD] sm:px-5">
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
}
