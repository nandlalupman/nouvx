"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, Bot, Eye, Network, Zap, Shield, Layers, 
  Activity, ArrowUpRight, CheckCircle2, ChevronRight,
  Terminal, Sparkles, Server
} from "lucide-react";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

const NVIDIA_TICKER_ITEMS = [
  "CUDA 12.4 TENSOR ACCELERATION",
  "NVIDIA NIM ENTERPRISE MICROSERVICES",
  "PHYSICAL AI & ROS 2 HUMBLE CONTROL",
  "METROPOLIS 41 FPS VIDEO PIPELINE",
  "K8S DGX CLUSTER ORCHESTRATION",
  "SUB-12MS REAL-TIME INFERENCE",
  "CONTINUOUS DYNAMIC BATCHING",
  "SOVEREIGN ZERO-TRUST SECURITY",
];

const NVIDIA_PILLARS = [
  {
    id: "accelerated-compute",
    tabTitle: "ACCELERATED COMPUTE",
    badge: "NVIDIA CUDA-X & TENSORRT",
    icon: Cpu,
    color: "#d4a373", // champagne gold
    title: "Tensor Core Acceleration & Microsecond Inference",
    description:
      "Enterprise model serving optimized on NVIDIA Tensor Cores. Continuous dynamic batching, paged KV-cache, and quantized FP8 execution deliver blistering inference speeds with zero latency drift.",
    stats: [
      { label: "P99 INFERENCE", value: "12ms" },
      { label: "THROUGHPUT", value: "480K req/s" },
      { label: "PRECISION", value: "FP8 / FP16" },
      { label: "BANDWIDTH", value: "3.35 TB/s" },
    ],
    specs: [
      { key: "Inference Engine", val: "TensorRT 10.0 + Triton" },
      { key: "LLM Serving", val: "vLLM with PagedAttention" },
      { key: "Hardware Target", val: "H100, H200 & Jetson Orin" },
      { key: "Quantization", val: "SmoothQuant & AWQ FP8" },
    ],
    features: [
      "Dynamic continuous batching minimizes GPU bubble time",
      "Kernel fusion for transformer multi-head attention",
      "Model parallelism across NVLink interconnects",
      "Sub-millisecond cold start with cached weights",
    ],
  },
  {
    id: "physical-ai",
    tabTitle: "PHYSICAL AI & ROBOTICS",
    badge: "ISAAC SIM & ROS 2 HUMBLE",
    icon: Bot,
    color: "#c68642", // warm bronze
    title: "Autonomous Fleet Orchestration & Real-Time Kinematics",
    description:
      "Full-stack physical AI for warehouse AMR fleets and industrial manipulators. Built on ROS 2 Humble with hardware-in-the-loop simulation, digital twin physics, and deterministic trajectory generation.",
    stats: [
      { label: "ACTIVE FLEET", value: "200+ Bots" },
      { label: "CONTROL LOOP", value: "<10ms" },
      { label: "SAFETY RATING", value: "ISO 13849" },
      { label: "SIMULATION", value: "Isaac Sim" },
    ],
    specs: [
      { key: "Middleware", val: "ROS 2 Humble + Fast DDS" },
      { key: "Digital Twin", val: "NVIDIA Omniverse Isaac Sim" },
      { key: "Navigation", val: "Nav2 Real-Time Costmaps" },
      { key: "Control System", val: "ROS 2 Control Hardware HAL" },
    ],
    features: [
      "Sub-10ms deterministic trajectory planning and avoidance",
      "Synthetically trained policies verified in Isaac Sim",
      "Multi-robot coordination with distributed fleet manager",
      "Fail-safe emergency shutdown states on hardware trigger",
    ],
  },
  {
    id: "vision-ai",
    tabTitle: "METROPOLIS VISION",
    badge: "METROPOLIS & JETSON ORIN",
    icon: Eye,
    color: "#10b981", // emerald
    title: "Multi-Camera Streaming Analytics at 41 FPS Edge",
    description:
      "Enterprise computer vision pipelines deployed on edge gateways. Real-time object tracking, zero-defect optical quality control, and workplace safety perimeter detection across dozens of facilities.",
    stats: [
      { label: "FRAME RATE", value: "41 FPS" },
      { label: "ACCURACY", value: "99.2%" },
      { label: "EDGE SITES", value: "47 Facilities" },
      { label: "EDGE LATENCY", value: "<50ms" },
    ],
    specs: [
      { key: "Detection Model", val: "YOLOv9 + RT-DETR" },
      { key: "Tracking Engine", val: "ByteTrack & DeepSORT" },
      { key: "Stream Ingestion", val: "DeepStream & GStreamer" },
      { key: "Edge Gateway", val: "Jetson AGX Orin 64GB" },
    ],
    features: [
      "Simultaneous 64-channel RTSP stream inference at line rate",
      "Zero-defect optical anomaly detection on assembly lines",
      "Privacy-preserving edge face/license plate obfuscation",
      "Automated event notification pushed to Kafka in <50ms",
    ],
  },
  {
    id: "enterprise-nim",
    tabTitle: "ENTERPRISE NIM FABRIC",
    badge: "CONTAINERIZED MICROSERVICES",
    icon: Network,
    color: "#e5a950", // warm amber
    title: "Standardized AI Microservices & Fault-Tolerant Fabric",
    description:
      "NVIDIA NIM-compatible microservice fabric engineered for zero downtime. Kubernetes-orchestrated container clusters with automated self-healing, Prometheus telemetry, and automated scaling.",
    stats: [
      { label: "PLATFORM SLA", value: "99.999%" },
      { label: "ALERT REDUCTION", value: "10x Faster" },
      { label: "TOPOLOGY", value: "Active-Active" },
      { label: "EVENT BROKER", value: "Kafka 3.6+" },
    ],
    specs: [
      { key: "Microservices", val: "NVIDIA NIM Container Stacks" },
      { key: "Orchestration", val: "Kubernetes 1.29 + ArgoCD" },
      { key: "Autoscaling", val: "KEDA Event-Driven Scaling" },
      { key: "Network Mesh", val: "Cilium eBPF & TLS 1.3" },
    ],
    features: [
      "Instant one-command deployment of fine-tuned enterprise models",
      "Automated blue/green canary rollouts with automated rollback",
      "Distributed telemetry routing with sub-100ms dashboard sync",
      "Multi-region active-active disaster recovery configuration",
    ],
  },
];

