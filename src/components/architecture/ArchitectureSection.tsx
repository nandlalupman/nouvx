"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Cpu, Database, Server, Network, Zap, Eye, Bot, Shield, Layers, ArrowRight, Minus, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

const LAYERS = [
  {
    id: "sensors",
    number: "01",
    name: "SENSORS",
    tech: "MQTT",
    description: "MQTT-based sensor ingestion layer handling millions of telemetry streams from distributed edge devices.",
    color: "#a89f91",
    bgColor: "rgba(168,159,145,0.15)",
    icon: Network,
    details: [
      "Protocol: MQTT 3.1.1/5.0, CoAP, Modbus, OPC-UA",
      "Throughput: 1M+ messages/sec",
      "QoS: 0/1/2 with persistence",
      "Security: TLS 1.3, mutual auth",
      "Edge buffering: 24hr local storage",
    ],
    connections: ["acquisition"],
  },
  {
    id: "acquisition",
    number: "02",
    name: "DATA ACQUISITION",
    tech: "KAFKA",
    description: "Apache Kafka event streaming platform for high-throughput, fault-tolerant data acquisition and buffering.",
    color: "#f59e0b",
    bgColor: "rgba(6,182,212,0.15)",
    icon: Database,
    details: [
      "Platform: Apache Kafka 3.6+",
      "Topics: 10K+ partitioned topics",
      "Retention: 7-30 days tiered storage",
      "Compression: ZSTD, Snappy, LZ4",
      "Exactly-once semantics",
    ],
    connections: ["sensors", "processing"],
  },
  {
    id: "processing",
    number: "03",
    name: "AI PROCESSING LAYER",
    tech: "CUDA",
    description: "GPU-accelerated model execution, feature extraction, and real-time scoring on CUDA cores.",
    color: "#b45309",
    bgColor: "rgba(180,83,9,0.15)",
    icon: Cpu,
    details: [
      "Compute: NVIDIA H100/A100/T4",
      "Runtime: CUDA 12, TensorRT, ONNX",
      "Frameworks: PyTorch, TensorFlow, JAX",
      "Batching: Dynamic continuous batching",
      "Precision: FP8, FP16, BF16, INT8",
    ],
    connections: ["acquisition", "vision", "inference"],
  },
  {
    id: "vision",
    number: "04",
    name: "COMPUTER VISION MODELS",
    tech: "OPENCV",
    description: "Industrial computer vision pipelines: detection, tracking, segmentation, and edge analytics at 41 FPS.",
    color: "#10b981",
    bgColor: "rgba(16,185,129,0.15)",
    icon: Eye,
    details: [
      "Models: YOLOv8/v9, RT-DETR, SAM",
      "Tracking: SORT, DeepSORT, ByteTrack",
      "Segmentation: Mask R-CNN, SAM",
      "Edge: TensorRT, ONNX Runtime",
      "Analytics: Heatmaps, counting, zones",
    ],
    connections: ["processing", "inference"],
  },
  {
    id: "inference",
    number: "05",
    name: "INFERENCE ENGINE",
    tech: "FASTAPI",
    description: "Low-latency inference serving with FastAPI, model registry, and automated scaling on Kubernetes.",
    color: "#d97706",
    bgColor: "rgba(217,119,6,0.15)",
    icon: Server,
    details: [
      "Serving: FastAPI, Triton, vLLM",
      "Registry: MLflow, custom registry",
      "Autoscaling: KEDA, HPA, VPA",
      "Caching: Redis, semantic cache",
      "Observability: Prometheus, Grafana",
    ],
    connections: ["processing", "vision", "cloud"],
  },
  {
    id: "cloud",
    number: "06",
    name: "CLOUD INFRASTRUCTURE",
    tech: "K8S",
    description: "Kubernetes-native distributed infrastructure with multi-region deployments and autoscaling.",
    color: "#9a3412",
    bgColor: "rgba(154,52,18,0.15)",
    icon: Layers,
    details: [
      "Orchestration: EKS/GKE/AKS + self-hosted",
      "Service Mesh: Istio, Cilium",
      "GitOps: ArgoCD, Flux",
      "Secrets: Vault, SealedSecrets",
      "Multi-region: Active-active",
    ],
    connections: ["inference", "dashboard", "automation"],
  },
  {
    id: "dashboard",
    number: "07",
    name: "REAL-TIME DASHBOARD",
    tech: "WEBSOCKET",
    description: "WebSocket-powered real-time operational dashboards with sub-100ms update latency.",
    color: "#78350f",
    bgColor: "rgba(120,53,15,0.15)",
    icon: Network,
    details: [
      "Transport: WebSocket, Server-Sent Events",
      "State: CRDTs, operational transforms",
      "Rendering: Canvas, WebGL, WebGPU",
      "Workers: OffscreenCanvas, Web Workers",
      "Latency: <100ms end-to-end",
    ],
    connections: ["cloud"],
  },
  {
    id: "automation",
    number: "08",
    name: "ALERT & AUTOMATION",
    tech: "RULES",
    description: "Rule-based alerting and automation engine with human-in-the-loop escalation policies.",
    color: "#e0e7ff",
    bgColor: "rgba(224,231,255,0.15)",
    icon: Shield,
    details: [
      "Engine: Custom rule engine + CEL",
      "Actions: Webhooks, runbooks, PagerDuty",
      "Escalation: Multi-level, on-call rotation",
      "Suppression: Deduplication, grouping",
      "Audit: Full action history",
    ],
    connections: ["cloud"],
  },
];

