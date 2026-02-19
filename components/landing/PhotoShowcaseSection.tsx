'use client';

import { motion } from 'framer-motion';

type PhotoShowcaseSectionProps = {
  images: { src: string; alt: string }[];
  title?: string;
  subtitle?: string;
};

export function PhotoShowcaseSection({ images, title, subtitle }: PhotoShowcaseSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-title text-3xl text-[#F7F1E8] sm:text-4xl"
      >
        {title ?? 'Kits e Taças Exclusivas'}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mt-3 max-w-3xl text-sm text-[#D7CCBC] sm:text-base"
      >
        {subtitle ?? 'Visual oficial da campanha Verace para coleção dos países campeões.'}
      </motion.p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {images.map((image, index) => (
          <motion.figure
            key={image.src}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#1C1315]"
          >
            <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
