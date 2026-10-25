"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Network,
  Bot,
  Eye,
  Cpu,
  Globe,
  Users,
  Target,
  Award,
  CheckCircle2,
  Heart,
} from "lucide-react";
import { Button, NuovxLogo, Badge } from "@/components/ui";
import { Footer } from "@/components/footer/Footer";

const STATS = [
  { value: "200+", label: "Active Robot Fleet" },
  { value: "99.999%", label: "Platform Reliability" },
  { value: "47", label: "Global Deployments" },
  { value: "12ms", label: "P99 Inference Latency" },
];

const TIMELINE = [
  {
    year: "2022",
    title: "Foundation",
    description: "NUOVX founded with the mission to bridge AI research and physical-world systems engineering.",
    color: "#b45309",
  },
  {
    year: "2023",
    title: "First Fleet Deployment",
    description: "Deployed autonomous mobile robot fleet in a 100K sqft warehouse with zero safety incidents.",
    color: "#10b981",
  },
  {
    year: "2024",
    title: "Vision Intelligence Platform",
    description: "Launched VisionGrid — 41 FPS edge inference for industrial quality inspection across 47 facilities.",
    color: "#d97706",
  },
  {
    year: "2025",
    title: "Enterprise NIM Fabric",
    description: "Production-grade NVIDIA NIM microservice fabric with 99.999% SLA and active-active DR.",
    color: "#9a3412",
  },
  {
    year: "2026",
    title: "Global Scale",
    description: "Operating across India and Europe with 200+ autonomous agents, DGX clusters, and sovereign AI infrastructure.",
    color: "#f59e0b",
  },
];

const VALUES = [
  {
    icon: Shield,
    title: "Engineering Rigor",
    description: "Every system we build meets production-grade reliability standards. Zero shortcuts, zero compromises.",
    color: "#f43f5e",
  },
  {
    icon: Target,
    title: "Mission-Critical Focus",
    description: "We build for environments where failure is not an option — autonomous fleets, industrial control, and real-time analytics.",
    color: "#b45309",
  },
  {
    icon: Users,
    title: "Deep Collaboration",
    description: "We work alongside client engineering teams as embedded architects, not external consultants.",
    color: "#10b981",
  },
  {
    icon: Zap,
    title: "Obsessive Performance",
    description: "Sub-millisecond latencies, 41 FPS vision pipelines, 480K req/s throughput — we push hardware to its limits.",
    color: "#f59e0b",
  },
  {
    icon: Globe,
    title: "Sovereign Systems",
    description: "Our infrastructure runs where our clients need it — on-prem, edge, air-gapped, or hybrid cloud.",
    color: "#9a3412",
  },
  {
    icon: Heart,
    title: "Knowledge Transfer",
    description: "Every engagement ends with your team fully empowered to operate, maintain, and extend the systems we build.",
    color: "#d97706",
  },
];

