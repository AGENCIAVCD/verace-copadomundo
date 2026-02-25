import { ChampionsSection } from '../components/landing/ChampionsSection';
import { CountdownHeader } from '../components/landing/CountdownHeader';
import { FaqSection } from '../components/landing/FaqSection';
import { FooterSection } from '../components/landing/FooterSection';
import { HeroSection } from '../components/landing/HeroSection';
import { PhotoShowcaseSection } from '../components/landing/PhotoShowcaseSection';
import { PromotionMechanics } from '../components/landing/PromotionMechanics';
import { RulesSection } from '../components/landing/RulesSection';
import { ScarcitySection } from '../components/landing/ScarcitySection';
import { WorldCupRouteSection } from '../components/landing/WorldCupRouteSection';
import { campaignData, campaignFaq, campaignRules, championCountries, kitLevels } from '../data/campaignData';

export default function Page() {
  return (
    <main className="bg-[#120E10] pt-9 text-[#F5EFE6] sm:pt-10">
      <CountdownHeader promoEndDate={campaignData.promoEndDate} />

      <HeroSection kitsSectionId={campaignData.kitsSectionId} />

      <WorldCupRouteSection />

      <PromotionMechanics id={campaignData.kitsSectionId} levels={kitLevels} />

      <PhotoShowcaseSection
        title="Conheça todas as taças colecionáveis"
        subtitle="Modelos exclusivos da campanha Verace inspirados nos países campeões da Copa."
        images={[
          {
            src: '/images/campaign/tacas-colecionaveis-4379.png',
            alt: 'Linha completa de taças colecionáveis Verace edição Copa',
          },
        ]}
      />

      <ChampionsSection countries={championCountries} />

      <ScarcitySection
        totalKits={campaignData.scarcity.totalKits}
        soldKits={campaignData.scarcity.soldKits}
        message={campaignData.scarcity.message}
      />

      <RulesSection rules={campaignRules} />

      <FaqSection items={campaignFaq} />

      <FooterSection
        restaurantName={campaignData.restaurantName}
        units={campaignData.units}
        whatsappUrl={campaignData.whatsappUrl}
      />
    </main>
  );
}
