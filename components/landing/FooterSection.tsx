import { Facebook, Instagram, MapPin, MessageCircle, Navigation } from 'lucide-react';
import type { RestaurantUnit } from '../../data/campaignData';

type FooterSectionProps = {
  restaurantName: string;
  units: RestaurantUnit[];
  whatsappUrl: string;
};

export function FooterSection({ restaurantName, units, whatsappUrl }: FooterSectionProps) {
  return (
    <footer className="border-t border-white/10 bg-[#140E10]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-title text-2xl text-[#F5EEE2]">{restaurantName}</p>
            <p className="mt-2 text-sm text-[#D5C7B1]">3 unidades para viver a experiência Verace.</p>
          </div>

          <div className="flex flex-col gap-4 sm:items-end">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#A3853F] px-5 py-2 text-sm font-semibold text-[#1A120F] transition-colors hover:bg-[#C2A75F]"
            >
              <MessageCircle className="h-4 w-4" />
              Reservar no WhatsApp
            </a>

            <div className="flex items-center gap-4 text-[#DCCDAE]">
              <a href="#" aria-label="Instagram" className="transition-colors hover:text-[#F5EEE2]">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Facebook" className="transition-colors hover:text-[#F5EEE2]">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {units.map((unit) => (
            <article key={unit.id} className="flex min-h-[190px] flex-col rounded-xl border border-white/10 bg-[#1C1315] p-5">
              <p className="font-title text-xl text-[#F5EEE2]">{unit.name}</p>
              <p className="mt-3 inline-flex items-start gap-2 text-sm text-[#D5C7B1]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A960]" />
                {unit.address}
              </p>

              <a
                href={unit.routeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#A3853F]/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#E9D9B7] transition-colors hover:bg-[#A3853F]/15"
              >
                <Navigation className="h-3.5 w-3.5" />
                Ir para unidade
              </a>
            </article>
          ))}
        </div>
      </div>
    </footer>
  );
}
