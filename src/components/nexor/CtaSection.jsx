import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WHATSAPP_LINK = "https://wa.me/553198261608?text=Olá%2C%20quero%20criar%20meu%20biosite%20com%20a%20NEXOR.";

export default function CtaSection() {
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
            Pronto para transformar seguidores em{' '}
            <span className="text-primary">clientes</span>?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tenha um biosite profissional na bio do Instagram e facilite a compra para seus clientes.
          </p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-block mt-10">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-10 py-7 rounded-full text-lg gap-2 shadow-xl shadow-primary/20">
              Criar meu biosite com a NEXOR
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}