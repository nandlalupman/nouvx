"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  Server, Eye, Bot, Activity, Database, Zap, 
  TrendingUp, TrendingDown, Minimize2, Maximize2,
  AlertTriangle, CheckCircle, XCircle, Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { MetricCounter } from "@/components/hero";

const METRICS: Array<{
  id: string;
  label: string;
  value: number;
  suffix: string;
  trend: "up" | "down";
  change: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: "signal", label: "CURRENT SIGNAL", value: 99.98, suffix: "%", trend: "up", change: 0.02, color: "text-success", icon: CheckCircle },
  { id: "health", label: "CLUSTER HEALTH", value: 100, suffix: "%", trend: "up", change: 0, color: "text-success", icon: CheckCircle },
  { id: "queue", label: "QUEUE DEPTH", value: 204, suffix: "", trend: "down", change: -12, color: "text-warning", icon: TrendingDown },
  { id: "latency", label: "API LATENCY", value: 12, suffix: "ms", trend: "up", change: -1, color: "text-vision", icon: Zap },
  { id: "nodes", label: "EDGE NODES", value: 76, suffix: "", trend: "up", change: 2, color: "text-accent", icon: Server },
  { id: "storage", label: "STORAGE I/O", value: 94, suffix: "%", trend: "up", change: 1, color: "text-infrastructure", icon: Database },
];

const TABS = [
  { id: "infrastructure", label: "INFRASTRUCTURE", icon: Server, color: "text-infrastructure" },
  { id: "vision", label: "VISION", icon: Eye, color: "text-vision" },
  { id: "robotics", label: "ROBOTICS", icon: Bot, color: "text-robotics" },
];

const pseudoNoise = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const GRAPH_DATA = {
  infrastructure: Array.from({ length: 50 }, (_, i) => 95 + Math.sin(i * 0.2) * 3 + pseudoNoise(i) * 2),
  vision: Array.from({ length: 50 }, (_, i) => 38 + Math.sin(i * 0.3) * 2 + pseudoNoise(i + 50) * 3),
  robotics: Array.from({ length: 50 }, (_, i) => 72 + Math.sin(i * 0.15) * 4 + pseudoNoise(i + 100) * 2),
};

const ALERTS: Array<{
  id: number;
  severity: "info" | "warning" | "critical";
  message: string;
  time: string;
  source: string;
}> = [
  { id: 1, severity: "info", message: "Node eu-west-1a scaled up", time: "2m ago", source: "K8s Autoscaler" },
  { id: 2, severity: "warning", message: "Queue depth exceeded threshold", time: "5m ago", source: "Kafka Monitor" },
  { id: 3, severity: "critical", message: "GPU temp threshold reached on node-47", time: "12m ago", source: "DCGM" },
  { id: 4, severity: "info", message: "Model v2.4.1 deployed to inference", time: "18m ago", source: "MLflow" },
  { id: 5, severity: "info", message: "VisionGrid edge sync completed", time: "25m ago", source: "Edge Manager" },
];

