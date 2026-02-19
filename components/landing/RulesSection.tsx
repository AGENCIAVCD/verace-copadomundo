'use client';

import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import type { RuleItem } from '../../data/campaignData';

type RulesSectionProps = {
  rules: RuleItem[];
};

export function RulesSection({ rules }: RulesSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-title text-3xl text-[#F7F1E8] sm:text-4xl"
      >
        Regras da Promoção
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mt-3 max-w-3xl text-sm text-[#D7CCBC] sm:text-base"
      >
        Transparência total para você saber exatamente como participar e garantir seu kit.
      </motion.p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {rules.map((rule, index) => (
          <motion.article
            key={rule.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="rounded-xl border border-white/10 bg-[#1C1315] p-5"
          >
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#E5D5B3]">
              <BadgeCheck className="h-4 w-4" />
              {rule.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#E7DDCD]">{rule.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
