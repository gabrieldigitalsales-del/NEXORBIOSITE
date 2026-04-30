import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteContent } from '@/lib/useSiteData';
import { getSetting, whatsappLink } from '@/lib/siteSettings';

export default function CtaSection() {
  const { data: settings } = useSiteContent();
  const whatsappNumber = getSetting(settings, 'general', 'whatsapp_number', '553198261608');
  const title = getSetting(settings, 'cta', 'title', 'Pronto para transformar seguidores em clientes?');
  const subtitle = getSetting(settings, 'cta', 'subtitle', 'Tenha um biosite profissional na bio do Instagram e facilite a compra para seus clientes.');
  const buttonText = getSetting(settings, 'cta', 'button_text', 'Criar meu biosite com a NEXOR');
  const wamsg = getSetting(settings, 'cta', 'wamsg', 'Olá, quero criar meu biosite com a NEXOR.');

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/8 rounded-full blur-[120px]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-foreground leading-tight">
            {title}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          <a href={whatsappLink(whatsappNumber, wamsg)} target="_blank" rel="noopener noreferrer" className="inline-block mt-10">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-10 py-7 rounded-full text-lg gap-2 shadow-xl shadow-primary/20">
              {buttonText}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
