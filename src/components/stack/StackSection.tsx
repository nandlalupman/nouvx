"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Server, Cpu, Database, Network, Terminal, HardDrive, Code2, Globe, Layers, Zap, Shield, Eye, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

const STACK_CATEGORIES = [
  {
    title: "AI RUNTIME",
    icon: Cpu,
    color: "#d4a373",
    items: [
      { name: "Python 3.11+", desc: "Primary ML language", version: "3.11" },
      { name: "PyTorch 2.3", desc: "Deep learning framework", version: "2.3" },
      { name: "TensorFlow 2.16", desc: "Production ML platform", version: "2.16" },
      { name: "ONNX Runtime 1.18", desc: "Cross-platform inference", version: "1.18" },
      { name: "TensorRT 10", desc: "NVIDIA inference optimizer", version: "10" },
      { name: "vLLM 0.5", desc: "High-throughput LLM serving", version: "0.5" },
      { name: "Transformers 4.40", desc: "Hugging Face models", version: "4.40" },
      { name: "Accelerate 0.30", desc: "Distributed training", version: "0.30" },
    ],
  },
  {
    title: "ROBOTICS CONTROL",
    icon: Bot,
    color: "#e5a950",
    items: [
      { name: "ROS 2 Humble", desc: "Robotics middleware", version: "Humble" },
      { name: "Nav2", desc: "Navigation stack", version: "1.1" },
      { name: "MoveIt 2", desc: "Motion planning", version: "2.9" },
      { name: "Isaac Sim", desc: "Robot simulation", version: "2023.1" },
      { name: "Micro-ROS", desc: "Embedded robotics", version: "2.3" },
      { name: "Fast DDS", desc: "Real-time middleware", version: "2.10" },
      { name: "Gazebo Harmonic", desc: "Physics simulation", version: "Harmonic" },
      { name: "ROS 2 Control", desc: "Hardware abstraction", version: "1.4" },
    ],
  },
  {
    title: "INFRASTRUCTURE",
    icon: Server,
    color: "#b87333",
    items: [
      { name: "Kubernetes 1.29", desc: "Container orchestration", version: "1.29" },
      { name: "Docker 26", desc: "Container runtime", version: "26" },
      { name: "Helm 3.14", desc: "Package manager", version: "3.14" },
      { name: "ArgoCD 2.10", desc: "GitOps continuous delivery", version: "2.10" },
      { name: "Istio 1.21", desc: "Service mesh", version: "1.21" },
      { name: "Cilium 1.15", desc: "eBPF networking", version: "1.15" },
      { name: "Cert-Manager 1.14", desc: "Certificate management", version: "1.14" },
      { name: "External Secrets 0.9", desc: "Secret synchronization", version: "0.9" },
    ],
  },
  {
    title: "OPERATIONS INTERFACES",
    icon: Terminal,
    color: "#10b981",
    items: [
      { name: "React 18", desc: "UI framework", version: "18" },
      { name: "TypeScript 5.4", desc: "Type safety", version: "5.4" },
      { name: "Tailwind CSS 4", desc: "Utility-first CSS", version: "4" },
      { name: "Framer Motion 11", desc: "Animation library", version: "11" },
      { name: "Three.js r160", desc: "3D graphics", version: "r160" },
      { name: "Recharts 2.12", desc: "Charting library", version: "2.12" },
      { name: "Socket.io 4.7", desc: "Real-time communication", version: "4.7" },
      { name: "Zustand 4.5", desc: "State management", version: "4.5" },
    ],
  },
  {
    title: "BACKEND PLATFORM",
    icon: Database,
    color: "#c25736",
    items: [
      { name: "FastAPI 0.110", desc: "High-performance API", version: "0.110" },
      { name: "Redis 7.2", desc: "In-memory store", version: "7.2" },
      { name: "Apache Kafka 3.6", desc: "Event streaming", version: "3.6" },
      { name: "PostgreSQL 16", desc: "Relational database", version: "16" },
      { name: "ClickHouse 23.12", desc: "Analytical database", version: "23.12" },
      { name: "TimescaleDB 2.14", desc: "Time-series database", version: "2.14" },
      { name: "NATS 2.10", desc: "Messaging system", version: "2.10" },
      { name: "gRPC 1.62", desc: "RPC framework", version: "1.62" },
    ],
  },
  {
    title: "DATA & ML OPS",
    icon: Layers,
    color: "#a89f91",
    items: [
      { name: "MLflow 2.13", desc: "ML lifecycle", version: "2.13" },
      { name: "Kubeflow 1.8", desc: "ML on Kubernetes", version: "1.8" },
      { name: "Feast 0.32", desc: "Feature store", version: "0.32" },
      { name: "DVC 3.4", desc: "Data version control", version: "3.4" },
      { name: "Great Expectations 0.18", desc: "Data quality", version: "0.18" },
      { name: "Airflow 2.9", desc: "Workflow orchestration", version: "2.9" },
      { name: "Prefect 2.18", desc: "Modern workflows", version: "2.18" },
      { name: "Temporal 1.22", desc: "Durable execution", version: "1.22" },
    ],
  },
];

