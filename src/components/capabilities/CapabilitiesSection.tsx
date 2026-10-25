"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Zap, Eye, Bot, Server, Cpu, Network, Database, Globe, Layers, type LucideIcon } from "lucide-react";
import { Card, CardContent, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

interface CapabilityCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  tags: string[];
  index: number;
}

export function CapabilityCard({ id, title, description, icon: Icon, color, tags, index }: CapabilityCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full"
    >
      {/* Outer ambient glow on hover */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${color}20, transparent 65%)` }}
      />

      <div
        className="h-full rounded-2xl bg-white/95 border border-[#e8dfd5] shadow-[0_2px_12px_rgba(120,53,15,0.04)] group-hover:shadow-[0_16px_36px_rgba(180,83,9,0.12)] group-hover:border-[#b45309]/50 transition-all duration-300 relative overflow-hidden flex flex-col p-6"
      >
        {/* Subtle gradient top highlight */}
        <div
          className="absolute top-0 left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />

        {/* Icon row */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
            style={{
              backgroundColor: `${color}14`,
              borderColor: `${color}35`,
            }}
          >
            <Icon className="w-6 h-6" style={{ color }} aria-hidden="true" />
          </div>
          <span
            className="text-4xl font-display font-bold leading-none select-none text-[#e7dfd5] group-hover:text-[#b45309]/30 transition-colors"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3
          className="text-lg font-display font-bold text-[#1c1917] mb-2.5 tracking-tight transition-colors duration-300 group-hover:text-[#9a3412]"
        >
          {title}
        </h3>
        <p className="text-sm text-[#57534e] leading-relaxed mb-6 flex-1 font-normal">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#f5efe6] border border-[#e8ded2] text-[#78350f] group-hover:border-[#b45309]/40 group-hover:text-[#9a3412] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />
      </div>
    </motion.article>
  );
}

const CAPABILITIES = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    description: "Decision models, orchestration, agentic workflows, and supervised automation for operational environments.",
    icon: Cpu,
    color: "#b45309",
    tags: ["LLM Orchestration", "Agentic Workflows", "Decision Models", "Model Evaluation"],
    index: 0,
  },
  {
    id: "vision",
    title: "Computer Vision",
    description: "Detection, tracking, segmentation, facial mapping, edge analytics, and industrial monitoring pipelines.",
    icon: Eye,
    color: "#059669",
    tags: ["Object Detection", "Multi-Object Tracking", "Segmentation", "Edge Analytics"],
    index: 1,
  },
  {
    id: "robotics",
    title: "Robotics Systems",
    description: "Robotic control software, ROS integration, machine communication, and autonomous command layers.",
    icon: Bot,
    color: "#78350f",
    tags: ["ROS 2 Integration", "Fleet Coordination", "Sensor Fusion", "Safety Systems"],
    index: 2,
  },
  {
    id: "ml-infra",
    title: "ML Infrastructure",
    description: "Model registries, inference services, distributed training, observability, and deployment automation.",
    icon: Database,
    color: "#9a3412",
    tags: ["Model Registry", "Distributed Training", "Inference Serving", "CI/CD for ML"],
    index: 3,
  },
  {
    id: "autonomous",
    title: "Autonomous Platforms",
    description: "Sensor fusion, planning logic, telemetry loops, fleet coordination, and real-time decision support.",
    icon: Globe,
    color: "#d97706",
    tags: ["Sensor Fusion", "Planning Logic", "Telemetry Loops", "Real-time Decisions"],
    index: 4,
  },
  {
    id: "automation",
    title: "AI Automation",
    description: "Workflow automation, alerting, human-in-the-loop review, and intelligent software operations.",
    icon: Zap,
    color: "#b45309",
    tags: ["Workflow Engine", "Alerting", "Human-in-the-Loop", "Intelligent Ops"],
    index: 5,
  },
  {
    id: "backend",
    title: "Backend Systems",
    description: "Enterprise APIs, event streams, data planes, identity controls, and resilient service architectures.",
    icon: Server,
    color: "#78350f",
    tags: ["API Gateway", "Event Streaming", "Data Plane", "Service Mesh"],
    index: 6,
  },
  {
    id: "ops-intel",
    title: "Operational Intelligence",
    description: "Dashboards, live system state, predictive analytics, and executive-level monitoring.",
    icon: Network,
    color: "#c2410c",
    tags: ["Real-time Dashboards", "Predictive Analytics", "Executive Views", "Alerting"],
    index: 7,
  },
  {
    id: "distributed",
    title: "Distributed Cloud",
    description: "Hybrid cloud, edge compute, Kubernetes, message queues, and secure multi-site deployments.",
    icon: Layers,
    color: "#92400e",
    tags: ["Hybrid Cloud", "Edge Computing", "Kubernetes", "Multi-site"],
    index: 8,
  },
];

export function CapabilitiesSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#faf6f0] relative overflow-hidden border-y border-[#e8dfd5]">
      {/* Background warm dusk ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px]
          bg-[radial-gradient(ellipse,rgba(217,119,6,0.06)_0%,transparent_65%)]" />
        <div className="absolute top-0 right-0 w-[500px] h-[400px]
          bg-[radial-gradient(ellipse,rgba(180,83,9,0.04)_0%,transparent_65%)]" />
      </div>
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-header mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[#fef3c7]/80 border border-[#fde68a] text-[#92400e] shadow-xs mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] animate-pulse" />
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[#1c1917] mb-4">
            Precision Software for
            <br />
            <span className="bg-gradient-to-r from-[#1c1917] via-[#78350f] to-[#b45309] bg-clip-text text-transparent">
              Advanced Systems
            </span>
          </h2>
          <p className="text-[#78716c] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Nine specialized engineering domains, each built on production-grade
            tooling and deep operational expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((capability) => (
            <motion.div
              key={capability.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: capability.index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <CapabilityCard {...capability} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}