"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Zap, Shield, Cpu, Network, Activity, Sparkles } from "lucide-react";
import { Button, Badge, NuovxLogo } from "@/components/ui";
import { ParticleField, SystemMap, VariableFontDisplay, MetricCounter, GlitchText } from "./ParticleField";
import { cn } from "@/lib/utils";

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
          ? "bg-[#ffffff]/90 backdrop-blur-2xl border-b border-[#e2d5c5] shadow-[0_4px_30px_rgba(40,25,15,0.06)]"
          : "bg-white/80 backdrop-blur-md border-b border-[#ece2d6]/70",
      ].join(" ")}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a href="/" className="flex items-center group py-1">
            <NuovxLogo variant="light" size="sm" showTagline={true} />
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
                className="nav-link text-[#524337] hover:text-[#140f0c] transition-colors font-medium text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2.5">
            <Button variant="ghost" size="sm" className="hidden lg:flex text-[#524337] hover:text-[#140f0c] hover:bg-[#f6efe6]">
              Sign In
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-[#0072ff] to-[#00f5a0] text-[#ffffff] font-bold shadow-[0_2px_14px_rgba(0,114,255,0.25)] hover:shadow-[0_4px_20px_rgba(0,114,255,0.35)]" asChild>
              <a href="/contact">
                Get Started
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
      className="relative min-h-screen lg:h-screen lg:max-h-[960px] flex flex-col justify-between overflow-hidden bg-[#ffffff] pt-16 border-b border-[#e8ded0]"
      aria-labelledby="hero-title"
    >
      {/* Particle field with subtle warm bronze */}
      <ParticleField
        particleCount={700}
        color="#00c853"
        size={1.1}
        speed={0.04}
        interactive={true}
        className="opacity-30"
      />

      {/* Background studio halos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[750px]
          bg-[radial-gradient(ellipse,rgba(0,114,255,0.08)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[600px]
          bg-[radial-gradient(ellipse,rgba(0,245,160,0.08)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px]
          bg-[radial-gradient(ellipse,rgba(255,109,0,0.06)_0%,transparent_65%)]" />
      </div>

      {/* Architect grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,114,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,114,255,0.3) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Main content — Clean Viewport Fitting */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12
        px-4 lg:px-8 max-w-7xl mx-auto w-full py-6 lg:py-0 my-auto">

        {/* Left — Text */}
        <div className="flex-1 max-w-2xl lg:pr-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[#f0f6ff] border border-[#d0e2ff] text-[#0062ff] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#00c853] animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-[#00c6ff]" />
              A BRIGHTER TOMORROW WITH SKILLS · LEARN • CODE • CREATE
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="font-display font-bold mb-4 leading-[1.06] tracking-tight"
          >
            <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-[3.8rem] text-[#140f0c]">
              Transforming Minds.
            </span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-[3.8rem]">
              <span className="bg-gradient-to-r from-[#0062ff] via-[#00c6ff] to-[#00e5a3] bg-clip-text text-transparent">
                Accelerating Engineers.
              </span>
            </span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-[3.8rem] text-[#140f0c]">
              Building Intelligent Systems<span className="text-[#00c853]">.</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-sm sm:text-base text-[#524438] leading-relaxed max-w-xl mb-6 font-normal"
          >
            NUOVX is the premier AI, robotics, and advanced software engineering platform 
            empowering creators to master deep neural architectures, deploy autonomous fleets, 
            and code production-ready intelligent systems.
          </motion.p>

          {/* Feature Chips */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {[
              { label: "⚡ CUDA & TensorRT", bg: "bg-[#eef6ff] text-[#0062ff] border-[#cce1ff]" },
              { label: "🤖 ROS 2 & Omniverse", bg: "bg-[#f0fbf4] text-[#00a844] border-[#c6f0d4]" },
              { label: "👁️ Metropolis Vision AI", bg: "bg-[#f5f0ff] text-[#7928ca] border-[#e4d4ff]" },
              { label: "🌐 Production K8s Clusters", bg: "bg-[#fff8f0] text-[#d96500] border-[#fed7aa]" },
            ].map((chip) => (
              <span
                key={chip.label}
                className={cn("px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border", chip.bg)}
              >
                {chip.label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            <Button size="lg" className="group bg-gradient-to-r from-[#0062ff] to-[#00c853] text-[#ffffff] font-bold shadow-[0_4px_22px_rgba(0,98,255,0.28)] hover:shadow-[0_8px_30px_rgba(0,98,255,0.4)]" asChild>
              <a href="/contact">
                Start Coding Now
                <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild
              className="bg-white border-[#d8c7b5] text-[#2c2118] hover:bg-[#f7efe5] hover:border-[#0062ff]/50 shadow-sm font-semibold"
            >
              <a href="#systems">Explore Ecosystem</a>
            </Button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-[#ffffff] border border-[#e2d5c4] shadow-[0_4px_20px_rgba(40,25,15,0.04)]"
          >
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all"
                  style={{ borderColor: `${stat.color}40`, backgroundColor: `${stat.color}14` }}
                >
                  <stat.icon className="w-4 h-4" style={{ color: stat.color }} aria-hidden="true" />
                </div>
                <div>
                  <MetricCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={1400}
                    delay={stat.delay}
                    className="text-lg font-bold font-display leading-none text-[#140f0c]"
                  />
                  <div className="text-[10px] text-[#7a6a5c] font-mono uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — System Map (Floating Enterprise Hardware Chassis) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full lg:w-[540px] h-[400px] lg:h-[500px] flex-shrink-0"
        >
          {/* Outer glow ring on white */}
          <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-[#d4a373]/30 via-[#b87333]/20 to-transparent blur-3xl opacity-80" />

          {/* Glass frame */}
          <div className="absolute inset-0 rounded-3xl border border-[#b87333]/45 bg-[#120d0a] shadow-[0_25px_60px_rgba(40,25,15,0.22),0_4px_20px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]" />

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