export function StackSection() {
  return (
    <section className="py-16 lg:py-20 bg-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--accent-dim)_0%,_transparent_50%)] pointer-events-none" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-header mb-16"
        >
          <Badge variant="accent" size="md" className="mb-4">
            ENGINEERING STACK
          </Badge>
          <h2 className="section-title font-display font-bold">
            INFRASTRUCTURE USED TO BUILD
            <br />
            <span className="gradient-text">CLIENT SYSTEMS</span>
          </h2>
          <p className="section-subtitle">
            NEBULINT BUILD MATRIX — From model runtime to operational deployment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STACK_CATEGORIES.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <StackCategoryCard {...category} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16"
        >
          <StackMatrix />
        </motion.div>
      </div>
    </section>
  );
}

function StackCategoryCard({ title, icon: Icon, color, items }: typeof STACK_CATEGORIES[0]) {
  return (
    <Card variant="glow" className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
            <Icon className="w-6 h-6" style={{ color }} aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display font-bold text-text-primary">{title}</h3>
            <p className="text-xs font-mono text-text-muted uppercase tracking-wider">{items.length} technologies</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex-1">
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-bg-tertiary/50 border border-border hover:border-border-bright hover:bg-bg-tertiary transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                  <Icon className="w-4 h-4" style={{ color }} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">{item.name}</p>
                  <p className="text-xs text-text-muted">{item.desc}</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded text-[10px] font-mono bg-bg-primary border border-border text-text-muted group-hover:text-accent group-hover:border-accent transition-all">
                v{item.version}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function StackMatrix() {
  const allItems = STACK_CATEGORIES.flatMap(cat => 
    cat.items.map(item => ({ ...item, category: cat.title, categoryColor: cat.color }))
  );

  return (
    <Card variant="border" className="overflow-hidden">
      <CardHeader>
        <h3 className="font-display font-bold text-text-primary">BUILD MATRIX</h3>
        <p className="text-text-secondary mt-1">Cross-category technology compatibility matrix</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead>
              <tr className="border-b border-border text-left text-sm font-mono text-text-muted">
                <th className="p-3 font-medium text-text-primary w-48">TECHNOLOGY</th>
                <th className="p-3 font-medium text-text-primary">CATEGORY</th>
                <th className="p-3 font-medium text-text-primary">VERSION</th>
                <th className="p-3 font-medium text-text-primary">PURPOSE</th>
                <th className="p-3 font-medium text-text-primary">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {allItems.map((item, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-bg-tertiary/50 transition-colors">
                  <td className="p-3 font-medium text-text-primary">{item.name}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono border" style={{ borderColor: item.categoryColor, color: item.categoryColor, backgroundColor: `${item.categoryColor}15` }}>
                      {item.category}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-text-secondary">v{item.version}</td>
                  <td className="p-3 text-text-secondary text-sm">{item.desc}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-success/20 text-success border border-success/30">
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default StackSection;