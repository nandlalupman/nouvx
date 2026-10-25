"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  Server, Eye, Bot, Database, Zap, Network, 
  ArrowRight, CheckCircle, TrendingUp, BarChart2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

const CASE_STUDIES = [
  {
    id: "autonomous-monitoring",
    number: "01",
    category: "OPERATIONS",
    title: "AUTONOMOUS MONITORING PLATFORM",
    description: "Live infrastructure telemetry, model-backed anomaly detection, alerting, and operator dashboards for a global cloud provider.",
    metrics: ["99.99% uptime", "40% faster MTTR", "10x alert reduction"],
    technologies: ["Kubernetes", "Prometheus", "Grafana", "TensorFlow", "Kafka"],
    outcomes: [
      "Reduced incident response time from 45min to 12min",
      "Automated 87% of routine operational tasks",
      "Predictive scaling reduced cloud costs by 34%",
    ],
    icon: Server,
    color: "#b45309",
  },
  {
    id: "industrial-vision",
    number: "02",
    category: "COMPUTER VISION",
    title: "INDUSTRIAL VISION INTELLIGENCE",
    description: "Computer vision pipelines for detection, tracking, inspection, and real-time facility analytics across 47 manufacturing sites.",
    metrics: ["41 FPS edge", "99.2% accuracy", "<50ms latency"],
    technologies: ["YOLOv9", "TensorRT", "DeepSORT", "OpenCV", "Jetson Orin"],
    outcomes: [
      "Zero-defect quality inspection at 2000 parts/min",
      "Real-time safety compliance monitoring",
      "Predictive maintenance from visual anomalies",
    ],
    icon: Eye,
    color: "#10b981",
  },
  {
    id: "robotics-command",
    number: "03",
    category: "ROBOTICS",
    title: "ROBOTICS COMMAND INTERFACE",
    description: "ROS-compatible control surfaces, fleet telemetry, safety states, and hardware-system communication for autonomous warehouse fleet.",
    metrics: ["200+ robots", "99.98% uptime", "<10ms control loop"],
    technologies: ["ROS 2 Humble", "Fast DDS", "Nav2", "MoveIt 2", "Isaac Sim"],
    outcomes: [
      "3x throughput increase in fulfillment centers",
      "Zero safety incidents in 18 months",
      "Dynamic fleet rebalancing in real-time",
    ],
    icon: Bot,
    color: "#d97706",
  },
  {
    id: "predictive-infra",
    number: "04",
    category: "INFRASTRUCTURE",
    title: "PREDICTIVE INFRAENGINE",
    description: "Forecasting, queue health, capacity signals, automated escalation, and reliability analytics for multi-region deployment.",
    metrics: ["99.999% SLA", "60% fewer incidents", "30% cost reduction"],
    technologies: ["TimescaleDB", "Prophet", "KEDA", "ArgoCD", "Istio"],
    outcomes: [
      "Predicted 94% of capacity events 4hrs in advance",
      "Automated scaling reduced over-provisioning",
      "Chaos engineering integrated in CI/CD",
    ],
    icon: Database,
    color: "#9a3412",
  },
  {
    id: "smart-factory",
    number: "05",
    category: "INDUSTRIAL AI",
    title: "SMART FACTORY INTELLIGENCE PLATFORM",
    description: "Machine-state monitoring, production insights, robotics coordination, and automation triggers for discrete manufacturing.",
    metrics: ["15% OEE improvement", "40% downtime reduction", "Real-time digital twin"],
    technologies: ["OPC-UA", "MQTT", "InfluxDB", "Node-RED", "Digital Twin"],
    outcomes: [
      "Unified IT/OT data layer across 12 plants",
      "Automated changeover reduced setup time 60%",
      "Energy optimization saved $2.3M annually",
    ],
    icon: Zap,
    color: "#f59e0b",
  },
  {
    id: "realtime-analytics",
    number: "06",
    category: "DATA SYSTEMS",
    title: "REAL-TIME ANALYTICS NETWORK",
    description: "Streaming data architecture, live dashboards, data quality checks, and distributed processing for fintech platform.",
    metrics: ["500K events/sec", "<100ms end-to-end", "99.99% data quality"],
    technologies: ["Flink", "ClickHouse", "Kafka", "Redis", "WebSocket"],
    outcomes: [
      "Real-time fraud detection at 100K txn/sec",
      "Sub-second regulatory reporting",
      "Customer 360 updated in real-time",
    ],
    icon: Network,
    color: "#78350f",
  },
];

