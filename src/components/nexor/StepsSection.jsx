import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Link, MessageSquare } from 'lucide-react';

const steps = [
  {
    icon: ShoppingBag,
    number: "01",
    title: "Crie sua vitrine digital",
    desc: "Organize seus produtos com fotos, preços, descrições e categorias em um catálogo online.",
  },
  {
    icon: Link,
    number: "02",
    title: "Coloque o link na bio",
    desc: "Compartilhe seu catálogo no Instagram, WhatsApp, TikTok ou onde seus clientes estiverem.",
  },
  {
    icon: MessageSquare,
    number: "03",
    title: "Receba pedidos no WhatsApp",
    desc: "O cliente escolhe os produtos e chama você no WhatsApp com o pedido pronto para atendimento.",
  },
];

export default function StepsSection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Do Instagram ao pedido</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-playfair font-bold text-foreground">
            Venda de forma simples, rápida e profissional
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}

              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 rounded-2xl bg-card border border-border/50 flex items-center justify-center shadow-lg">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {step.number}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}