import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const WHATSAPP_LINK = "https://wa.me/553198261608?text=Olá%2C%20quero%20conhecer%20os%20serviços%20da%20NEXOR.";

const NAV_ITEMS = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Como Funciona", href: "/#como-funciona" },
  { label: "Planos", href: "/#planos" },
  { label: "Dúvidas", href: "/#duvidas" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-background/95 backdrop-blur-xl border-b border-border shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2.5">
            <img
              src="/assets/logo-nexor.svg"
              alt="NEXOR"
              className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover"
            />
            <span className="font-playfair text-xl md:text-2xl tracking-wider text-foreground">
              NE<span className="text-primary">X</span>OR
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              item.href.startsWith('/') && !item.href.includes('#') ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wide"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wide"
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hidden lg:block">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 rounded-full text-sm tracking-wide">
              Falar com a NEXOR
            </Button>
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <nav className="flex flex-col px-6 py-4 gap-3">
              {NAV_ITEMS.map((item) => (
                item.href.startsWith('/') && !item.href.includes('#') ? (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm text-muted-foreground hover:text-primary py-2 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm text-muted-foreground hover:text-primary py-2 transition-colors"
                  >
                    {item.label}
                  </a>
                )
              ))}
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-2">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full">
                  Falar com a NEXOR
                </Button>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}