const LAYER_CONNECTIONS = [
  { from: "sensors", to: "acquisition" },
  { from: "acquisition", to: "processing" },
  { from: "processing", to: "vision" },
  { from: "processing", to: "inference" },
  { from: "vision", to: "inference" },
  { from: "inference", to: "cloud" },
  { from: "cloud", to: "dashboard" },
  { from: "cloud", to: "automation" },
];

export function ArchitectureSection() {
  const [selectedLayer, setSelectedLayer] = React.useState<string>("processing");
  const [expandedLayers, setExpandedLayers] = React.useState<Set<string>>(new Set(["processing"]));
  
  const selectedLayerData = LAYERS.find(l => l.id === selectedLayer);

  const toggleLayer = (layerId: string) => {
    setExpandedLayers(prev => {
      const next = new Set(prev);
      if (next.has(layerId)) next.delete(layerId);
      else next.add(layerId);
      return next;
    });
  };

  return (
    <section id="architecture" className="py-16 lg:py-20 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(79,70,229,0.03)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-header mb-16"
        >
          <Badge variant="accent" size="md" className="mb-4">
            SYSTEM ARCHITECTURE
          </Badge>
          <h2 className="section-title font-display font-bold">
            REAL-TIME SYSTEMS.
            <br />
            <span className="gradient-text">AUTONOMOUS INTELLIGENCE</span>
          </h2>
          <p className="section-subtitle">
            A layered backend model for ingesting live signals, routing data through AI processing, 
            executing inference, and surfacing decisions to operational dashboards and automation systems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-24 space-y-3 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-text-primary">LAYER INSPECTOR</h3>
              <div className="flex items-center gap-1 bg-bg-tertiary rounded-lg p-1">
                <Cpu className="w-4 h-4 text-accent" />
                <span className="text-xs font-mono text-text-muted px-2">CUDA</span>
              </div>
            </div>
            
            <div className="space-y-2" role="tablist" aria-label="Architecture layers">
              {LAYERS.map((layer) => {
                const isSelected = selectedLayer === layer.id;
                const isExpanded = expandedLayers.has(layer.id);
                
                return (
                  <motion.button
                    key={layer.id}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`panel-${layer.id}`}
                    id={`tab-${layer.id}`}
                    onClick={() => setSelectedLayer(layer.id)}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "w-full text-left p-4 rounded-xl transition-all duration-300 group relative overflow-hidden",
                      isSelected
                        ? "bg-gradient-to-r from-accent-dim/50 to-transparent border border-accent/30"
                        : "bg-bg-card border border-border hover:border-border-bright"
                    )}
                    style={{ borderLeftColor: layer.color }}
                  >
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: layer.bgColor }}>
                        <layer.icon className="w-5 h-5" style={{ color: layer.color }} aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-text-muted">{layer.number}</span>
                          <span className="font-medium text-text-primary truncate">{layer.name}</span>
                        </div>
                        <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">[{layer.tech}]</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {isExpanded ? (
                          <Minus className="w-4 h-4 text-text-muted" />
                        ) : (
                          <Plus className="w-4 h-4 text-text-muted" />
                        )}
                        {isSelected && <ArrowRight className="w-4 h-4 text-accent" />}
                      </div>
                    </div>
                    
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden mt-3 pt-3 border-t border-border/50"
                    >
                      <div className="space-y-2 text-sm">
                        {layer.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-2 text-text-secondary">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: layer.color }} />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative"
          >
            <div className="relative h-[500px] lg:h-[600px] mb-8">
              <ArchitectureCanvas 
                layers={LAYERS} 
                connections={LAYER_CONNECTIONS}
                selectedLayer={selectedLayer}
              />
            </div>

            <motion.div
              id={`panel-${selectedLayer}`}
              role="tabpanel"
              aria-labelledby={`tab-${selectedLayer}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-6 lg:p-8"
            >
              {selectedLayerData && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: selectedLayerData.bgColor }}>
                      <selectedLayerData.icon className="w-6 h-6" style={{ color: selectedLayerData.color }} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-mono text-text-muted">{selectedLayerData.number}</span>
                        <h3 className="font-display font-bold text-2xl text-text-primary">{selectedLayerData.name}</h3>
                      </div>
                      <span className="text-sm font-mono text-text-muted uppercase tracking-wider">[{selectedLayerData.tech}]</span>
                    </div>
                  </div>
                  
                  <p className="text-text-secondary mb-6">{selectedLayerData.description}</p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-text-primary mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-accent" />
                        KEY TECHNOLOGIES
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLayerData.details.slice(0, 3).map((detail, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-lg bg-bg-tertiary border border-border text-sm font-mono text-text-secondary">
                            {detail.split(":")[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-text-primary mb-3 flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-accent" />
                        CONNECTS TO
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLayerData.connections.map((connId) => {
                          const connLayer = LAYERS.find(l => l.id === connId);
                          return connLayer ? (
                            <span key={connId} className="px-3 py-1.5 rounded-lg bg-bg-tertiary border border-border text-sm font-mono text-text-secondary flex items-center gap-1" style={{ borderColor: connLayer.color }}>
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: connLayer.color }} />
                              {connLayer.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ArchitectureCanvas({ 
  layers, 
  connections, 
  selectedLayer 
}: { 
  layers: typeof LAYERS; 
  connections: typeof LAYER_CONNECTIONS;
  selectedLayer: string;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const timeRef = React.useRef(0);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const layerPositions: Record<string, { x: number; y: number }> = {};
    const centerX = canvas.width / dpr / 2;
    const centerY = canvas.height / dpr / 2;
    const radius = Math.min(canvas.width / dpr, canvas.height / dpr) * 0.35;

    layers.forEach((layer, i) => {
      const angle = (i / layers.length) * Math.PI * 2 - Math.PI / 2;
      layerPositions[layer.id] = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      };
    });

    const drawConnection = (from: string, to: number, progress: number) => {
      const start = layerPositions[from];
      const end = layerPositions[layers[to].id];
      if (!start || !end) return;

      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      const curveOffset = Math.sin(timeRef.current * 2 + to) * 30;
      
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.quadraticCurveTo(midX + curveOffset, midY + curveOffset, end.x, end.y);
      
      const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
      const fromLayer = layers.find(l => l.id === from);
      const toLayer = layers[to];
      gradient.addColorStop(0, fromLayer?.color || "#b45309");
      gradient.addColorStop(1, toLayer?.color || "#b45309");
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([10, 10]);
      ctx.lineDashOffset = -timeRef.current * 50;
      ctx.stroke();
      ctx.setLineDash([]);

      const particleX = start.x + (end.x - start.x) * progress;
      const particleY = start.y + (end.y - start.y) * progress;
      
      ctx.beginPath();
      ctx.arc(particleX, particleY, 3, 0, Math.PI * 2);
      ctx.fillStyle = toLayer?.color || "#b45309";
      ctx.shadowColor = toLayer?.color || "#b45309";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const animate = () => {
      timeRef.current += 0.016;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      
      ctx.clearRect(0, 0, width, height);

      connections.forEach((conn, i) => {
        const progress = (timeRef.current * 0.1 + i * 0.15) % 1;
        drawConnection(conn.from, layers.findIndex(l => l.id === conn.to), progress);
      });

      layers.forEach((layer, i) => {
        const pos = layerPositions[layer.id];
        if (!pos) return;

        const isSelected = layer.id === selectedLayer;
        const pulse = Math.sin(timeRef.current * 3 + i) * 0.15 + 1;
        const size = isSelected ? 18 * pulse : 14 * pulse;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, size * 1.5);
        gradient.addColorStop(0, layer.color);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fill();

        if (isSelected) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, size + 8 + Math.sin(timeRef.current * 4) * 4, 0, Math.PI * 2);
          ctx.strokeStyle = layer.color;
          ctx.lineWidth = 2;
          ctx.setLineDash([8, 8]);
          ctx.lineDashOffset = -timeRef.current * 30;
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.font = "bold 11px 'JetBrains Mono', monospace";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(layer.name, pos.x, pos.y - size - 8);
        
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillStyle = "#d97706";
        ctx.fillText(`[${layer.tech}]`, pos.x, pos.y - size - 18);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, [layers, connections, selectedLayer]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-2xl"
      aria-hidden="true"
    />
  );
}

export default ArchitectureSection;