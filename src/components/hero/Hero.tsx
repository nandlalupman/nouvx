"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Zap, Shield, Cpu, Network, Activity, Sparkles } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { ParticleField, SystemMap, VariableFontDisplay, MetricCounter, GlitchText } from "./ParticleField";

const STATS = [
  { label: "Reliability", value: 99.98, suffix: "%", color: "var(--success)",        icon: Shield,   delay: 0   },
  { label: "Monitoring",  value: 24,    suffix: "/7", color: "var(--accent-primary)", icon: Activity, delay: 100 },
  { label: "Latency",     value: 12,    suffix: "ms", color: "var(--emerald)",        icon: Zap,      delay: 200 },
  { label: "Uptime",      value: 100,   suffix: "%",  color: "var(--indigo-bright)",  icon: Network,  delay: 300 },
];

const SYSTEM_LAYERS = [
  { id: "sensors",       label: "SENSORS",           tech: "MQTT",      color: "text-text-muted",    y: -2   },
  { id: "acquisition",   label: "DATA ACQUISITION",  tech: "KAFKA",     color: "text-warning",       y: -1.2 },
  { id: "processing",    label: "AI PROCESSING",     tech: "CUDA",      color: "text-accent",        y: -0.4 },
  { id: "vision",        label: "COMPUTER VISION",   tech: "OPENCV",    color: "text-vision",        y:  0.4 },
  { id: "inference",     label: "INFERENCE ENGINE",  tech: "FASTAPI",   color: "text-accent-bright", y:  1.2 },
  { id: "cloud",         label: "CLOUD INFRA",       tech: "K8S",       color: "text-indigo",        y:  2   },
  { id: "dashboard",     label: "REAL-TIME DASH",    tech: "WEBSOCKET", color: "text-success",       y:  2.8 },
  { id: "automation",    label: "ALERT & AUTOMATION", tech: "RULES",    color: "text-accent",        y:  3.6 },
];

