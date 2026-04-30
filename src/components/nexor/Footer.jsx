import React from 'react';
import { Instagram, Phone } from 'lucide-react';
import { useSiteContent } from '@/lib/useSiteData';
import { formatPhoneBR, getSetting, onlyDigits } from '@/lib/siteSettings';

export default function Footer() {
  const { data: settings } = useSiteContent();
  const logoUrl = getSetting(settings, 'general', 'logo_url', '/assets/logo-nexor.svg');
  const tagline = getSetting(settings, 'footer', 'tagline', 'Biosites e soluções digitais para transformar sua presença online em vendas.');
  const copyright = getSetting(settings, 'footer', 'copyright', 'NEXOR. Todos os direitos reservados.');
  const instagram = getSetting(settings, 'general', 'instagram_handle', 'nexor_digital_group_').replace('@', '');
  const whatsappNumber = getSetting(settings, 'general', 'whatsapp_number', '553198261608');

  return (
    <footer className="relative border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8 items-start">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src={logoUrl}
                alt="NEXOR"
                className="h-9 w-9 rounded-full object-cover"
              />
              <span className="font-playfair text-xl tracking-wider text-foreground">
                NE<span className="text-primary">X</span>OR
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {tagline}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wider uppercase">Contato</h4>
            <div className="space-y-3">
              <a
                href={`https://www.instagram.com/${instagram}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @{instagram}
              </a>
              <a
                href={`https://wa.me/${onlyDigits(whatsappNumber)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                {formatPhoneBR(whatsappNumber)}
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wider uppercase">Navegação</h4>
            <div className="space-y-2.5">
              {[
                { label: "Início", href: "/" },
                { label: "Serviços", href: "/servicos" },
                { label: "Como Funciona", href: "/#como-funciona" },
                { label: "Planos", href: "/#planos" },
                { label: "Dúvidas", href: "/#duvidas" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 {copyright}</p>
          <a
            href={`https://www.instagram.com/${instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Feito por Nexor Digital Group
          </a>
        </div>
      </div>
    </footer>
  );
}
