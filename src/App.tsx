import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, Check, Star, Calendar, MapPin, MessageCircle, Heart, Sparkles, Scissors, Gem, Play } from 'lucide-react';
import { useState } from 'react';

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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
    <div className="min-h-screen bg-paper text-ink overflow-x-hidden font-sans">
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-md border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
          <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="relative">
              <img src="/assets/logo.png" alt="Milchukova Bride Logo" className="w-20 h-20 object-contain transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-accent/10 rounded-full scale-125 -z-10 group-hover:scale-150 transition-transform"></div>
            </div>
          </div>
          <a href="#agendar" className="bg-ink text-paper px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-accent transition-all rounded-sm shadow-xl shadow-ink/5">
            Agendar Atendimento
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/bride_front.png" 
            alt="Milchukova Bride - A Noiva" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-paper/10 via-transparent to-paper"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative space-y-12">
             <motion.div variants={fadeInUp} className="flex justify-center mb-6">
               <span className="text-sm uppercase tracking-[0.6em] font-bold text-ink drop-shadow-sm bg-paper/20 backdrop-blur-sm px-4 py-1">Alta Costura</span>
             </motion.div>
             <motion.h1 
                variants={fadeInUp}
                className="editorial-title text-7xl md:text-9xl lg:text-[10rem] mb-8 leading-[0.8]"
              >
                Milchukova<br/><span className="italic font-light">Bride</span>
              </motion.h1>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
                <a href="#agendar" className="btn-primary min-w-[280px]">
                  Falar com um especialista <ArrowRight className="ml-3 w-5 h-5" />
                </a>
              </motion.div>
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

      {/* SECTION: "O VESTIDO É A ALMA..." */}
      <section className="py-32 md:py-48 bg-ink text-paper overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-paper/5 mix-blend-overlay pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="lg:col-span-6 relative"
            >
              <div className="aspect-[4/5] rounded-none overflow-hidden relative z-10 shadow-2xl border border-paper/10">
                <img 
                  src="/assets/bride_profile.jpg" 
                  alt="A Noiva Milchukova" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-48 h-48 border border-paper/10 rounded-full overflow-hidden z-20 shadow-2xl">
                 {/* LUGAR LOGO M -> FOTO MULHER */}
                 <img src="/assets/bride_front.png" alt="Noiva Detalhe" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="lg:col-span-6 space-y-12"
            >
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-[0.4em] text-accent font-bold">A Coleção Milchukova</span>
                <p className="font-serif text-4xl md:text-5xl lg:text-6xl italic leading-tight text-paper">
                  "O vestido é a alma do dia mais inesquecível de uma mulher."
                </p>
              </div>
              <div className="h-[2px] w-32 bg-accent/30"></div>
              <p className="text-xl font-light text-paper/70 leading-relaxed max-w-xl">
                Nossa curadoria é focada na noiva moderna, que busca elevar sua essência em um design atemporal.
              </p>
              <div className="pt-8">
                 {/* NA DIREITINHA ONDE TINHA FOTO MULHER -> LOGO M */}
                 <img src="/assets/logo.png" alt="Logo M" className="w-40 h-40 object-contain filter invert" />
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
          <div className="flex flex-col items-center gap-6">
             <img src="/assets/logo.png" alt="Logo Footer" className="w-32 h-32 object-contain" />
          </div>
          <div className="h-[1px] w-40 bg-accent/20 mx-auto"></div>
          <div className="text-sm uppercase tracking-[0.4em] font-bold text-ink/50">
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

