"use client";

import * as React from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import { 
  ArrowRight, 
  ChevronDown, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Terminal, 
  Layers, 
  Radio
} from "lucide-react";
import { Button, NuovxLogo } from "@/components/ui";
import { MetricCounter, ParticleField } from "./ParticleField";
import { cn } from "@/lib/utils";

/* ── Showcase items for the dark enterprise bento grid ── */
const SHOWCASE_ITEMS = [
  {
    src: "/images/hero/hero-lab.jpg",
    alt: "Physical AI robotics lab with holographic simulation and multi-axis manipulators",
    badge: "PHYSICAL AI LAB · 01",
    metric: "41 FPS METROPOLIS PIPELINE",
    tech: "CUDA 12.4 + ISAAC SIM",
  },
  {
    src: "/images/hero/robotics-hand.jpg",
    alt: "Precision robotic actuation and tactile kinematics",
    badge: "ACTUATION & KINEMATICS",
    metric: "<10MS TORQUE LOOP",
    tech: "ROS 2 HUMBLE",
  },
  {
    src: "/images/hero/neural-network.jpg",
    alt: "Deep neural network topology and tensor acceleration",
    badge: "TENSOR TOPOLOGY",
    metric: "FP8 DYNAMIC BATCHING",
    tech: "TENSORRT 10.0",
  },
  {
    src: "/images/hero/ai-dashboard.jpg",
    alt: "Real-time edge telemetry and GPU cluster operations",
    badge: "CLUSTER TELEMETRY",
    metric: "12MS P99 INFERENCE",
    tech: "K8S DGX FABRIC",
  },
  {
    src: "/images/hero/team-working.jpg",
    alt: "Systems engineers orchestrating autonomous robotics fleets",
    badge: "FLEET ORCHESTRATION",
    metric: "200+ ACTIVE AGENTS",
    tech: "DISTRIBUTED DDS",
  },
];

