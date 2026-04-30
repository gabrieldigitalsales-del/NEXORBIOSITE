import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getSetting, whatsappLink } from '@/lib/siteSettings';
import { usePlanItems, useSiteContent } from '@/lib/useSiteData';

const FALLBACK_PLANS = [
  { id: 'p1', name: "Inicial", featured: false, features: ["Biosite com até 20 produtos", "Link para bio", "Botão de WhatsApp", "Identidade visual básica"], active: true, order: 1 },
  { id: 'p2', name: "Profissional", featured: true, features: ["Biosite com até 100 produtos", "Categorias personalizadas", "Banner personalizado", "Pedido pelo WhatsApp", "Suporte para alterações"], active: true, order: 2 },
  { id: 'p3', name: "Premium", featured: false, features: ["Produtos ilimitados", "Design personalizado", "Domínio personalizado", "Integração com Pix", "Suporte prioritário"], active: true, order: 3 },
];

function getWhatsAppLink(number, planName) {
  return whatsappLink(number, `Olá, quero saber mais sobre o plano ${planName} da NEXOR.`);
}

export default function PlansSection() {
  const { data: rawPlans } = usePlanItems();
  const { data: settings } = useSiteContent();
  const whatsappNumber = getSetting(settings, 'general', 'whatsapp_number', '553198261608');
  const sorted = (rawPlans?.filter(p => p.active) || []).sort((a, b) => a.order - b.order);
  const plans = sorted.length > 0 ? sorted : FALLBACK_PLANS;

  return (
    <section id="planos" className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Planos</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-playfair font-bold text-foreground">
            Escolha o plano ideal para seu negócio
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
                plan.featured
                  ? 'bg-gradient-to-b from-primary/10 to-card border-primary/40 shadow-xl shadow-primary/10 scale-[1.02]'
                  : 'bg-card border-border/50 hover:border-primary/20'
              }`}
            >
              {plan.featured && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-semibold px-4 py-1 rounded-full gap-1">
                  <Crown className="w-3.5 h-3.5" />
                  Mais escolhido
                </Badge>
              )}

              <h3 className="text-2xl font-playfair font-bold text-foreground mb-6">{plan.name}</h3>

              <ul className="space-y-3.5 mb-8 flex-grow">
                {(plan.features || []).map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <a href={getWhatsAppLink(whatsappNumber, plan.name)} target="_blank" rel="noopener noreferrer">
                <Button
                  className={`w-full rounded-full py-6 font-semibold text-base gap-2 ${
                    plan.featured
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/50'
                  }`}
                >
                  Contratar {plan.name}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}