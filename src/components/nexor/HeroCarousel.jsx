import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHeroSlides } from '@/lib/useSiteData';
import { Link } from 'react-router-dom';

const FALLBACK_SLIDES = [
  { id: 'f1', tag: "Biosite", title: "Transforme sua bio do Instagram em uma", highlight: "vitrine de vendas", desc: "Seu negócio ganha um biosite moderno para seus clientes acessarem produtos e chamarem direto no WhatsApp.", cta: "Quero meu biosite", wamsg: "Olá%2C%20quero%20criar%20meu%20biosite%20com%20a%20NEXOR.", bg_color: "from-amber-50 to-orange-50", active: true, order: 1 },
];

export default function HeroCarousel() {
  const { data: rawSlides } = useHeroSlides();
  const slides = (rawSlides?.filter(s => s.active) || []).sort((a, b) => a.order - b.order);
  const activeSlides = slides.length > 0 ? slides : FALLBACK_SLIDES;

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

  // Reset index if slides change
  useEffect(() => {
    setCurrent(0);
  }, [activeSlides.length]);

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
      {/* Blobs */}
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
            {/* Text */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-primary font-semibold tracking-wider uppercase">{slide.tag}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold leading-tight text-foreground">
                {slide.title}{' '}
                <span className="text-primary">{slide.highlight}</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                {slide.desc}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start">
                <a href={`https://wa.me/553198261608?text=${slide.wamsg}`} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 rounded-full text-base gap-2 shadow-lg shadow-primary/20">
                    {slide.cta}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
                <Link to="/servicos">
                  <Button variant="outline" className="w-full sm:w-auto border-border text-foreground hover:bg-secondary px-8 py-6 rounded-full text-base">
                    Ver todos os serviços
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image (if any) */}
            {slide.image_url && (
              <div className="flex justify-center lg:justify-end">
                <div className="relative animate-float">
                  <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl scale-90" />
                  <img
                    src={slide.image_url}
                    alt={slide.tag}
                    className="relative w-72 sm:w-80 lg:w-96 rounded-3xl shadow-2xl shadow-black/20 object-cover max-h-[480px]"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
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

        {/* Dots */}
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