export function OperationsSection() {
  const [activeTab, setActiveTab] = React.useState("infrastructure");
  const [selectedSample, setSelectedSample] = React.useState(25);
  const [timeRange, setTimeRange] = React.useState("1h");
  const [paused, setPaused] = React.useState(false);

  const graphData = GRAPH_DATA[activeTab as keyof typeof GRAPH_DATA];

  return (
    <section id="operations" className="py-16 lg:py-20 bg-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--infra-dim)_0%,_transparent_50%)] pointer-events-none" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-header mb-12"
        >
          <Badge variant="accent" size="md" className="mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
            AI OPERATIONS CENTER
          </Badge>
          <h2 className="section-title font-display font-bold">
            MISSION-CRITICAL
            <br />
            <span className="gradient-text">INFRASTRUCTURE SOFTWARE</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid lg:grid-cols-[1fr_320px] gap-8 mb-8"
        >
          <div className="space-y-6">
            <Card variant="glass" className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const TabIcon = TABS.find(t => t.id === activeTab)?.icon || Server;
                      const tabColor = TABS.find(t => t.id === activeTab)?.color || 'text-accent';
                      return <TabIcon className={`w-5 h-5 ${tabColor}`} />;
                    })()}
                    <CardTitle className="text-lg">{TABS.find(t => t.id === activeTab)?.label}</CardTitle>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-success/20 text-success border border-success/30">LIVE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="input py-1.5 px-3 text-sm font-mono bg-bg-tertiary border-border w-auto"
                      aria-label="Time range"
                    >
                      <option value="5m">5 MIN</option>
                      <option value="15m">15 MIN</option>
                      <option value="1h">1 HOUR</option>
                      <option value="6h">6 HOURS</option>
                      <option value="24h">24 HOURS</option>
                    </select>
                    <button
                      onClick={() => setPaused(!paused)}
                      className="btn-ghost size-sm p-2"
                      aria-label={paused ? "Resume" : "Pause"}
                      aria-pressed={paused}
                    >
                      {paused ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <LiveGraph 
                  data={graphData} 
                  selectedIndex={selectedSample}
                  onSelect={setSelectedSample}
                  color={TABS.find(t => t.id === activeTab)?.color?.replace("text-", "") || "accent"}
                  paused={paused}
                />
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span className="font-mono">SAMPLE {selectedSample}</span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `var(--${TABS.find(t => t.id === activeTab)?.color?.replace("text-", "")})` }} />
                      <span>{GRAPH_DATA[activeTab as keyof typeof GRAPH_DATA][selectedSample].toFixed(1)}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
                    <span>INFRASTRUCTURE STREAM / NODE {Math.floor(selectedSample / 5) + 1}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {METRICS.map((metric) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: METRICS.indexOf(metric) * 0.05 }}
                >
                  <MetricCard {...metric} />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 lg:sticky lg:top-24 max-h-[calc(100vh-6rem)] overflow-y-auto"
          >
            <Card variant="glass">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    <CardTitle className="text-lg">ACTIVE ALERTS</CardTitle>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-warning/20 text-warning border border-warning/30">{ALERTS.length}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {ALERTS.map((alert) => (
                    <AlertItem key={alert.id} alert={alert} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">SYSTEM STATUS</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {STATUS_ITEMS.map((item) => (
                    <StatusItem key={item.id} {...item} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2",
                activeTab === tab.id
                  ? "bg-accent text-bg-primary shadow-[0_0_20px_var(--accent-glow)]"
                  : "bg-bg-card border border-border text-text-secondary hover:text-text-primary hover:border-border-bright"
              )}
              aria-pressed={activeTab === tab.id}
              role="tab"
            >
              <tab.icon className="w-4 h-4" style={{ color: `var(--${tab.color?.replace("text-", "")})` }} />
              {tab.label}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function MetricCard({ 
  label, 
  value, 
  suffix, 
  trend, 
  change, 
  color, 
  icon: Icon 
}: {
  label: string;
  value: number;
  suffix: string;
  trend: "up" | "down";
  change: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card variant="glass" className="p-4">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-mono text-text-muted uppercase tracking-wider">{label}</span>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <MetricCounter value={value} suffix={suffix} duration={1000} className="text-2xl font-bold text-text-primary" />
      </div>
      <div className="flex items-center gap-1.5">
        <span className={cn("text-sm font-mono", color)}>
          {trend === "up" ? "+" : ""}{change >= 0 ? "+" : ""}{change}{suffix}
        </span>
        <span className="text-xs text-text-muted">{trend === "up" ? "vs last period" : "vs last period"}</span>
      </div>
    </Card>
  );
}