/* ── Navbar ── */
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
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#0c0908]/90 backdrop-blur-2xl border-b border-[#33261e] shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e2b17a] via-[#d4a373] to-[#b87333] flex items-center justify-center shadow-[0_0_20px_rgba(212,163,115,0.4)]">
                <Cpu className="w-5 h-5 text-[#0a0807]" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-[#d4a373] opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-text-primary">
              NOUVX
            </span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {[
              { label: "Systems",      href: "#systems"       },
              { label: "Architecture", href: "#architecture"  },
              { label: "Operations",   href: "#operations"    },
              { label: "Stack",        href: "#stack"         },
              { label: "Careers",      href: "/careers"       },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link text-text-muted hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2.5">
            <Button variant="ghost" size="sm" className="hidden lg:flex text-text-muted">
              Sign In
            </Button>
            <Button size="sm" asChild>
              <a href="/contact">
                Contact
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

/* ── Hero ── */
export function Hero() {
  const [selectedLayer, setSelectedLayer] = React.useState<string>("processing");
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary pt-16"
      aria-labelledby="hero-title"
    >
      {/* Particle field */}
      <ParticleField
        particleCount={1000}
        color="#d4a373"
        size={1.1}
        speed={0.06}
        interactive={true}
        className="opacity-60"
      />

      {/* Background halos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[700px]
          bg-[radial-gradient(ellipse,rgba(212,163,115,0.18)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px]
          bg-[radial-gradient(ellipse,rgba(198,134,66,0.12)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px]
          bg-[radial-gradient(ellipse,rgba(229,169,80,0.08)_0%,transparent_65%)]" />
      </div>

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,163,115,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,163,115,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16
        px-4 lg:px-8 max-w-7xl mx-auto w-full py-20 pt-24">

        {/* Left — Text */}
        <div className="flex-1 max-w-2xl lg:pr-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7"
          >
            <Badge variant="accent" size="lg" dot animate className="gap-2">
              <Sparkles className="w-3 h-3" />
              NOUVX OPS · LIVE SYSTEM MAP · ACTIVE
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display font-bold mb-6 leading-[1.04] tracking-tight"
          >
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] text-text-primary">
              Engineering the
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem]">
              <span className="gradient-text">Future of Intelligent</span>
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] text-text-primary">
              Systems<span className="text-text-muted font-normal">.</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-lg mb-10"
          >
            NOUVX delivers advanced AI infrastructure, robotics platforms, computer vision systems,
            and enterprise-scale operational technology for complex real-world environments.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="flex flex-wrap gap-3.5 mb-14"
          >
            <Button size="lg" className="group shine" asChild>
              <a href="/contact">
                Start a Project
                <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#systems">Explore Systems</a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44 }}
            className="flex flex-wrap items-center gap-6 sm:gap-10"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.44 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div
                  className="stat-icon-wrap group-hover:border-border-bright"
                  style={{ borderColor: `${stat.color}35` }}
                >
                  <stat.icon className="w-4.5 h-4.5" style={{ color: stat.color }} aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-baseline gap-0.5">
                    <MetricCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={1400}
                      delay={stat.delay}
                      className="text-2xl font-bold font-display leading-none"
                      style={{ color: stat.color }}
                    />
                  </div>
                  <div className="text-[10px] text-text-muted font-mono uppercase tracking-widest mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right — System Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full lg:w-[560px] h-[460px] lg:h-[580px] flex-shrink-0"
        >
          {/* Outer glow ring */}
          <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-[#d4a373]/25 via-[#b87333]/15 to-transparent blur-3xl" />

          {/* Glass frame */}
          <div className="absolute inset-0 rounded-3xl border border-[#d4a373]/30 bg-[#120d0a]/90 backdrop-blur-xl shadow-[0_0_50px_rgba(212,163,115,0.15),0_20px_60px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)]" />

          <SystemMap className="w-full h-full" interactive={true} />

          {/* Layer pills */}
          <div className="absolute bottom-5 left-4 right-4 flex flex-wrap justify-center gap-1.5">
            {SYSTEM_LAYERS.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                className={[
                  "px-2.5 py-1 rounded-full text-[10px] font-mono font-medium transition-all duration-200",
                  selectedLayer === layer.id
                    ? "bg-[#d4a373] text-[#0a0807] font-bold shadow-[0_0_18px_rgba(212,163,115,0.6)]"
                    : "bg-[#1c1613] text-[#d6cfc7] hover:text-[#e2b17a] hover:bg-[#271f1a] border border-[#382b22]",
                ].join(" ")}
              >
                {layer.label}
                <span className="opacity-50 ml-1">[{layer.tech}]</span>
              </button>
            ))}
          </div>

          {/* Selected layer detail */}
          <motion.div
            key={selectedLayer}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-[4.5rem] left-4 right-4 glass rounded-2xl p-4 max-w-sm mx-auto"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
              <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
                Active Layer
              </span>
            </div>
            <h4 className="font-display font-bold text-text-primary text-sm mb-1">
              {SYSTEM_LAYERS.find((l) => l.id === selectedLayer)?.label}
            </h4>
            <p className="text-xs text-text-secondary mb-2.5 leading-relaxed">
              {SELECTED_LAYER_DETAILS[selectedLayer]}
            </p>
            <div className="flex flex-wrap gap-1">
              {SELECTED_LAYER_TECH[selectedLayer].map((tech) => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-dim"
        aria-hidden="true"
      >
        <ChevronDown className="w-5 h-5 animate-float" />
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll to Explore</span>
      </motion.div>
    </section>
  );
}

/* ── Data ── */
const SELECTED_LAYER_DETAILS: Record<string, string> = {
  sensors:     "MQTT-based sensor ingestion layer handling millions of telemetry streams from distributed edge devices.",
  acquisition: "Apache Kafka event streaming platform for high-throughput, fault-tolerant data acquisition and buffering.",
  processing:  "GPU-accelerated model execution, feature extraction, and real-time scoring on CUDA cores.",
  vision:      "Industrial computer vision pipelines: detection, tracking, segmentation, and edge analytics at 41 FPS.",
  inference:   "Low-latency inference serving with FastAPI, model registry, and automated scaling on Kubernetes.",
  cloud:       "Kubernetes-native distributed infrastructure with multi-region deployments and autoscaling.",
  dashboard:   "WebSocket-powered real-time operational dashboards with sub-100ms update latency.",
  automation:  "Rule-based alerting and automation engine with human-in-the-loop escalation policies.",
};

const SELECTED_LAYER_TECH: Record<string, string[]> = {
  sensors:     ["MQTT", "CoAP", "Modbus", "OPC-UA"],
  acquisition: ["Kafka", "Redis Streams", "Protobuf", "Schema Registry"],
  processing:  ["CUDA", "TensorRT", "ONNX Runtime", "PyTorch"],
  vision:      ["OpenCV", "YOLO", "TensorFlow", "DeepSORT"],
  inference:   ["FastAPI", "Triton", "vLLM", "BentoML"],
  cloud:       ["K8s", "Helm", "ArgoCD", "Istio"],
  dashboard:   ["WebSocket", "Canvas API", "Recharts", "Web Workers"],
  automation:  ["Rule Engine", "Celery", "Temporal", "AlertManager"],
};

export default Hero;