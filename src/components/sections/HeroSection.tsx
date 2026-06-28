import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, BarChart3, TrendingUp, Database, Zap } from 'lucide-react';

const floatingCards = [
  {
    icon: <TrendingUp size={20} className="text-accent-400" />,
    label: 'Revenue Growth',
    value: '+23%',
    sub: 'Q4 2024',
    delay: 0,
    position: 'top-[15%] left-[5%]',
  },
  {
    icon: <BarChart3 size={20} className="text-success-400" />,
    label: 'Data Processed',
    value: '1.2M',
    sub: 'Rows analyzed',
    delay: 1.5,
    position: 'bottom-[25%] left-[3%]',
  },
  {
    icon: <Database size={20} className="text-warning-400" />,
    label: 'Dashboards Built',
    value: '50+',
    sub: 'This quarter',
    delay: 0.8,
    position: 'top-[20%] right-[5%]',
  },
  {
    icon: <Zap size={20} className="text-accent-300" />,
    label: 'Decisions Faster',
    value: '5x',
    sub: 'With analytics',
    delay: 2,
    position: 'bottom-[20%] right-[4%]',
  },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number; size: number; opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 174, 248, ${0.05 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 174, 248, ${p.opacity})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animFrameId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    window.addEventListener('resize', () => { resize(); init(); });

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', () => { resize(); init(); });
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden animated-gradient">
      {/* Particle canvas */}
      <canvas ref={canvasRef} id="particle-canvas" className="absolute inset-0 w-full h-full" />

      {/* Mesh grid overlay */}
      <div className="absolute inset-0 mesh-grid opacity-50" />

      {/* Radial glow center */}
      <div className="absolute inset-0 bg-gradient-radial from-accent-500/5 via-transparent to-transparent" />

      {/* Floating stat cards — desktop only */}
      {floatingCards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 + card.delay * 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute hidden xl:block ${card.position} animate-float`}
          style={{ animationDelay: `${card.delay}s` }}
        >
          <div className="glass rounded-2xl p-4 border border-white/10 shadow-premium min-w-[150px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center">
                {card.icon}
              </div>
              <span className="text-xs text-neutral-400">{card.label}</span>
            </div>
            <p className="text-xl font-bold text-white">{card.value}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{card.sub}</p>
          </div>
        </motion.div>
      ))}

      {/* Content */}
      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 border border-accent-500/20"
          >
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
            <span className="text-sm text-accent-300 font-medium">Data-Driven Digital Transformation</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-display-xl lg:text-display-2xl font-display font-bold text-white mb-6 text-balance"
          >
            Turning Data Into{' '}
            <span className="gradient-text-blue">Insights.</span>
            <br />
            Building{' '}
            <span className="relative">
              <span className="gradient-text-blue">Digital Solutions.</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gradient origin-left"
              />
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-neutral-400 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            We help businesses grow with Data Analytics, Business Intelligence, and scalable
            Web Applications. Stop flying blind — start making data-driven decisions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contact" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
              Get Free Consultation
              <ArrowRight size={18} />
            </Link>
            <Link to="/projects" className="btn-secondary text-base px-8 py-4 w-full sm:w-auto">
              <Play size={16} className="fill-current" />
              View Our Work
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {['Power BI', 'Tableau', 'Python', 'React', 'SQL', 'Node.js'].map(tech => (
              <span key={tech} className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
    </section>
  );
}
