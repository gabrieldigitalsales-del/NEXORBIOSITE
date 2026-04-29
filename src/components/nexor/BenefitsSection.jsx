import React from 'react';
import { motion } from 'framer-motion';
import { Link2, LayoutGrid, MessageCircle, Palette, Smartphone, Zap } from 'lucide-react';

const benefits = [
  { icon: Link2, title: "Link único para colocar na bio", desc: "Um endereço simples que leva seus clientes direto ao biosite." },
  { icon: LayoutGrid, title: "Produtos organizados por categorias", desc: "Separe seus produtos de forma clara e profissional." },
  { icon: MessageCircle, title: "Pedido direto no WhatsApp", desc: "O cliente escolhe e já envia o pedido pelo WhatsApp." },
  { icon: Palette, title: "Visual profissional para sua marca", desc: "Catálogo com a identidade visual do seu negócio." },
  { icon: Smartphone, title: "Catálogo responsivo para celular", desc: "Funciona perfeitamente em qualquer dispositivo." },
  { icon: Zap, title: "Mais praticidade para vender todos os dias", desc: "Simplifique suas vendas com um biosite sempre disponível." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function BenefitsSection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Benefícios</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-playfair font-bold text-foreground">
            Ideal para quem vende pelo Instagram,<br className="hidden sm:block" /> WhatsApp e redes sociais com um biosite
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <b.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}