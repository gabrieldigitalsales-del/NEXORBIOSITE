import React from 'react';
import { motion } from 'framer-motion';
import {
  Shirt, Gem, Sparkles, Cake, UtensilsCrossed,
  Baby, BookOpen, Scissors, Monitor, Store
} from 'lucide-react';

const niches = [
  { icon: Shirt, label: "Moda feminina" },
  { icon: Gem, label: "Semijoias e acessórios" },
  { icon: Sparkles, label: "Cosméticos e perfumes" },
  { icon: Cake, label: "Doces, bolos e confeitaria" },
  { icon: UtensilsCrossed, label: "Marmitas e delivery local" },
  { icon: Baby, label: "Lojas infantis" },
  { icon: BookOpen, label: "Papelaria personalizada" },
  { icon: Scissors, label: "Artesanato" },
  { icon: Monitor, label: "Produtos digitais" },
  { icon: Store, label: "Lojas de bairro" },
];

export default function AudienceSection() {
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
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Para quem é</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-playfair font-bold text-foreground">
            Perfeito para pequenos negócios<br className="hidden sm:block" /> e empreendedores digitais
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {niches.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <n.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{n.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}