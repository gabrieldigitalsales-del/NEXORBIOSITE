import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSiteContent } from '@/lib/useSiteData';
import { getSetting, whatsappLink } from '@/lib/siteSettings';

export default function WhatsAppFloat() {
  const { data: settings } = useSiteContent();
  const whatsappNumber = getSetting(settings, 'general', 'whatsapp_number', '553198261608');
  const href = whatsappLink(whatsappNumber, 'Olá, quero conhecer os serviços da NEXOR.');

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-110"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
}
