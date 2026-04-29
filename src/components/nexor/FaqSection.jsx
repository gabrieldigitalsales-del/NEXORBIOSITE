import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFaqItems } from '@/lib/useSiteData';

const FALLBACK = [
  { id: 'f1', question: "O biosite funciona no Instagram?", answer: "Sim. Você recebe um link para colocar na bio do Instagram, nos stories, no WhatsApp ou em qualquer rede social." },
  { id: 'f2', question: "O cliente consegue comprar direto pelo biosite?", answer: "O cliente escolhe os produtos e envia o pedido pelo WhatsApp, facilitando o atendimento e a finalização da venda." },
  { id: 'f3', question: "Preciso ter loja virtual?", answer: "Não. O biosite é ideal para quem quer vender de forma simples, sem precisar de uma loja virtual complexa." },
  { id: 'f4', question: "Posso personalizar com minha marca?", answer: "Sim. O biosite pode ter logo, cores, banner e informações da sua empresa." },
  { id: 'f5', question: "Serve para qualquer tipo de produto?", answer: "Sim. É ideal para moda, cosméticos, doces, delivery, acessórios, semijoias, papelaria, artesanato e vários outros segmentos." },
];

export default function FaqSection() {
  const { data: rawItems } = useFaqItems();
  const sorted = (rawItems?.filter(f => f.active) || []).sort((a, b) => a.order - b.order);
  const items = sorted.length > 0 ? sorted : FALLBACK;

  return (
    <section id="duvidas" className="relative py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Dúvidas</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-playfair font-bold text-foreground">
            Perguntas frequentes
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {items.map((faq, i) => (
              <AccordionItem
                key={faq.id || i}
                value={`faq-${faq.id || i}`}
                className="bg-card border border-border/50 rounded-2xl px-6 data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-foreground font-medium py-5 hover:no-underline hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}