'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Info, MapPin, Star, Trophy } from 'lucide-react';
import { useState } from 'react';
import type { ChampionCountry } from '../../data/campaignData';

type ChampionsSectionProps = {
  countries: ChampionCountry[];
};

export function ChampionsSection({ countries }: ChampionsSectionProps) {
  const [openCountryId, setOpenCountryId] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-title text-3xl text-[#F7F1E8] sm:text-4xl"
      >
        Os 5 Campeões
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="mt-3 max-w-3xl text-sm text-[#D7CCBC] sm:text-base"
      >
        Cada card mostra os anos de título. Clique para expandir e ver os detalhes das finais vencidas.
      </motion.p>

      <div className="mt-10 grid items-start gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {countries.map((country, index) => {
          const isOpen = openCountryId === country.id;

          return (
            <motion.article
              key={country.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="relative self-start overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#201416] via-[#1A1113] to-[#0F0C0E]"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#A3853F]/15 blur-2xl" />
              <div className="absolute -left-10 bottom-10 h-24 w-24 rounded-full bg-[#7C1D2C]/20 blur-2xl" />

              <button
                type="button"
                onClick={() => setOpenCountryId((prev) => (prev === country.id ? null : country.id))}
                className="relative w-full p-4 text-left sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-title text-[1.9rem] text-[#F5EEE2] sm:text-2xl">{country.name}</h3>
                    <p className="mt-1 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#D7C6A3]">
                      <Trophy className="h-3.5 w-3.5" />
                      {country.stars} títulos
                    </p>
                  </div>
                  <img
                    src={country.flagImage}
                    alt={`Bandeira da ${country.name}`}
                    className="h-8 w-11 rounded-sm border border-white/20 object-cover"
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                  {country.championYears.map((year) => (
                    <span
                      key={`${country.id}-${year}`}
                      className="rounded-full border border-[#A3853F]/45 bg-[#2A1A1D] px-2.5 py-1 text-[11px] font-semibold text-[#ECDCB9] sm:px-3 sm:text-xs"
                    >
                      {year}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] uppercase tracking-[0.12em] text-[#CCB998] sm:text-xs sm:tracking-[0.16em]">
                  <span>Ver detalhes das finais</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="finals"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
                        {country.finals.map((final) => (
                          <div key={`${country.id}-final-${final.year}`} className="rounded-xl border border-white/10 bg-[#24181A]/80 p-2.5 sm:p-3">
                            <p className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#F2E8D7] sm:text-sm">
                              <Star className="h-4 w-4 fill-[#D8B768] text-[#D8B768]" />
                              {final.year} - {final.match}
                            </p>
                            <p className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-[#D5C7AF] sm:text-xs">
                              <MapPin className="h-3.5 w-3.5" />
                              {final.location}
                            </p>
                            <p className="mt-1.5 inline-flex items-start gap-1.5 text-[11px] leading-relaxed text-[#E7DDCD] sm:mt-2 sm:text-xs">
                              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                              {final.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </button>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
