"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Zap, Eye, Bot, Server, Cpu, Network, Database, Globe, Layers } from "lucide-react";
import { Card, CardContent, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

interface CapabilityCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
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
        style={{ background: `radial-gradient(ellipse at top left, ${color}25, transparent 65%)` }}
      />

      <div
        className="h-full rounded-2xl bg-[#ffffff] border border-[#e2d5c5] shadow-[0_4px_24px_rgba(40,25,15,0.04)] group-hover:shadow-[0_16px_40px_rgba(184,115,51,0.14)] group-hover:border-[#b87333]/70 transition-all duration-300 relative overflow-hidden flex flex-col p-6"
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
            className="text-4xl font-display font-bold leading-none select-none text-[#cbb8a3] group-hover:text-[#b87333]/50 transition-colors"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3
          className="text-lg font-display font-bold text-[#17110d] mb-2.5 tracking-tight transition-colors duration-300 group-hover:text-[#945d2b]"
        >
          {title}
        </h3>
        <p className="text-sm text-[#5a4d40] leading-relaxed mb-6 flex-1 font-normal">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#f5efe5] border border-[#dfd1bf] text-[#6b5847] group-hover:border-[#c68642]/50 group-hover:text-[#2d2015] transition-colors"
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
    color: "#d4a373",
    tags: ["LLM Orchestration", "Agentic Workflows", "Decision Models", "Model Evaluation"],
    index: 0,
  },
  {
    id: "vision",
    title: "Computer Vision",
    description: "Detection, tracking, segmentation, facial mapping, edge analytics, and industrial monitoring pipelines.",
    icon: Eye,
    color: "#10b981",
    tags: ["Object Detection", "Multi-Object Tracking", "Segmentation", "Edge Analytics"],
    index: 1,
  },
  {
    id: "robotics",
    title: "Robotics Systems",
    description: "Robotic control software, ROS integration, machine communication, and autonomous command layers.",
    icon: Bot,
    color: "#c68642",
    tags: ["ROS 2 Integration", "Fleet Coordination", "Sensor Fusion", "Safety Systems"],
    index: 2,
  },
  {
    id: "ml-infra",
    title: "ML Infrastructure",
    description: "Model registries, inference services, distributed training, observability, and deployment automation.",
    icon: Database,
    color: "#b87333",
    tags: ["Model Registry", "Distributed Training", "Inference Serving", "CI/CD for ML"],
    index: 3,
  },
  {
    id: "autonomous",
    title: "Autonomous Platforms",
    description: "Sensor fusion, planning logic, telemetry loops, fleet coordination, and real-time decision support.",
    icon: Globe,
    color: "#e5a950",
    tags: ["Sensor Fusion", "Planning Logic", "Telemetry Loops", "Real-time Decisions"],
    index: 4,
  },
  {
    id: "automation",
    title: "AI Automation",
    description: "Workflow automation, alerting, human-in-the-loop review, and intelligent software operations.",
    icon: Zap,
    color: "#e2b17a",
    tags: ["Workflow Engine", "Alerting", "Human-in-the-Loop", "Intelligent Ops"],
    index: 5,
  },
  {
    id: "backend",
    title: "Backend Systems",
    description: "Enterprise APIs, event streams, data planes, identity controls, and resilient service architectures.",
    icon: Server,
    color: "#10b981",
    tags: ["API Gateway", "Event Streaming", "Data Plane", "Service Mesh"],
    index: 6,
  },
  {
    id: "ops-intel",
    title: "Operational Intelligence",
    description: "Dashboards, live system state, predictive analytics, and executive-level monitoring.",
    icon: Network,
    color: "#d4a373",
    tags: ["Real-time Dashboards", "Predictive Analytics", "Executive Views", "Alerting"],
    index: 7,
  },
  {
    id: "distributed",
    title: "Distributed Cloud",
    description: "Hybrid cloud, edge compute, Kubernetes, message queues, and secure multi-site deployments.",
    icon: Layers,
    color: "#c68642",
    tags: ["Hybrid Cloud", "Edge Computing", "Kubernetes", "Multi-site"],
    index: 8,
  },
];

export function CapabilitiesSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#f8f4ec] relative overflow-hidden border-y border-[#e8ded0]">
      {/* Background texture with dusky warmth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px]
          bg-[radial-gradient(ellipse,rgba(212,163,115,0.18)_0%,transparent_65%)]" />
        <div className="absolute top-0 right-0 w-[500px] h-[400px]
          bg-[radial-gradient(ellipse,rgba(198,134,66,0.10)_0%,transparent_65%)]" />
      </div>
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-header mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[#ebdccb] border border-[#d8c5b0] text-[#7a4817] shadow-sm mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b87333] animate-pulse" />
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[#15100c] mb-4">
            Precision Software for
            <br />
            <span className="bg-gradient-to-r from-[#8f5626] via-[#b87333] to-[#c68642] bg-clip-text text-transparent">
              Advanced Systems
            </span>
          </h2>
          <p className="text-[#5c4f42] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
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