import React from 'react';
import Header from '../components/nexor/Header';
import Footer from '../components/nexor/Footer';
import WhatsAppFloat from '../components/nexor/WhatsAppFloat';
import { motion } from 'framer-motion';
import { ArrowRight, LayoutGrid, Instagram, Clapperboard, Globe, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useServices } from '@/lib/useSiteData';

const ICON_MAP = { LayoutGrid, Instagram, Clapperboard, Globe, ShoppingBag, Star };

const FALLBACK = [
  { id: 's1', tag: "Biosite", title: "Biosite para Instagram", desc: "Um link único e moderno para colocar na bio do Instagram.", features: ["Link para bio", "Catálogo organizado", "Botão WhatsApp", "Identidade visual", "Mobile-first"], wamsg: "Olá%2C%20quero%20criar%20meu%20biosite%20com%20a%20NEXOR.", bg_color: "from-amber-50 to-orange-50", badge_color: "bg-amber-100 text-amber-700", icon_name: "LayoutGrid", order: 1, active: true },
  { id: 's2', tag: "Social Media", title: "Gestão de Social Media", desc: "Cuidamos das suas redes sociais do início ao fim.", features: ["Planejamento mensal", "Criação de artes", "Legendas estratégicas", "Gerenciamento de perfis"], wamsg: "Olá%2C%20quero%20saber%20mais%20sobre%20Social%20Media%20com%20a%20NEXOR.", bg_color: "from-rose-50 to-pink-50", badge_color: "bg-rose-100 text-rose-700", icon_name: "Instagram", order: 2, active: true },
];

export default function Servicos() {
  const { data: rawServices } = useServices();
  const sorted = (rawServices?.filter(s => s.active) || []).sort((a, b) => a.order - b.order);
  const services = sorted.length > 0 ? sorted : FALLBACK;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16 text-center bg-gradient-to-b from-secondary/50 to-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">O que fazemos</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-playfair font-bold text-foreground leading-tight">
            Nossos <span className="text-primary">Serviços</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Soluções digitais completas para pequenos negócios e empreendedores que querem crescer online.
          </p>
        </motion.div>
      </section>

      <section className="py-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {services.map((service, i) => {
          const Icon = ICON_MAP[service.icon_name] || Star;
          return (
            <motion.div
              key={service.id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`rounded-3xl bg-gradient-to-br ${service.bg_color} border border-border/50 overflow-hidden`}
            >
              <div className="p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className={`inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 ${service.badge_color}`}>
                    {service.tag}
                  </span>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/70 flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-playfair font-bold text-foreground">{service.title}</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.desc}</p>
                  <a href={`https://wa.me/553198261608?text=${service.wamsg}`} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full px-7 py-5 gap-2 shadow-md shadow-primary/20">
                      Solicitar orçamento
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
                <div className="bg-white/60 rounded-2xl p-6 border border-white/80">
                  <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wide uppercase">O que está incluso</h4>
                  <ul className="space-y-3">
                    {(service.features || []).map((f, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <span className="text-sm text-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}