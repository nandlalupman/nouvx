"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Cpu,
  Eye,
  Bot,
  Server,
  Shield,
  Zap,
  Network,
  Database,
  Globe,
  Layers,
  Monitor,
  Terminal,
  CheckCircle2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Button, NuovxLogo, Badge } from "@/components/ui";
import { Footer } from "@/components/footer/Footer";

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  technologies: string[];
  color: string;
  deliverables: string[];
}

const SERVICES: Service[] = [
  {
    id: "ai-infrastructure",
    icon: Cpu,
    title: "AI Infrastructure & Model Serving",
    subtitle: "GPU-ACCELERATED INFERENCE AT SCALE",
    description:
      "Design and deploy enterprise-grade AI inference engines with sub-12ms P99 latency. From CUDA kernel optimization to multi-tenant TensorRT serving on DGX clusters.",
    capabilities: [
      "Custom CUDA kernel development and optimization",
      "TensorRT and vLLM model serving pipelines",
      "Distributed inference with continuous dynamic batching",
      "FP8/FP16 quantization and model compression",
      "GPU cluster orchestration on Kubernetes",
    ],
    technologies: ["CUDA 12.4", "TensorRT 10", "vLLM", "Triton Server", "PyTorch 2.3", "ONNX Runtime"],
    color: "#d4a373",
    deliverables: [
      "Production-ready inference API with autoscaling",
      "Model registry with versioning and A/B testing",
      "Performance benchmarking and optimization report",
      "Monitoring dashboards with GPU telemetry",
    ],
  },
  {
    id: "computer-vision",
    icon: Eye,
    title: "Computer Vision & Edge AI",
    subtitle: "41 FPS INDUSTRIAL VISION PIPELINES",
    description:
      "Build real-time video analytics systems for industrial quality control, safety monitoring, and automated inspection — deployed on edge gateways at 41+ FPS.",
    capabilities: [
      "Real-time object detection (YOLOv9, RT-DETR)",
      "Multi-object tracking (ByteTrack, DeepSORT)",
      "Zero-defect optical quality inspection",
      "Privacy-preserving edge inference on Jetson Orin",
      "Multi-camera stream orchestration via DeepStream",
    ],
    technologies: ["YOLOv9", "RT-DETR", "DeepStream", "GStreamer", "TensorRT", "Jetson AGX Orin"],
    color: "#10b981",
    deliverables: [
      "End-to-end vision pipeline with edge deployment",
      "Real-time dashboard for visual analytics",
      "Custom model training and evaluation framework",
      "Deployment automation with OTA updates",
    ],
  },
  {
    id: "robotics",
    icon: Bot,
    title: "Robotics & Autonomous Systems",
    subtitle: "ROS 2 FLEET ORCHESTRATION",
    description:
      "Full-stack autonomous robotics — from ROS 2 Humble control systems and Nav2 path planning to fleet coordination for warehouse AMRs and industrial manipulators.",
    capabilities: [
      "ROS 2 Humble middleware and custom node development",
      "Nav2 costmap and trajectory planning",
      "Digital twin validation with Isaac Sim",
      "Multi-robot fleet coordination and dispatch",
      "Hardware-in-the-loop testing and safety certification",
    ],
    technologies: ["ROS 2 Humble", "Nav2", "MoveIt 2", "Isaac Sim", "Fast DDS", "ROS 2 Control"],
    color: "#c68642",
    deliverables: [
      "Production robot control stack with safety states",
      "Fleet management dashboard and telemetry",
      "Simulation environment for policy validation",
      "Integration with existing warehouse systems",
    ],
  },
  {
    id: "cloud-infrastructure",
    icon: Server,
    title: "Cloud & Kubernetes Infrastructure",
    subtitle: "99.999% RELIABILITY ENGINEERING",
    description:
      "Architect and operate distributed cloud infrastructure with multi-region Kubernetes, automated GitOps pipelines, and chaos engineering for mission-critical workloads.",
    capabilities: [
      "Multi-region Kubernetes cluster architecture",
      "ArgoCD GitOps with automated rollouts",
      "Cilium eBPF networking and service mesh",
      "KEDA event-driven autoscaling",
      "Disaster recovery and active-active replication",
    ],
    technologies: ["Kubernetes 1.29", "ArgoCD", "Cilium eBPF", "KEDA", "Istio", "Helm"],
    color: "#b87333",
    deliverables: [
      "Production Kubernetes infrastructure with IaC",
      "CI/CD pipeline with canary deployments",
      "Observability stack (Prometheus, Grafana, Loki)",
      "Disaster recovery runbooks and chaos tests",
    ],
  },
  {
    id: "data-engineering",
    icon: Database,
    title: "Real-Time Data & Event Systems",
    subtitle: "HIGH-THROUGHPUT EVENT STREAMING",
    description:
      "Build real-time data architectures with Apache Kafka, ClickHouse analytics, and WebSocket-powered dashboards for sub-100ms operational intelligence.",
    capabilities: [
      "Apache Kafka event streaming with exactly-once semantics",
      "ClickHouse and TimescaleDB analytical pipelines",
      "Real-time WebSocket dashboard infrastructure",
      "Data quality with Great Expectations",
      "Feature stores and ML data pipelines",
    ],
    technologies: ["Apache Kafka 3.6", "ClickHouse", "TimescaleDB", "Redis", "PostgreSQL 16", "Flink"],
    color: "#e5a950",
    deliverables: [
      "Event-driven data architecture with schemas",
      "Real-time analytics dashboards",
      "Data pipeline with quality monitoring",
      "API layer with rate limiting and caching",
    ],
  },
  {
    id: "operations",
    icon: Monitor,
    title: "Operational Intelligence & Monitoring",
    subtitle: "PREDICTIVE ANALYTICS & AUTOMATION",
    description:
      "Enterprise monitoring platforms with predictive anomaly detection, automated incident response, and live operational dashboards for infrastructure teams.",
    capabilities: [
      "Predictive anomaly detection with ML models",
      "Automated incident response and escalation",
      "SLA monitoring with proactive alerting",
      "Capacity forecasting and cost optimization",
      "Runbook automation and chaos engineering",
    ],
    technologies: ["Prometheus", "Grafana", "PagerDuty", "OpenTelemetry", "Temporal", "Prophet"],
    color: "#c2653c",
    deliverables: [
      "Custom monitoring platform with ML-powered alerts",
      "Executive dashboards with KPI tracking",
      "Automated remediation playbooks",
      "Monthly reliability and cost optimization reports",
    ],
  },
];

