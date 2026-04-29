import React from 'react';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_LINK = "https://wa.me/553198261608?text=Olá%2C%20quero%20conhecer%20os%20serviços%20da%20NEXOR.";

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-110"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
}