function AlertItem({ alert }: { alert: typeof ALERTS[0] }) {
  const severityStyles: Record<"info" | "warning" | "critical", string> = {
    info: "bg-bg-tertiary border-border",
    warning: "bg-warning/10 border-warning/30",
    critical: "bg-error/10 border-error/30",
  };
  
  const severityIcons: Record<"info" | "warning" | "critical", React.ReactElement> = {
    info: <Loader2 className="w-4 h-4 text-accent animate-spin" />,
    warning: <AlertTriangle className="w-4 h-4 text-warning" />,
    critical: <XCircle className="w-4 h-4 text-error" />,
  };

  return (
    <div className={cn("p-3 rounded-xl border transition-all", severityStyles[alert.severity])}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{severityIcons[alert.severity]}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-text-primary">{alert.message}</p>
          <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
            <span className="font-mono">{alert.time}</span>
            <span>•</span>
            <span className="font-mono">{alert.source}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const STATUS_ITEMS: Array<{
  id: string;
  label: string;
  status: "healthy" | "warning" | "critical";
  detail: string;
}> = [
  { id: "inference", label: "INFERENCE", status: "healthy", detail: "12ms P99 • 480K req/s" },
  { id: "vision", label: "VISION", status: "healthy", detail: "41 FPS • 12 nodes" },
  { id: "robotics", label: "ROBOTICS", status: "healthy", detail: "76 fleet • Path locked" },
  { id: "kafka", label: "KAFKA", status: "healthy", detail: "204 queue • 99.9% lag" },
  { id: "k8s", label: "KUBERNETES", status: "healthy", detail: "12 nodes • 94% capacity" },
  { id: "storage", label: "STORAGE", status: "healthy", detail: "94% I/O • 2.4TB free" },
];

function StatusItem({ label, status, detail }: { label: string; status: "healthy" | "warning" | "critical"; detail: string }) {
  const statusStyles: Record<"healthy" | "warning" | "critical", string> = {
    healthy: "bg-success/20 text-success border-success/30",
    warning: "bg-warning/20 text-warning border-warning/30",
    critical: "bg-error/20 text-error border-error/30",
  };
  
  const statusIcons: Record<"healthy" | "warning" | "critical", React.ReactElement> = {
    healthy: <CheckCircle className="w-4 h-4" />,
    warning: <AlertTriangle className="w-4 h-4" />,
    critical: <XCircle className="w-4 h-4" />,
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-bg-tertiary/50 border border-border">
      <div className="flex items-center gap-3">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", statusStyles[status])}>
          {statusIcons[status]}
        </div>
        <div>
          <p className="font-medium text-text-primary text-sm">{label}</p>
          <p className="text-xs text-text-muted font-mono">{detail}</p>
        </div>
      </div>
      <span className={cn("px-2 py-0.5 rounded text-[10px] font-mono border", statusStyles[status])}>
        {status.toUpperCase()}
      </span>
    </div>
  );
}

function LiveGraph({ 
  data, 
  selectedIndex, 
  onSelect, 
  color = "accent",
  paused 
}: { 
  data: number[]; 
  selectedIndex: number; 
  onSelect: (index: number) => void;
  color: string;
  paused: boolean;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const timeRef = React.useRef(0);
  const animatedDataRef = React.useRef([...data]);

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

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const index = Math.round((x / rect.width) * (data.length - 1));
      onSelect(Math.max(0, Math.min(data.length - 1, index)));
    };

    canvas.addEventListener("click", handleClick);

    const animate = () => {
      if (!paused) {
        timeRef.current += 0.02;
        animatedDataRef.current = animatedDataRef.current.map((val, i) => {
          const target = data[i];
          return val + (target - val) * 0.1;
        });
      }

      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      
      ctx.clearRect(0, 0, width, height);

      const minVal = Math.min(...data) * 0.95;
      const maxVal = Math.max(...data) * 1.05;
      const range = maxVal - minVal;

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, `rgba(${getColorRGB(color)}, 0.15)`);
      gradient.addColorStop(1, `rgba(${getColorRGB(color)}, 0)`);

      ctx.beginPath();
      ctx.moveTo(0, height);
      
      animatedDataRef.current.forEach((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - minVal) / range) * height;
        if (i === 0) ctx.lineTo(x, y);
        else ctx.lineTo(x, y);
      });
      
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      animatedDataRef.current.forEach((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - minVal) / range) * height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      
      ctx.strokeStyle = `rgb(${getColorRGB(color)})`;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = `rgb(${getColorRGB(color)})`;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      const selX = (selectedIndex / (data.length - 1)) * width;
      const selVal = animatedDataRef.current[selectedIndex];
      const selY = height - ((selVal - minVal) / range) * height;

      ctx.beginPath();
      ctx.moveTo(selX, 0);
      ctx.lineTo(selX, height);
      ctx.strokeStyle = `rgba(${getColorRGB(color)}, 0.3)`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(selX, selY, 6, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${getColorRGB(color)})`;
      ctx.shadowColor = `rgb(${getColorRGB(color)})`;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(selX, selY, 10, 0, Math.PI * 2);
      ctx.strokeStyle = `rgb(${getColorRGB(color)})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", handleClick);
    };
  }, [data, selectedIndex, onSelect, color, paused]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[300px] cursor-crosshair"
      aria-label={`Live ${color} metrics graph`}
      role="img"
    />
  );
}

function getColorRGB(color: string): string {
  const colors: Record<string, string> = {
    accent: "212, 163, 115",
    vision: "16, 185, 129",
    robotics: "198, 134, 66",
    infrastructure: "184, 115, 51",
    warning: "229, 169, 80",
    success: "16, 185, 129",
    error: "194, 101, 60",
  };
  return colors[color] || colors.accent;
}

export default OperationsSection;