export function CaseStudiesSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#f8f4ee] relative overflow-hidden border-b border-[#e8dfd5]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse,rgba(217,119,6,0.06)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse,rgba(180,83,9,0.04)_0%,transparent_65%)]" />
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
            Case Studies
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[#1c1917] mb-4">
            ENTERPRISE DEPLOYMENTS,
            <br />
            <span className="bg-gradient-to-r from-[#1c1917] via-[#78350f] to-[#b45309] bg-clip-text text-transparent">
              DESIGNED AS SYSTEMS
            </span>
          </h2>
          <p className="text-[#78716c] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Production results and architecture breakdowns from mission-critical client implementations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study, index) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <CaseStudyCard {...study} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({ 
  number, 
  category, 
  title, 
  description, 
  metrics, 
  technologies, 
  outcomes, 
  icon: Icon, 
  color 
}: typeof CASE_STUDIES[0]) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div className="relative group h-full" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Outer ambient glow */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${color}20, transparent 65%)` }}
      />

      <div 
        className="h-full rounded-2xl bg-white/95 border border-[#e8dfd5] shadow-[0_2px_12px_rgba(120,53,15,0.04)] group-hover:shadow-[0_16px_36px_rgba(180,83,9,0.12)] group-hover:border-[#b45309]/50 transition-all duration-300 relative overflow-hidden flex flex-col p-6"
      >
        {/* Top bar accent */}
        <div
          className="absolute top-0 left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />

        <div className="pb-4">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-display font-bold select-none text-[#e7dfd5]">{number}</span>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105" 
                style={{ backgroundColor: `${color}14`, borderColor: `${color}35` }}
              >
                <Icon className="w-6 h-6" style={{ color }} aria-hidden="true" />
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-[#f5efe6] border border-[#e8ded2] text-[#78350f] uppercase tracking-widest">
              {category}
            </span>
          </div>
          
          <h3 className="text-lg font-display font-bold text-[#1c1917] group-hover:text-[#9a3412] transition-colors line-clamp-2">
            {title}
          </h3>
        </div>
        
        <div className="pb-4 flex-1 flex flex-col">
          <p className="text-[#57534e] mb-6 leading-relaxed flex-1 text-sm font-normal">{description}</p>
          
          <div className="flex flex-wrap gap-1.5 mb-6">
            {metrics.map((metric, i) => (
              <span 
                key={i} 
                className="px-2.5 py-1 rounded-lg text-xs font-mono border transition-all duration-200"
                style={{ backgroundColor: `${color}0c`, borderColor: `${color}28`, color }}
              >
                {metric}
              </span>
            ))}
          </div>
          
          <div className="border-t border-[#e8dfd5] pt-4 mt-auto">
            <div className="mb-4">
              <h4 className="text-xs font-mono text-[#78350f] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                TECHNOLOGIES
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#faf6f0] border border-[#e8ded2] text-[#78350f]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <details className="group/details">
              <summary className="flex items-center justify-between cursor-pointer list-none py-1">
                <span className="text-sm font-semibold text-[#1c1917] group-hover/details:text-[#9a3412] transition-colors">
                  KEY OUTCOMES
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-open/details:rotate-90 transition-transform" />
              </summary>
              <div className="mt-3 space-y-2 pl-2 border-l-2 border-[#e8dfd5]">
                {outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-[#44403c]">
                    <CheckCircle className="w-4 h-4 text-[#d97706] flex-shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
        
        <div 
          className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} 
        />
      </div>
    </div>
  );
}

export default CaseStudiesSection;