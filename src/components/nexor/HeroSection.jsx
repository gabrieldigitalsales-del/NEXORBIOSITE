import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WHATSAPP_LINK = "https://wa.me/553198261608?text=Olá%2C%20quero%20criar%20meu%20catálogo%20digital%20com%20a%20NEXOR.";
const MOCKUP_IMAGE = "/assets/hero-mockup.svg";

export default function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary font-medium tracking-wider uppercase">
                Catálogo Digital para Instagram
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold leading-tight text-foreground">
              Transforme sua bio do Instagram em uma{' '}
              <span className="text-primary">vitrine de vendas</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Com a NEXOR, seu negócio ganha um catálogo digital moderno para seus clientes acessarem produtos, montarem pedidos e chamarem direto no WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 rounded-full text-base gap-2 shadow-lg shadow-primary/20">
                  Criar meu catálogo agora
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              <a href="#como-funciona">
                <Button variant="outline" className="w-full sm:w-auto border-border/50 text-foreground hover:bg-secondary px-8 py-6 rounded-full text-base gap-2">
                  <Play className="w-4 h-4" />
                  Ver como funciona
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl scale-90" />
              <img
                src={MOCKUP_IMAGE}
                alt="Exemplo de catálogo digital NEXOR em um smartphone"
                className="relative w-72 sm:w-80 lg:w-96 rounded-3xl shadow-2xl shadow-black/50"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}