export function NvidiaFeatures() {
  const [activeTab, setActiveTab] = React.useState(0);
  const current = NVIDIA_PILLARS[activeTab];
  const Icon = current.icon;

  return (
    <section className="bg-[#ffffff] text-[#140f0c] pt-4 pb-24 border-b border-[#e8dfd5] relative overflow-hidden">
      {/* Background ambient warmth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px]
          bg-[radial-gradient(ellipse,rgba(212,163,115,0.12)_0%,transparent_70%)]" />
      </div>

      {/* Marquee ticker bar */}
      <div className="border-y border-[#ecdccb] bg-[#fdfbf7] py-3.5 mb-16 overflow-hidden select-none">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
          {[...NVIDIA_TICKER_ITEMS, ...NVIDIA_TICKER_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs font-mono font-bold tracking-widest text-[#786553]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b87333]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[#f0e6d9] border border-[#dac5af] text-[#7a4817] shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#b87333]" />
            NVIDIA-ACCELERATED ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[#140f0c] mb-4">
            Full-Stack Acceleration.
            <br />
            <span className="bg-gradient-to-r from-[#8f5626] via-[#b87333] to-[#c68642] bg-clip-text text-transparent">
              From Silicon to Cloud.
            </span>
          </h2>
          <p className="text-[#55473a] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Harnessing NVIDIA CUDA-X, TensorRT, and Isaac Sim to deliver hardware-accelerated 
            intelligence across enterprise clouds, edge gateways, and robotics fleets.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {NVIDIA_PILLARS.map((pillar, i) => {
            const TabIcon = pillar.icon;
            const isActive = activeTab === i;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 flex items-center gap-2.5 border",
                  isActive
                    ? "bg-[#140f0c] text-[#ffffff] border-[#140f0c] shadow-[0_6px_20px_rgba(20,15,12,0.18)]"
                    : "bg-[#ffffff] text-[#635243] border-[#e2d5c4] hover:bg-[#f8f4ec] hover:border-[#b87333]/50 hover:text-[#140f0c]"
                )}
              >
                <TabIcon 
                  className={cn("w-4 h-4", isActive ? "text-[#e2b17a]" : "text-[#8a7665]")} 
                />
                {pillar.tabTitle}
              </button>
            );
          })}
        </div>

        {/* Active Pillar Card Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-[#ffffff] border border-[#e2d5c4] shadow-[0_12px_40px_rgba(40,25,15,0.06)] overflow-hidden"
          >
            <div className="grid lg:grid-cols-[1.1fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-[#ecdccb]">
              {/* Left Column — Content & Features */}
              <div className="p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase mb-5"
                    style={{ backgroundColor: `${current.color}15`, color: current.color, border: `1px solid ${current.color}35` }}>
                    <Icon className="w-3.5 h-3.5" />
                    {current.badge}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#140f0c] mb-4 leading-snug">
                    {current.title}
                  </h3>

                  <p className="text-[#55473a] text-base leading-relaxed mb-8">
                    {current.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    <h4 className="text-xs font-mono font-bold text-[#7a6a5c] uppercase tracking-wider">
                      ARCHITECTURAL CAPABILITIES
                    </h4>
                    {current.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-[#2c221a]">
                        <CheckCircle2 className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benchmark Metrics Bar */}
                <div className="pt-6 border-t border-[#ecdccb]">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {current.stats.map((stat, idx) => (
                      <div key={idx} className="bg-[#fbf9f5] border border-[#e8ded1] rounded-xl p-3">
                        <div className="text-lg sm:text-xl font-bold font-display text-[#140f0c]">
                          {stat.value}
                        </div>
                        <div className="text-[10px] font-mono text-[#7a6a5c] uppercase tracking-wider mt-0.5">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column — Live Hardware/Software Spec Console (Dark Obsidian DGX Style) */}
              <div className="bg-[#120d0a] p-8 sm:p-10 flex flex-col justify-between text-[#ffffff]">
                <div>
                  {/* Console Header */}
                  <div className="flex items-center justify-between pb-5 border-b border-[#2d221a] mb-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
                      <span className="font-mono text-xs text-[#d6cfc7] tracking-wider uppercase">
                        NVIDIA ACCELERATOR STATUS · ACTIVE
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#d4a373]">
                      CUDA 12.4
                    </span>
                  </div>

                  {/* Architecture Specs Table */}
                  <div className="space-y-4 mb-8">
                    <div className="text-xs font-mono text-[#a89a8c] uppercase tracking-wider">
                      SPECIFICATION MATRIX
                    </div>
                    {current.specs.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#1c1612] border border-[#33261d]">
                        <span className="text-xs font-mono text-[#a89a8c]">{item.key}</span>
                        <span className="text-xs font-mono font-bold text-[#ffffff]">{item.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Simulated Telemetry Stream */}
                  <div className="p-4 rounded-xl bg-[#18120e] border border-[#33261d]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-[#a89a8c]">GPU STREAM LATENCY</span>
                      <span className="text-[11px] font-mono text-[#10b981]">0.84ms (NOMINAL)</span>
                    </div>
                    <div className="w-full bg-[#291f19] h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-[#10b981] to-[#d4a373] h-full w-[84%] rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 border-t border-[#2d221a] mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#d6cfc7]">
                    <Terminal className="w-4 h-4 text-[#d4a373]" />
                    <span>NVIDIA DRIVER 555.42 · CERTIFIED</span>
                  </div>
                  <a
                    href="#operations"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#d4a373] hover:text-[#ffffff] transition-colors"
                  >
                    View Operations
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
