import React from 'react';
import { motion } from 'framer-motion';
import {
  Camera, FolderOpen, MessageCircle, ShoppingCart,
  Link2, Paintbrush, Star, CreditCard, Globe, Headphones
} from 'lucide-react';

const features = [
  { icon: Camera, title: "Cadastro de produtos", desc: "Foto, preço e descrição para cada item." },
  { icon: FolderOpen, title: "Categorias personalizadas", desc: "Organize seus produtos de forma intuitiva." },
  { icon: MessageCircle, title: "Botão de pedido pelo WhatsApp", desc: "Conexão direta com seus clientes." },
  { icon: ShoppingCart, title: "Carrinho ou resumo de pedido", desc: "O cliente monta o pedido antes de enviar." },
  { icon: Link2, title: "Link para bio do Instagram", desc: "Endereço limpo e fácil de compartilhar." },
  { icon: Paintbrush, title: "Identidade visual", desc: "Logo, cores e banner da sua marca." },
  { icon: Star, title: "Promoções e destaques", desc: "Produtos em destaque e ofertas especiais." },
  { icon: CreditCard, title: "Integração com Pix", desc: "Link de pagamento quando aplicável." },
  { icon: Globe, title: "Domínio personalizado", desc: "Disponível em planos avançados." },
  { icon: Headphones, title: "Suporte para atualizações", desc: "Atualize seu catálogo quando precisar." },
];

export default function FeaturesSection() {
  return (
    <section id="recursos" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Recursos</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-playfair font-bold text-foreground">
            Tudo que seu biosite precisa<br className="hidden sm:block" /> para vender mais
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}