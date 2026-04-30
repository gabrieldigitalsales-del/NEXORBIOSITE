import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHeroSlides, useSiteContent } from '@/lib/useSiteData';
import { Link } from 'react-router-dom';
import { getSetting, whatsappLink } from '@/lib/siteSettings';

function hasUploadedImage(slide) {
  const url = typeof slide?.image_url === 'string' ? slide.image_url.trim() : '';
  if (!url) return false;
  if (url.startsWith('/assets/') || url.startsWith('assets/')) return false;
  return true;
}

export default function HeroCarousel() {
  const { data: rawSlides, isLoading } = useHeroSlides();
  const { data: settings } = useSiteContent();
  const whatsappNumber = getSetting(settings, 'general', 'whatsapp_number', '553198261608');

  // REGRA IMPORTANTE:
  // O hero nao usa mais imagem padrao/local. Ele so renderiza slides ativos com imagem enviada no admin.
  // Isso evita carregar qualquer imagem local antes do upload do Supabase chegar.
  const activeSlides = (rawSlides || [])
    .filter((s) => s.active && hasUploadedImage(s))
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % activeSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  useEffect(() => {
    setCurrent(0);
  }, [activeSlides.length]);

  if (isLoading) {
    return (
      <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex items-center justify-center">
          <div className="flex items-center gap-3 text-primary font-semibold">
            <Loader2 className="w-5 h-5 animate-spin" />
            Carregando conteudo...
          </div>
        </div>
      </section>
    );
  }

  // Sem slide com imagem enviada: nao mostra imagem default nem mockup local.
  if (activeSlides.length === 0) return null;

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % activeSlides.length);
  };

  const slide = activeSlides[current] || activeSlides[0];
  if (!slide) return null;

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.3 } }),
  };

  return (
    <section id="inicio" className={`relative min-h-screen flex items-center pt-20 overflow-hidden transition-colors duration-700 bg-gradient-to-br ${slide.bg_color || 'from-amber-50 to-orange-50'}`}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/6 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={slide.id || current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="text-center lg:text-left">
              {slide.tag && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-primary font-semibold tracking-wider uppercase">{slide.tag}</span>
                </div>
              )}

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold leading-tight text-foreground">
                {slide.title}{' '}
                <span className="text-primary">{slide.highlight}</span>
              </h1>

              {slide.desc && (
                <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {slide.desc}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start">
                {slide.cta && (
                  <a href={whatsappLink(whatsappNumber, slide.wamsg)} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 rounded-full text-base gap-2 shadow-lg shadow-primary/20">
                      {slide.cta}
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </a>
                )}
                <Link to="/servicos">
                  <Button variant="outline" className="w-full sm:w-auto border-border text-foreground hover:bg-secondary px-8 py-6 rounded-full text-base">
                    Ver todos os serviços
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl scale-90" />
                <img
                  src={slide.image_url.trim()}
                  alt={slide.tag || slide.title || 'Imagem enviada no admin'}
                  className="relative w-72 sm:w-80 lg:w-96 rounded-3xl shadow-2xl shadow-black/20 object-cover max-h-[480px]"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {activeSlides.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 border border-border shadow-sm flex items-center justify-center hover:bg-white transition-colors">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 border border-border shadow-sm flex items-center justify-center hover:bg-white transition-colors">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </>
        )}

        {activeSlides.length > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {activeSlides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? 'bg-primary w-8 h-2.5' : 'bg-primary/30 w-2.5 h-2.5'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
