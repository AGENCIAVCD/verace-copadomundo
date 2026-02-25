'use client';

import { motion } from 'framer-motion';
import { ArrowDownCircle } from 'lucide-react';

type HeroSectionProps = {
  kitsSectionId: string;
};

export function HeroSection({ kitsSectionId }: HeroSectionProps) {
  const scrollToKits = () => {
    const section = document.getElementById(kitsSectionId);
    if (!section) return;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/campaign/hero-capa.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/65" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(163,133,63,0.16),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(24,58,40,0.2),transparent_40%)]" />
      <div className="stadium-vignette absolute inset-0" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-start px-6 pb-24 pt-[58px] text-center text-[#F5EFE6] sm:pt-[62px]">
        <div className="mt-5 flex flex-col items-center">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            src="/images/campaign/hero-logo-copa.png"
            alt="Logo Verace"
            className="mx-auto w-full max-w-[7rem] object-contain sm:max-w-[7.8rem] md:max-w-[8.8rem] lg:max-w-[9.5rem]"
          />

          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            src="/images/campaign/hero-selo-copa-del-mondo.png"
            alt="Selo da promoção Copa del Mondo"
            className="mx-auto mt-5 w-full max-w-[16rem] object-contain sm:max-w-[18rem] md:max-w-[20rem] lg:max-w-[22rem]"
          />
        </div>

        <div className="absolute inset-x-0 bottom-[56px] flex justify-center sm:bottom-[62px]">
          <motion.button
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToKits}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E7CA7A] bg-gradient-to-r from-[#A3853F] to-[#C9AA5A] px-7 py-3 text-base font-semibold text-[#17100E] shadow-[0_10px_36px_rgba(163,133,63,0.5)] transition-all hover:from-[#C4A95E] hover:to-[#E2C46E] hover:shadow-[0_14px_40px_rgba(163,133,63,0.6)]"
          >
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#1D3A2D] ring-2 ring-[#F2DA95]" />
            Ver os Kits
            <ArrowDownCircle className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