const ENGAGEMENT_MODELS = [
  {
    title: "Project-Based",
    description: "Scoped engagement with fixed deliverables, timeline, and clear handoff.",
    features: ["Fixed scope & timeline", "Dedicated architect", "Full documentation", "Knowledge transfer"],
    color: "#d4a373",
  },
  {
    title: "Embedded Teams",
    description: "Our engineers work alongside your team as embedded systems architects.",
    features: ["Integrated with your team", "Agile sprints", "Continuous delivery", "Direct communication"],
    color: "#10b981",
  },
  {
    title: "Managed Operations",
    description: "We build, deploy, and operate the system with guaranteed SLAs.",
    features: ["24/7 operations", "99.999% SLA", "Proactive monitoring", "Incident response"],
    color: "#b87333",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 selection:text-white">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-bg-primary/90 backdrop-blur-2xl border-b border-border shadow-xs">
        <div className="section-container flex items-center justify-between h-16 lg:h-[4.5rem]">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center group py-1">
              <NuovxLogo variant="dark" size="sm" showTagline={false} />
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
              size="sm"
              className="bg-[#d4a373] hover:bg-[#e2b17a] text-[#0a0807] font-bold text-[13px] rounded-xl px-4 shadow-sm"
              asChild
            >
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-bg-primary">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(212,163,115,0.14)_0%,transparent_70%)]" />
        </div>

        <div className="section-container relative z-10 text-center max-w-4xl mx-auto">
          <Badge variant="accent" size="md" className="mb-5 inline-flex">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            NUOVX ENGINEERING SERVICES
          </Badge>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6 text-text-primary">
            Production-Grade{" "}
            <span className="bg-gradient-to-r from-text-primary via-[#e2b17a] to-accent bg-clip-text text-transparent">
              AI & Robotics
            </span>{" "}
            Engineering
          </h1>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto mb-10">
            From microsecond GPU inference to autonomous fleet orchestration —
            we architect, build, and operate mission-critical intelligent systems at enterprise scale.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {["CUDA Optimization", "Computer Vision", "ROS 2 Robotics", "Kubernetes", "Real-Time Analytics", "Edge AI"].map((pill) => (
              <span
                key={pill}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono border border-border bg-bg-card text-text-secondary flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="py-16 lg:py-24 bg-bg-secondary/60 border-t border-border">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary mb-4">
              Engineering Services
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Six specialized practices, each built on production-grade tooling and deep domain expertise.
            </p>
          </motion.div>

          <div className="space-y-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <ServiceCard service={service} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engagement Models ── */}
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
              ENGAGEMENT MODELS
            </Badge>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary mb-4">
              How We{" "}
              <span className="gradient-text">Work Together</span>
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Choose the engagement model that fits your operational requirements and engineering culture.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {ENGAGEMENT_MODELS.map((model, i) => (
              <motion.div
                key={model.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-bg-card border border-border hover:border-accent/50 transition-all duration-300 flex flex-col"
              >
                <div
                  className="w-full h-[3px] rounded-full mb-6"
                  style={{ background: `linear-gradient(90deg, transparent, ${model.color}, transparent)` }}
                />
                <h3 className="font-display font-bold text-xl text-text-primary mb-2 group-hover:text-accent transition-colors">
                  {model.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
                  {model.description}
                </p>
                <div className="space-y-2">
                  {model.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 lg:py-24 bg-bg-secondary/60 border-t border-border">
        <div className="section-container max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary mb-5">
            Let&apos;s Build Your{" "}
            <span className="gradient-text">Next System</span>
          </h2>
          <p className="text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto">
            Describe your operational challenges and we&apos;ll scope a technical architecture within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#d4a373] hover:bg-[#e2b17a] text-[#0a0807] font-bold rounded-2xl px-8 shadow-md"
              asChild
            >
              <a href="/contact">
                Request Architecture Call
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl px-8" asChild>
              <a href="/careers">Join Our Team</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [expanded, setExpanded] = React.useState(false);
  const Icon = service.icon;

  return (
    <div className="group rounded-2xl bg-bg-card border border-border hover:border-accent/50 transition-all duration-300 overflow-hidden">
      {/* Top accent bar */}
      <div
        className="h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
      />

      <div className="p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Left — Icon & Title */}
          <div className="flex-1">
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center border flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                style={{ backgroundColor: `${service.color}12`, borderColor: `${service.color}30` }}
              >
                <Icon className="w-7 h-7" style={{ color: service.color }} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: service.color }}>
                  {service.subtitle}
                </span>
                <h3 className="font-display font-bold text-xl lg:text-2xl text-text-primary group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
              </div>
            </div>

            <p className="text-text-secondary leading-relaxed mb-5">{service.description}</p>

            {/* Capabilities */}
            <div className="space-y-2 mb-5">
              {service.capabilities.map((cap) => (
                <div key={cap} className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  {cap}
                </div>
              ))}
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-bg-secondary border border-border text-text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Deliverables */}
          <div className="lg:w-[320px] flex-shrink-0">
            <div className="p-5 rounded-xl bg-bg-secondary/80 border border-border">
              <h4 className="text-xs font-mono font-bold text-text-muted uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-accent" />
                KEY DELIVERABLES
              </h4>
              <div className="space-y-3">
                {service.deliverables.map((del, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <span
                      className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold border flex-shrink-0 mt-0.5"
                      style={{ borderColor: `${service.color}40`, color: service.color, backgroundColor: `${service.color}10` }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {del}
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-border">
                <Button
                  size="sm"
                  className="w-full bg-[#d4a373] hover:bg-[#e2b17a] text-[#0a0807] font-bold text-xs rounded-xl shadow-xs"
                  asChild
                >
                  <a href="/contact">
                    Discuss This Service
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
