import React from 'react';
import Header from '../components/nexor/Header';
import HeroCarousel from '../components/nexor/HeroCarousel';
import BenefitsSection from '../components/nexor/BenefitsSection';
import StepsSection from '../components/nexor/StepsSection';
import FeaturesSection from '../components/nexor/FeaturesSection';
import AudienceSection from '../components/nexor/AudienceSection';
import ProcessSection from '../components/nexor/ProcessSection';
import PlansSection from '../components/nexor/PlansSection';
import CtaSection from '../components/nexor/CtaSection';
import FaqSection from '../components/nexor/FaqSection';
import Footer from '../components/nexor/Footer';
import WhatsAppFloat from '../components/nexor/WhatsAppFloat';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroCarousel />
      <BenefitsSection />
      <StepsSection />
      <FeaturesSection />
      <AudienceSection />
      <ProcessSection />
      <PlansSection />
      <CtaSection />
      <FaqSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}