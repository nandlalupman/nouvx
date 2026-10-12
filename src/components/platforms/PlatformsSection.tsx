"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Cpu, Eye, Bot, Monitor, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

interface PlatformCardProps {
  number: string;
  name: string;
  tagline: string;
  metrics: string[];
  icon: LucideIcon;
  accentColor: string;
  href: string;
  features: string[];
}

export function PlatformCard({
  number,
  name,
  tagline,
  metrics,
  icon: Icon,
  accentColor,
  href,
  features,
}: PlatformCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full"
    >
      {/* Outer glow on hover */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${accentColor}30, transparent 60%)` }}
      />

      <Card
        variant="premium"
        className="h-full flex flex-col overflow-visible border-border group-hover:border-border-accent"
        hover={false}
      >
        {/* Top gradient bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
        />

        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-3.5">
              {/* Number */}
              <span className="text-[2rem] font-display font-bold leading-none"
                style={{ color: `${accentColor}30` }}>
                {number}
              </span>
              {/* Icon pill */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300"
                style={{
                  backgroundColor: `${accentColor}12`,
                  borderColor: `${accentColor}30`,
                }}
              >
                <Icon
                  className="w-5.5 h-5.5 transition-colors"
                  style={{ color: accentColor }}
                  aria-hidden="true"
                />
              </div>
            </div>
            {/* Live dot */}
            <div className="flex items-center gap-1.5 pt-1">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
                style={{ backgroundColor: accentColor }}
              />
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                Live
              </span>
            </div>
          </div>

          <CardTitle
            className="text-xl font-display font-bold tracking-tight group-hover:transition-colors"
            style={{ color: "var(--text-primary)" }}
          >
            <span
              className="transition-colors duration-300 group-hover:text-[var(--accent-bright)]"
            >
              {name}
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="pb-5 flex-1 flex flex-col">
          <p className="text-text-secondary text-sm leading-relaxed mb-5">{tagline}</p>

          {/* Metric pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            {metrics.map((metric, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg text-xs font-mono border transition-all duration-200"
                style={{
                  backgroundColor: `${accentColor}08`,
                  borderColor: `${accentColor}25`,
                  color: accentColor,
                }}
              >
                {metric}
              </span>
            ))}
          </div>

          {/* Features */}
          <ul className="space-y-2 flex-1">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm text-text-secondary">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: `${accentColor}70` }}
                />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.article>
  );
}

const PLATFORMS = [
  {
    number: "01",
    name: "NOUVX CORE",
    tagline: "A hardened backend layer for inference services, telemetry streams, model registries, and operator workflows.",
    metrics: ["12ms P99", "480K req/s", "K8s Native"],
    icon: Cpu,
    accentColor: "#d4a373",
    href: "/products/core",
    features: [
      "Distributed inference serving",
      "Model registry & versioning",
      "Telemetry ingestion & routing",
      "Operator workflow automation",
      "Multi-region deployment",
      "Auto-scaling & load balancing",
    ],
  },
  {
    number: "02",
    name: "VISIONGRID",
    tagline: "Industrial detection, tracking, smart surveillance, edge analytics, and visual event routing for live environments.",
    metrics: ["41 FPS", "Edge AI", "OpenCV"],
    icon: Eye,
    accentColor: "#10b981",
    href: "/products/visiongrid",
    features: [
      "Real-time object detection",
      "Multi-object tracking (SORT/DeepSORT)",
      "Edge deployment (Jetson, x86)",
      "Smart surveillance zones",
      "Visual event routing",
      "Analytics & reporting",
    ],
  },
  {
    number: "03",
    name: "ROBOTICS CMD",
    tagline: "Fleet coordination, ROS-compatible communication, control surfaces, and machine-state monitoring.",
    metrics: ["ROS Bus", "Live I/O", "Path Lock"],
    icon: Bot,
    accentColor: "#c68642",
    href: "/products/robotics",
    features: [
      "ROS 2 integration",
      "Fleet orchestration",
      "Real-time telemetry",
      "Safety-critical control",
      "Path planning & execution",
      "Hardware abstraction layer",
    ],
  },
  {
    number: "04",
    name: "OPS CENTER",
    tagline: "Predictive analytics, anomaly alerts, distributed compute maps, and automation pipelines for infrastructure teams.",
    metrics: ["24/7", "WebSocket", "SLA Layer"],
    icon: Monitor,
    accentColor: "#b87333",
    href: "/products/ops-center",
    features: [
      "Predictive anomaly detection",
      "Distributed system visualization",
      "Automated incident response",
      "SLA monitoring & alerting",
      "Capacity forecasting",
      "Runbook automation",
    ],
  },
];

export function PlatformsSection() {
  return (
    <section id="systems" className="py-16 lg:py-20 bg-bg-secondary relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[400px]
          bg-[radial-gradient(ellipse,rgba(212,163,115,0.12)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px]
          bg-[radial-gradient(ellipse,rgba(198,134,66,0.08)_0%,transparent_65%)]" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-header mb-16"
        >
          <Badge variant="accent" size="md" dot className="mb-5">
            Product Systems
          </Badge>
          <h2 className="section-title">
            Built as Connected
            <br />
            <span className="gradient-text">Operational Platforms</span>
          </h2>
          <p className="section-subtitle mt-4">
            Core platform modules designed to operate together across inference, telemetry,
            robotics, monitoring, and automation environments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
          {PLATFORMS.map((platform, index) => (
            <motion.div
              key={platform.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <PlatformCard {...platform} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}