const TEAM_CAPABILITIES = [
  { icon: Cpu, label: "CUDA & TensorRT Optimization", color: "#b45309" },
  { icon: Bot, label: "ROS 2 Robotics Engineering", color: "#d97706" },
  { icon: Eye, label: "Computer Vision at Scale", color: "#10b981" },
  { icon: Network, label: "Distributed Infrastructure", color: "#9a3412" },
  { icon: Zap, label: "Real-Time Analytics", color: "#f59e0b" },
  { icon: Shield, label: "Security & Compliance", color: "#f43f5e" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-accent/30 selection:text-white">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-border shadow-xs">
        <div className="section-container flex items-center justify-between h-16 lg:h-[4.5rem]">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center group py-1">
              <NuovxLogo variant="light" size="sm" showTagline={false} />
            </a>
            <span className="h-4 w-px bg-border hidden sm:block" />
            <a
              href="/"
              className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ai"
              size="sm"
              className="rounded-xl px-4 shadow-sm"
              asChild
            >
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.14)_0%,transparent_70%)]" />
        </div>

        <div className="section-container relative z-10 text-center max-w-4xl mx-auto">
          <Badge variant="accent" size="md" className="mb-5 inline-flex">
            ABOUT NUOVX
          </Badge>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6 text-text-primary">
            Engineering the Future of{" "}
            <span className="bg-gradient-to-r from-text-primary via-[#b45309] to-[#d97706] bg-clip-text text-transparent">
              Physical Intelligence
            </span>
          </h1>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto mb-10">
            NUOVX is a systems engineering company specializing in sovereign AI infrastructure,
            autonomous robotics platforms, and real-time computer vision for industrial-scale operations.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 rounded-2xl bg-bg-card border border-border"
              >
                <div className="text-2xl sm:text-3xl font-bold font-display text-accent mb-1">{stat.value}</div>
                <div className="text-xs font-mono text-text-muted uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-16 lg:py-24 bg-bg-secondary/60 border-t border-border">
        <div className="section-container max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="accent" size="md" className="mb-4 inline-flex">
                OUR MISSION
              </Badge>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary mb-5">
                Systems That Think,{" "}
                <span className="gradient-text">Machines That Act</span>
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                We exist to close the gap between AI research and real-world deployment. Our team builds
                the infrastructure that allows autonomous systems to operate reliably, securely, and at scale
                in mission-critical environments — from warehouse floors to manufacturing plants.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Every line of code we ship runs in production. Every system we architect is designed
                for zero-downtime operations. We don&apos;t build prototypes — we build infrastructure
                that companies bet their operations on.
              </p>
              <div className="flex flex-wrap gap-2">
                {TEAM_CAPABILITIES.map((cap) => (
                  <span
                    key={cap.label}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono border flex items-center gap-2"
                    style={{
                      backgroundColor: `${cap.color}10`,
                      borderColor: `${cap.color}30`,
                      color: cap.color,
                    }}
                  >
                    <cap.icon className="w-3.5 h-3.5" />
                    {cap.label}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl bg-bg-card border border-border relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest">ENGINEERING PHILOSOPHY</span>
              </div>

              <div className="space-y-5">
                {[
                  { q: "What do we build?", a: "Sovereign physical AI infrastructure — from GPU-accelerated inference engines to autonomous robot fleets." },
                  { q: "How do we build?", a: "Production-first. Every system is designed for 99.999% uptime with observability, auto-healing, and chaos engineering baked in." },
                  { q: "Who do we build for?", a: "Enterprise teams operating at the intersection of AI, robotics, industrial automation, and edge computing." },
                ].map((item) => (
                  <div key={item.q} className="p-4 rounded-xl bg-bg-secondary/80 border border-border">
                    <h4 className="text-sm font-bold text-text-primary mb-1">{item.q}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-16 lg:py-24 bg-bg-primary border-t border-border">
        <div className="section-container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <Badge variant="accent" size="md" className="mb-4 inline-flex">
              CORE VALUES
            </Badge>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary mb-4">
              Principles That Drive{" "}
              <span className="gradient-text">Every System</span>
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Our values aren&apos;t slogans — they&apos;re engineering constraints that shape
              every architecture decision and every line of production code.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group p-6 rounded-2xl bg-bg-card border border-border hover:border-accent/50 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border transition-all duration-300 group-hover:scale-105"
                  style={{ backgroundColor: `${value.color}12`, borderColor: `${value.color}30` }}
                >
                  <value.icon className="w-6 h-6" style={{ color: value.color }} />
                </div>
                <h3 className="font-display font-bold text-lg text-text-primary mb-2 group-hover:text-accent transition-colors">
                  {value.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-16 lg:py-24 bg-bg-secondary/60 border-t border-border">
        <div className="section-container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <Badge variant="accent" size="md" className="mb-4 inline-flex">
              COMPANY TIMELINE
            </Badge>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary mb-4">
              Building the{" "}
              <span className="gradient-text">Foundation</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            <div className="space-y-8">
              {TIMELINE.map((event, i) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full border-2 -translate-x-1/2 z-10"
                    style={{ borderColor: event.color, backgroundColor: `${event.color}40` }} />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-[45%] p-5 rounded-2xl bg-bg-card border border-border hover:border-accent/40 transition-all duration-300 ${i % 2 === 0 ? "md:text-right" : ""}`}>
                    <span className="text-sm font-mono font-bold" style={{ color: event.color }}>{event.year}</span>
                    <h3 className="font-display font-bold text-lg text-text-primary mb-1">{event.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 lg:py-24 bg-bg-primary border-t border-border">
        <div className="section-container max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary mb-5">
            Ready to Build{" "}
            <span className="gradient-text">Together</span>?
          </h2>
          <p className="text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto">
            Whether you need autonomous fleet infrastructure, real-time vision systems, or
            high-throughput AI serving — we&apos;re ready to architect and deploy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#b45309] hover:bg-[#d97706] text-white font-bold rounded-2xl px-8 shadow-md"
              asChild
            >
              <a href="/contact">
                Start a Project
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl px-8" asChild>
              <a href="/careers">Explore Careers</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