/* ── Ambient Background Glow Orb ── */
function AmbientOrb({
  className,
  delay = 0,
  duration = 20,
}: {
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={cn("absolute rounded-full blur-[120px] pointer-events-none", className)}
      animate={{
        y: [0, -35, 15, -20, 0],
        x: [0, 20, -15, 25, 0],
        scale: [1, 1.12, 0.94, 1.06, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}


/* ── Dark Glass Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-bg-primary/90 backdrop-blur-2xl border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
          : "bg-bg-primary/60 backdrop-blur-xl border-b border-border/40"
      )}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
          {/* Brand Logo */}
          <a href="/" className="flex items-center group py-1">
            <NuovxLogo variant="dark" size="sm" showTagline={false} />
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {[
              { label: "About", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Systems", href: "#systems" },
              { label: "Architecture", href: "#architecture" },
              { label: "Operations", href: "#operations" },
              { label: "Careers", href: "/careers" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-[13px] font-medium text-text-secondary hover:text-accent transition-colors duration-300 tracking-wide
                  after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px]
                  after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex text-text-secondary hover:text-text-primary hover:bg-bg-card/50 text-[13px]"
              asChild
            >
              <a href="/contact">Sign In</a>
            </Button>
            <Button
              size="sm"
              className="bg-[#d4a373] hover:bg-[#e2b17a] text-[#0a0807] font-bold text-[13px] rounded-xl px-5 shadow-[0_0_20px_rgba(212,163,115,0.35)]"
              asChild
            >
              <a href="/contact">
                Deploy Now
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

/* ── Animation variants ── */
const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ── Bento Tech Card for Dark Theme ── */
function DarkBentoCard({
  src,
  alt,
  badge,
  metric,
  tech,
  index,
}: {
  src: string;
  alt: string;
  badge: string;
  metric: string;
  tech: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden group cursor-pointer w-full h-full border border-border bg-bg-card hover:border-accent/80 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
    >
      {/* Background Image */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-85 group-hover:opacity-100"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* Cyber gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-black/20 opacity-90 group-hover:opacity-75 transition-opacity duration-500" />

      {/* Tech Corner Brackets */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-[9px] font-mono font-bold tracking-widest text-accent">LIVE</span>
      </div>

      {/* Badges and telemetry overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 z-10 flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-accent bg-bg-primary/90 border border-border px-2 py-0.5 rounded-md backdrop-blur-md uppercase">
            {badge}
          </span>
          <span className="text-[9px] font-mono text-text-muted bg-bg-card/80 px-2 py-0.5 rounded-md border border-border/50 hidden sm:inline-block">
            {tech}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-display font-bold text-white tracking-tight group-hover:text-accent-bright transition-colors">
            {metric}
          </span>
          <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5">
            <ArrowRight className="w-3.5 h-3.5 text-accent" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   ── HERO SECTION (DARK THEME · ENTERPRISE TECH) ──
   ═══════════════════════════════════════════════════════ */
export function Hero() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-bg-primary pt-16"
      aria-labelledby="hero-title"
    >
      {/* ── Interactive Three.js Particle Background ── */}
      <ParticleField
        className="opacity-45 pointer-events-none"
        particleCount={1400}
        color="#d4a373"
        size={1.6}
        speed={0.12}
        interactive={true}
      />

      {/* ── Ambient Warm Champagne & Bronze Glow Orbs ── */}
      <AmbientOrb
        className="w-[750px] h-[750px] top-[-10%] left-[-15%] bg-[radial-gradient(circle,rgba(212,163,115,0.14)_0%,transparent_70%)]"
        delay={0}
        duration={24}
      />
      <AmbientOrb
        className="w-[600px] h-[600px] top-[25%] right-[-10%] bg-[radial-gradient(circle,rgba(184,115,51,0.12)_0%,transparent_70%)]"
        delay={3}
        duration={22}
      />
      <AmbientOrb
        className="w-[500px] h-[500px] bottom-[5%] left-[30%] bg-[radial-gradient(circle,rgba(212,163,115,0.08)_0%,transparent_70%)]"
        delay={6}
        duration={26}
      />

      {/* Cyber Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.20]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--accent-bright) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Glass Navbar */}
      <Navbar />

      {/* ══════════════════════════════════════
         HERO MAIN — Enterprise Headline & Mission
         ══════════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 lg:px-10 max-w-[1360px] mx-auto w-full">
        <motion.div
          className="text-center max-w-[880px] mx-auto pt-10 lg:pt-16"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Platform Status Badge */}
          <motion.div variants={fadeUp} className="mb-5">
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-[0.16em] bg-bg-card/90 border border-border text-text-secondary shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
              </span>
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              NOUVX OS v4.2 · ENTERPRISE PHYSICAL AI PLATFORM
            </span>
          </motion.div>

          {/* High-Tech Company Headline */}
          <motion.h1
            id="hero-title"
            variants={fadeUp}
            className="font-display font-extrabold text-[clamp(2.4rem,5.2vw,4.5rem)] leading-[1.1] tracking-[-0.035em] mb-5 text-text-primary"
          >
            Sovereign Physical AI &amp;
            <br />
            <span className="bg-gradient-to-r from-text-primary via-[#e2b17a] to-accent bg-clip-text text-transparent">
              Autonomous Robotics Infrastructure
            </span>
            <span className="text-accent">.</span>
          </motion.h1>

          {/* Enterprise Capabilities Pills */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {[
              "Autonomous Fleets",
              "41 FPS Vision Pipelines",
              "Sub-12ms Edge Inference",
              "ROS 2 Humble Control",
            ].map((pill) => (
              <span
                key={pill}
                className="px-3 py-1 rounded-lg text-[11px] font-mono font-semibold border border-border bg-bg-card/80 text-text-secondary shadow-xs"
              >
                <span className="text-accent mr-1.5">●</span>
                {pill}
              </span>
            ))}
          </motion.div>

          {/* Genuine Enterprise Tech Mission */}
          <motion.p
            variants={fadeUp}
            className="text-[15px] sm:text-[17px] text-text-secondary leading-[1.8] max-w-[660px] mx-auto mb-7 font-normal"
          >
            From microsecond GPU inference to autonomous fleet coordination across industrial edge environments.
            NOUVX delivers mission-critical physical AI infrastructure, low-latency vision pipelines, and ROS 2 control systems.
          </motion.p>

          {/* CTAs — Single Consistent Button Color */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4 mb-7"
          >
            <Button
              size="lg"
              className="group relative bg-[#d4a373] hover:bg-[#e2b17a] text-[#0a0807] font-bold
                shadow-[0_0_24px_rgba(212,163,115,0.4)] hover:shadow-[0_0_36px_rgba(212,163,115,0.65)]
                hover:scale-[1.02] transition-all duration-300 rounded-2xl px-8 h-12 text-[14px]"
              asChild
            >
              <a href="/contact">
                Deploy Infrastructure
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border border-border bg-bg-card/90 text-text-secondary hover:text-text-primary hover:border-accent hover:bg-accent/10 rounded-2xl px-7 h-12 text-[14px] transition-all duration-300 shadow-xs"
              asChild
            >
              <a href="#systems">
                Explore Architecture
              </a>
            </Button>
          </motion.div>

          {/* Telemetry live status pill */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-xl bg-bg-card/90 border border-border text-[11px] font-mono text-text-muted mb-8 shadow-xs"
          >
            <span className="flex items-center gap-1.5 text-[#10b981]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              SYSTEM TELEMETRY
            </span>
            <span className="w-px h-3 bg-border" />
            <span>12 DGX Clusters Active</span>
            <span className="w-px h-3 bg-border" />
            <span className="text-accent font-semibold">11.8ms P99 Latency</span>
          </motion.div>

          {/* Enterprise Platform Stats */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-6 sm:gap-14 p-4 rounded-2xl bg-bg-card/90 border border-border shadow-sm max-w-2xl mx-auto"
          >
            {[
              { value: 99.999, suffix: "%", label: "Reliability SLA", decimals: 3 },
              { value: 12, suffix: "ms", label: "P99 Latency" },
              { value: 480, suffix: "K req/s", label: "Throughput" },
              { value: 200, suffix: "+", label: "Fleet Bots" },
            ].map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && <div className="w-px h-8 bg-border" />}
                <div className="flex flex-col items-center">
                  <MetricCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={1800}
                    delay={600 + i * 120}
                    decimals={(stat as any).decimals || 0}
                    className="text-xl sm:text-2xl font-bold font-display text-text-primary tracking-tight"
                  />
                  <span className="text-[10px] text-text-muted font-mono uppercase tracking-[0.14em] mt-0.5">
                    {stat.label}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>

        {/* ══════════════════════════════════════
           DARK BENTO GRID — Enterprise Visual Chassis
           ══════════════════════════════════════ */}
        <div className="w-full mt-14 mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-12 grid-rows-2 gap-3 lg:gap-4 h-[420px] sm:h-[460px] lg:h-[480px]">
            {/* Primary large image — Physical AI Lab */}
            <div className="col-span-2 row-span-2 lg:col-span-5 lg:row-span-2">
              <DarkBentoCard
                src={SHOWCASE_ITEMS[0].src}
                alt={SHOWCASE_ITEMS[0].alt}
                badge={SHOWCASE_ITEMS[0].badge}
                metric={SHOWCASE_ITEMS[0].metric}
                tech={SHOWCASE_ITEMS[0].tech}
                index={0}
              />
            </div>

            {/* Robotics Actuation */}
            <div className="col-span-1 row-span-1 lg:col-span-3 lg:row-span-1">
              <DarkBentoCard
                src={SHOWCASE_ITEMS[1].src}
                alt={SHOWCASE_ITEMS[1].alt}
                badge={SHOWCASE_ITEMS[1].badge}
                metric={SHOWCASE_ITEMS[1].metric}
                tech={SHOWCASE_ITEMS[1].tech}
                index={1}
              />
            </div>

            {/* Neural Network Topology */}
            <div className="col-span-1 row-span-1 lg:col-span-4 lg:row-span-1">
              <DarkBentoCard
                src={SHOWCASE_ITEMS[2].src}
                alt={SHOWCASE_ITEMS[2].alt}
                badge={SHOWCASE_ITEMS[2].badge}
                metric={SHOWCASE_ITEMS[2].metric}
                tech={SHOWCASE_ITEMS[2].tech}
                index={2}
              />
            </div>

            {/* Cluster Telemetry Dashboard */}
            <div className="hidden lg:block lg:col-span-3 lg:row-span-1">
              <DarkBentoCard
                src={SHOWCASE_ITEMS[3].src}
                alt={SHOWCASE_ITEMS[3].alt}
                badge={SHOWCASE_ITEMS[3].badge}
                metric={SHOWCASE_ITEMS[3].metric}
                tech={SHOWCASE_ITEMS[3].tech}
                index={3}
              />
            </div>

            {/* Fleet Operations Command */}
            <div className="col-span-2 row-span-1 lg:col-span-4 lg:row-span-1">
              <DarkBentoCard
                src={SHOWCASE_ITEMS[4].src}
                alt={SHOWCASE_ITEMS[4].alt}
                badge={SHOWCASE_ITEMS[4].badge}
                metric={SHOWCASE_ITEMS[4].metric}
                tech={SHOWCASE_ITEMS[4].tech}
                index={4}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── High-Tech Enterprise Powered By Ribbon ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 border-t border-border bg-bg-secondary/85 backdrop-blur-md"
      >
        <div className="max-w-[1360px] mx-auto px-6 lg:px-10 py-5 flex items-center justify-between gap-6">
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em] flex-shrink-0 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-accent" />
            POWERED BY ENTERPRISE STACK
          </span>
          <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto flex-shrink-0">
            {["NVIDIA CUDA 12.4", "TENSORRT 10.0", "ROS 2 HUMBLE", "KUBERNETES DGX", "PYTORCH 2.3", "TRITON SERVER", "APACHE KAFKA"].map(
              (tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 + i * 0.08, duration: 0.5 }}
                  className="text-[12px] font-mono font-semibold text-text-secondary hover:text-accent transition-colors duration-300 cursor-default whitespace-nowrap tracking-wide"
                >
                  {tech}
                </motion.span>
              )
            )}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#d4a373]/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;