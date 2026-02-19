import type { Slide } from '../../../../lib/types';
import { CoverSlide } from './CoverSlide';
import { AboutSlide } from './AboutSlide';
import { DifferentialsSlide } from './DifferentialsSlide';
import { ServicesSlide } from './ServicesSlide';
import { PricingSlide } from './PricingSlide';
import { ConditionsSlide } from './ConditionsSlide';
import { TimelineSlide } from './TimelineSlide';
import { NotesSlide } from './NotesSlide';
import { ClosingSlide } from './ClosingSlide';
import { ProcessSlide } from './ProcessSlide';
import { ClientsSlide } from './ClientsSlide';
import { ServiceTiersSlide } from './ServiceTiersSlide';

export interface SlideRendererProps {
    slide: Slide;
    onUpdate: (content: Slide['content']) => void;
}

export function SlideRenderer({ slide, onUpdate }: SlideRendererProps) {
    switch (slide.type) {
        case 'cover':
            return <CoverSlide slide={slide} onUpdate={onUpdate} />;

        case 'about':
            return <AboutSlide slide={slide} onUpdate={onUpdate} />;

        case 'differentials':
            return <DifferentialsSlide slide={slide} onUpdate={onUpdate} />;

        case 'services':
            return <ServicesSlide slide={slide} onUpdate={onUpdate} />;

        case 'pricing':
            return <PricingSlide slide={slide} />;

        case 'conditions':
            return <ConditionsSlide slide={slide} onUpdate={onUpdate} />;

        case 'timeline':
            return <TimelineSlide slide={slide} onUpdate={onUpdate} />;

        case 'notes':
            return <NotesSlide slide={slide} onUpdate={onUpdate} />;

        case 'closing':
            return <ClosingSlide slide={slide} onUpdate={onUpdate} />;

        case 'process':
            return <ProcessSlide slide={slide} />;

        case 'clients':
            return <ClientsSlide slide={slide} onUpdate={onUpdate} />;

        case 'service-tiers':
            return <ServiceTiersSlide slide={slide} onUpdate={onUpdate} />;
    }
}
