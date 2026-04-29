import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Upload, Wrench, Rocket, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WHATSAPP_LINK = "https://wa.me/553198261608?text=Olá%2C%20quero%20criar%20meu%20biosite%20com%20a%20NEXOR.";

const steps = [
  { icon: MessageSquare, title: "Você chama a NEXOR", desc: "Entre em contato pelo WhatsApp para começar." },
  { icon: Upload, title: "Envia seus produtos", desc: "Fotos, preços, descrições e informações do negócio." },
  { icon: Wrench, title: "A NEXOR monta seu catálogo", desc: "Criamos tudo com sua identidade visual." },
  { icon: Rocket, title: "Pronto para vender", desc: "Receba o link para colocar na bio e começar a vender." },
];

export default function ProcessSection() {
  return (
    <section id="como-funciona" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Como funciona</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-playfair font-bold text-foreground">
            Simples, rápido e sem complicação
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative flex gap-6 md:gap-8 items-start"
              >
                <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-card border border-primary/30 flex items-center justify-center shadow-lg shadow-primary/10">
                  <step.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <div className="pt-1 md:pt-3">
                  <span className="text-xs text-primary font-bold tracking-widest">PASSO {i + 1}</span>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mt-1">{step.title}</h3>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 rounded-full text-base gap-2 shadow-lg shadow-primary/20">
            Quero meu biosite na bio
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}