import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "motion/react";
import { Instagram, MessageCircle, MapPin, ChevronRight, Star, Clock, Heart, Award, Sparkles, Menu, X, ArrowUpRight, ArrowRight, Scissors, Gem, Check, Calendar, ChevronDown, Play } from "lucide-react";
import AnimatedShaderBackground from "./components/ui/animated-shader-background";



function RevealElement({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function TiltImage({ src, alt, className = "" }: { src: string, alt: string, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { damping: 20, stiffness: 100 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { damping: 20, stiffness: 100 });

  function onMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover shadow-2xl" style={{ transform: "translateZ(50px)" }} />
    </motion.div>
  );
}

function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-accent/60 rounded-full blur-[2px]"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: "110%",
            opacity: 0 
          }}
          animate={{ 
            y: "-10%",
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.5, 0.5],
            x: [null, (Math.random() - 0.5) * 300 + "%"]
          }}
          transition={{ 
            duration: Math.random() * 15 + 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 20
          }}
          style={{ 
            left: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );
}

function LightBeams() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[4] overflow-hidden opacity-50">
      <motion.div 
        className="absolute -top-[50%] -left-[10%] w-[150%] h-[200%] bg-gradient-to-br from-accent/20 via-transparent to-accent/10 rotate-12 blur-[120px]"
        animate={{ 
          x: [-40, 40],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute top-[20%] -right-[20%] w-[100%] h-[150%] bg-gradient-to-bl from-accent/15 via-transparent to-accent/20 -rotate-12 blur-[150px]"
        animate={{ 
          y: [-50, 50],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
}

function ParallaxImage({ src, alt, className = "" }: { src: string, alt: string, className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.img src={src} alt={alt} style={{ y, scale: 1.2 }} className="w-full h-full object-cover" />
    </div>
  );
}

function Logo({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="100" cy="100" r="91" fill="none" stroke="currentColor" strokeWidth="0.8"/>
      <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" style={{ fontFamily: '"Playfair Display", serif', fontWeight: 400, fontSize: '110px' }} fill="currentColor">M.</text>
    </svg>
  );
}

function CustomCursor() {
  const cursorDotX = useMotionValue(-100);
  const cursorDotY = useMotionValue(-100);
  const cursorOutlineX = useMotionValue(-100);
  const cursorOutlineY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 250 };
  const dotX = useSpring(cursorDotX, springConfig);
  const dotY = useSpring(cursorDotY, springConfig);
  const outlineX = useSpring(cursorOutlineX, { damping: 20, stiffness: 150 });
  const outlineY = useSpring(cursorOutlineY, { damping: 20, stiffness: 150 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorDotX.set(e.clientX);
      cursorDotY.set(e.clientY);
      cursorOutlineX.set(e.clientX - 20);
      cursorOutlineY.set(e.clientY - 20);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('.cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div className="cursor-dot hidden md:block" style={{ x: dotX, y: dotY, scale: isHovering ? 1.5 : 1 }} />
      <motion.div 
        className="cursor-outline hidden md:block" 
        style={{ x: outlineX, y: outlineY, scale: isHovering ? 2 : 1, opacity: isHovering ? 0.5 : 1 }} 
      />
    </>
  );
}

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const darkSectionRef = useRef(null);
  const isDarkSectionInView = useInView(darkSectionRef, { margin: "-10%" });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen mesh-bg text-ink overflow-x-hidden font-sans selection:bg-accent selection:text-paper perspective-2000">
      <AnimatedShaderBackground />
      <CustomCursor />
      <FloatingParticles />
      <LightBeams />
      
      {/* Barra de progresso do scroll */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left" style={{ scaleX: scaleProgress }} />
      
      {/* NAVIGATION ADAPTATIVA INTELIGENTE */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b 
        ${isDarkSectionInView 
          ? 'bg-ink/95 backdrop-blur-3xl border-white/10 py-4' 
          : scrolled ? 'bg-white/95 backdrop-blur-2xl border-ink/5 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="relative">
              <Logo className={`w-20 h-20 transition-all duration-500 ${isDarkSectionInView ? 'text-white' : 'text-ink'}`} />
            </div>
          </div>
          <a href="#agendar" className={`px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-sm shadow-xl 
            ${isDarkSectionInView 
              ? 'bg-accent text-white hover:bg-white hover:text-ink shadow-accent/20' 
              : 'bg-ink text-paper hover:bg-accent shadow-ink/10'}`}>
            Agendar Atendimento
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParallaxImage src="/assets/hero_4k.jpg" alt="Noiva Hero" className="h-full w-full" />
          {/* Sofisticado gradiente lateral para legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full h-full flex items-center">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-10"
          >
             <div className="flex justify-start">
               <span className="text-xs uppercase tracking-[0.6em] font-bold text-accent bg-paper/40 backdrop-blur-sm px-4 py-2 border-l-2 border-accent">Alta Costura</span>
             </div>
             
             <div className="space-y-4">
               <motion.h1 
                  className="editorial-title text-7xl md:text-8xl lg:text-9xl leading-[0.85] text-ink"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  Milchukova<br/><span className="italic font-light text-accent/80">Bride</span>
                </motion.h1>
                <div className="overflow-hidden">
                  <motion.p 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-xl md:text-2xl font-light text-ink/70 max-w-xl leading-relaxed"
                  >
                  Elevando a essência de cada noiva através de um design atemporal e exclusivo.
                </motion.p>
              </div>
            </div>
              
            <div className="flex flex-col sm:flex-row items-center justify-start gap-8 pt-6">
                <motion.a 
                  href="#agendar" 
                  className="btn-primary min-w-[280px] relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Falar com um especialista <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out -z-0"></div>
                </motion.a>
                <a href="#agendar" className="text-sm font-bold uppercase tracking-widest text-ink hover:text-accent transition-colors flex items-center gap-2 group cursor-pointer">
                  Ver Coleção <div className="w-12 h-[1px] bg-ink/30 group-hover:w-20 group-hover:bg-accent transition-all"></div>
                </a>
              </div>
          </motion.div>
        </div>
      </section>

      {/* VIDEOS WITH TEXT SECTION */}
      <section className="py-24 md:py-40 bg-paper">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-48">
            
            {/* Video 1 - Isafavotto Style */}
            <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="w-full lg:w-1/2 group"
              >
                <div className="relative aspect-[9/16] max-w-[420px] mx-auto rounded-3xl overflow-hidden shadow-2xl bg-ink/5 border border-ink/5">
                   <video 
                     className="w-full h-full object-cover" 
                     src="/videos/reel1.mp4" 
                     autoPlay loop muted playsInline
                     poster="/assets/bride_front.png"
                   />
                </div>
              </motion.div>
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="w-full lg:w-1/2 space-y-10"
              >
                <div className="h-[2px] w-20 bg-accent"></div>
                <h2 className="editorial-title text-5xl md:text-6xl lg:text-7xl leading-tight">
                  Sentir-se segura,<br/><span className="italic text-accent/80 font-light">linda e acolhida</span>
                </h2>
                <p className="text-2xl font-light text-ink/70 leading-relaxed max-w-xl">
                  Na <span className="font-serif italic text-ink">Milchukova Bride</span>, trabalhamos com a sua confiança. Cada ponto é meticulosamente planejado.
                </p>
                <div className="pt-6">
                  <a href="#agendar" className="group inline-flex items-center gap-4 text-sm font-bold uppercase tracking-[0.3em] text-accent hover:text-ink transition-colors">
                    Viver essa experiência <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Video 2 - Modelo Manama */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-20 lg:gap-32">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="w-full lg:w-1/2"
              >
                <div className="relative aspect-[9/16] max-w-[420px] mx-auto rounded-3xl overflow-hidden shadow-2xl bg-ink/5 border border-ink/5">
                   <video 
                     className="w-full h-full object-cover" 
                     src="/videos/reel2.mp4" 
                     autoPlay loop muted playsInline
                     poster="/assets/bride_profile.jpg"
                   />
                </div>
              </motion.div>
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="w-full lg:w-1/2 space-y-10 lg:text-right flex flex-col items-center lg:items-end"
              >
                <div className="h-[2px] w-20 bg-accent"></div>
                <h2 className="editorial-title text-5xl md:text-6xl lg:text-7xl leading-tight">
                   Detalhes que<br/><span className="italic text-accent/80 font-light">fazem a diferença</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-2xl font-light text-ink/70 leading-relaxed max-w-xl lg:ml-auto">
                    Design exclusivo Milchukova. O caimento perfeito que você merece para o seu grande dia.
                  </p>
                  <p className="text-lg text-accent uppercase tracking-[0.2em] font-medium">Exclusividade Milchukova Bride</p>
                </div>
                <div className="pt-6">
                  <a href="#agendar" className="group inline-flex items-center gap-4 text-sm font-bold uppercase tracking-[0.3em] text-accent hover:text-ink transition-colors">
                    Agendar Consultoria <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </a>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: NOSSA HISTÓRIA (STORYTELLING) */}
      <section className="py-32 md:py-56 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            
            <motion.div 
               className="lg:col-span-6 space-y-12"
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
            >
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.6em] text-accent font-bold px-4 py-1 border-b border-accent/30 inline-block">Nossa Essência</span>
                <h2 className="editorial-title text-5xl md:text-7xl text-ink leading-[0.9]">
                  De um Coração Russo<br/>
                  <span className="italic font-light text-accent/80">ao Altar Brasileiro</span>
                </h2>
              </div>

              <div className="space-y-8 text-xl md:text-2xl font-light text-ink/80 leading-relaxed italic pr-12">
                 <p className="border-l-2 border-accent/20 pl-8">
                  "Tudo começou com um chamado e um oceano de distância. Em 2019, Lera Guirado deixou a Rússia com uma missão no coração. O que era para ser uma jornada temporária tornou-se o roteiro de uma vida inteira quando o amor cruzou seu caminho."
                 </p>
                 <p className="border-l-2 border-accent/20 pl-8">
                  "Três anos de espera separavam dois corações. Em 2022, o mundo mudou. O som da guerra interrompeu os planos de um casamento na Rússia, mas não o poder do destino. Com o 'milagre' de trazer seu vestido original atravessando fronteiras, Lera disse 'sim' sob o céu brasileiro."
                 </p>
                 <p className="border-l-2 border-accent/20 pl-8">
                  "Naquele vestido — minimalista, sofisticado e editorial — centenas de noivas encontraram a tradução de seus próprios sonhos. Assim nasceu o propósito: trazer a excelência da alta costura russa para a mulher brasileira."
                 </p>
              </div>
            </motion.div>

            <motion.div 
              className="lg:col-span-6 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              <div className="relative group p-6">
                 {/* Moldura elegante */}
                 <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-accent/30"></div>
                 <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-accent/30"></div>
                 
                 <div className="shadow-2xl overflow-hidden relative z-10">
                   <TiltImage src="/assets/user_bride_essencia_final.png" alt="Essência Milchukova" className="aspect-[3/4] w-full" />
                 </div>
                 
                 {/* Elementos decorativos animados */}
                 <div className="absolute -top-12 -right-12 w-64 h-64 border border-accent/10 rounded-full -z-10 animate-float"></div>
                 <div className="absolute -bottom-12 -left-12 w-48 h-48 border border-accent/10 rounded-full -z-10 animate-float" style={{ animationDelay: '2s' }}></div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION: "O VESTIDO É A ALMA..." (VERSÃO PREMIUM LIMPA) */}
      <section ref={darkSectionRef} id="alma-section" className="py-32 md:py-56 bg-ink text-paper overflow-hidden relative">
        {/* Camadas decorativas de fundo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#222,transparent)] opacity-40 animate-pulse-slow"></div>
        <div className="absolute top-20 left-20 w-96 h-96 border border-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-[30rem] h-[30rem] border border-accent/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
        
        {/* Molduras lineares decorativas estilo editorial */}
        <motion.div 
          className="absolute top-40 left-10 w-40 h-80 border-l border-t border-accent/20 hidden lg:block"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-40 right-10 w-60 h-40 border-r border-b border-accent/20 hidden lg:block"
          animate={{ x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="lg:col-span-6 relative"
            >
               <RevealElement>
                <div className="relative p-6">
                   {/* Background 'shadow' decoration */}
                   <div className="absolute inset-0 translate-x-4 translate-y-4 bg-accent/5 -z-10"></div>
                   
                   <div className="aspect-[4/5] rounded-none overflow-hidden relative z-10 shadow-2xl border border-white/10 group">
                      <TiltImage src="/assets/user_bride_alma_veil.png" alt="A Alma Milchukova" className="h-full w-full" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent pointer-events-none"></div>
                   </div>
                </div>
               </RevealElement>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="lg:col-span-6 space-y-12"
            >
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-accent/50"></div>
                  <span className="text-xs uppercase tracking-[0.5em] text-accent font-bold">A Coleção Milchukova</span>
                </div>
                
                <h2 className="editorial-title text-5xl md:text-6xl lg:text-7xl italic leading-[1.1] text-white">
                  "O vestido é a alma do dia mais <br/>
                  <span className="text-accent">inesquecível</span> de uma mulher."
                </h2>
              </div>
              
              <div className="space-y-8 pl-8 border-l border-accent/20">
                <p className="text-xl md:text-2xl font-light text-paper/70 leading-relaxed max-w-xl">
                  Nossa curadoria é focada na noiva moderna, que busca elevar sua essência em um design atemporal.
                </p>
                
                <div className="flex flex-wrap gap-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                   <div className="flex items-center gap-3">
                      <Gem className="w-5 h-5 text-accent" />
                      <span className="text-xs uppercase tracking-widest font-bold">Exclusividade</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <Scissors className="w-5 h-5 text-accent" />
                      <span className="text-xs uppercase tracking-widest font-bold">Alta Costura</span>
                   </div>
                </div>
              </div>

              <div className="pt-8">
                <a href="#agendar" className="btn-primary min-w-[300px] border-white text-white bg-transparent hover:bg-white hover:text-ink">
                  Agendar minha visita
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section id="agendar" className="py-24 md:py-40 bg-paper relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-12">
              <div className="space-y-4">
                <h2 className="editorial-title text-6xl md:text-8xl leading-none">Sua história<br/><span className="italic font-light">começa aqui</span></h2>
                <p className="text-xl text-ink/70 font-light">Agende seu atendimento exclusivo Milchukova.</p>
              </div>
              
              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input type="text" placeholder="Nome completo" className="input-field text-lg" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <input type="tel" placeholder="WhatsApp" className="input-field text-lg" required />
                  <input type="text" placeholder="Data do casamento" className="input-field text-lg" required />
                </div>
                <button type="submit" className="btn-primary w-full group py-6 text-base tracking-[0.3em]">
                  INICIAR ATENDIMENTO <ArrowRight className="ml-4 w-6 h-6 transition-transform group-hover:translate-x-2" />
                </button>
              </form>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative">
              <div className="aspect-[4/5] rounded-none overflow-hidden shadow-2xl skew-y-1">
                <img src="/assets/bride_front.png" alt="Noiva Milchukova" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-paper border-t border-ink/5 py-24">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <div className="flex flex-col items-center gap-8 text-ink">
             <Logo className="w-32 h-32" />
             
             <div className="space-y-4 max-w-lg">
                <p className="text-2xl font-light text-ink/80 italic leading-relaxed">
                  Curadoria de vestidos de noiva da Rússia
                </p>
                <div className="flex items-center justify-center gap-6 text-ink/60 font-bold tracking-[0.3em] text-xs">
                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> MARINGÁ - PR</span>
                    <div className="flex items-center gap-3 border-l border-ink/10 pl-6 ml-2">
                      <img src="https://flagcdn.com/w40/ru.png" className="w-7 h-5 border border-ink/5 shadow-sm" alt="Rússia" />
                      <img src="https://flagcdn.com/w40/br.png" className="w-7 h-5 border border-ink/5 shadow-sm" alt="Brasil" />
                    </div>
                </div>
             </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 pt-4">
            <a href="https://www.instagram.com/milchukovabride/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-full border border-ink/10 flex items-center justify-center group-hover:bg-ink group-hover:text-paper transition-all duration-500 transform group-hover:-rotate-12 shadow-lg shadow-ink/5">
                <Instagram className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-ink/40 font-bold">Acompanhe-nos</p>
                <span className="text-sm uppercase tracking-[0.2em] font-bold group-hover:text-accent transition-colors">@milchukovabride</span>
              </div>
            </a>
            
            <a href="https://wa.me/554499039756" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-full border border-ink/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500 transform group-hover:rotate-12 shadow-lg shadow-accent/5">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-ink/40 font-bold">Agende Agora</p>
                <span className="text-sm uppercase tracking-[0.2em] font-bold group-hover:text-accent transition-colors">+55 44 9903-9756</span>
              </div>
            </a>
          </div>

          <div className="h-[1px] w-64 bg-accent/20 mx-auto"></div>
          
          <div className="text-[10px] uppercase tracking-[0.6em] font-bold text-ink/30">
            Exclusividade • Sofisticação • Elegância
          </div>
          <p className="text-xs text-ink/40 font-light tracking-wide">
            &copy; {new Date().getFullYear()} Milchukova Bride Atelier.
          </p>
        </div>
      </footer>

    </div>
  );
}

