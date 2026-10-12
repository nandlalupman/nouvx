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
    color: "#d4a373",
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
    color: "#c68642",
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
    color: "#b87333",
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
    color: "#e5a950",
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
    color: "#ecdcc9",
  },
];

export function CaseStudiesSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#f8f4ec] relative overflow-hidden border-y border-[#e8ded0]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse,rgba(212,163,115,0.16)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse,rgba(198,134,66,0.10)_0%,transparent_65%)]" />
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
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            Case Studies
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[#15100c] mb-4">
            ENTERPRISE DEPLOYMENTS,
            <br />
            <span className="bg-gradient-to-r from-[#8f5626] via-[#b87333] to-[#c68642] bg-clip-text text-transparent">
              DESIGNED AS SYSTEMS
            </span>
          </h2>
          <p className="text-[#5c4f42] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
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
        style={{ background: `radial-gradient(ellipse at top left, ${color}22, transparent 65%)` }}
      />

      <div 
        className="h-full rounded-2xl bg-[#ffffff] border border-[#e2d5c5] shadow-[0_4px_24px_rgba(40,25,15,0.04)] group-hover:shadow-[0_16px_40px_rgba(184,115,51,0.14)] group-hover:border-[#b87333]/70 transition-all duration-300 relative overflow-hidden flex flex-col p-6"
      >
        {/* Top bar accent */}
        <div
          className="absolute top-0 left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />

        <div className="pb-4">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-display font-bold select-none text-[#cbb8a3]">{number}</span>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105" 
                style={{ backgroundColor: `${color}14`, borderColor: `${color}35` }}
              >
                <Icon className="w-6 h-6" style={{ color }} aria-hidden="true" />
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-[#f0e7da] border border-[#dfd3c2] text-[#6b4e31] uppercase tracking-widest">
              {category}
            </span>
          </div>
          
          <h3 className="text-lg font-display font-bold text-[#16110e] group-hover:text-[#945d2b] transition-colors line-clamp-2">
            {title}
          </h3>
        </div>
        
        <div className="pb-4 flex-1 flex flex-col">
          <p className="text-[#55473a] mb-6 leading-relaxed flex-1 text-sm">{description}</p>
          
          <div className="flex flex-wrap gap-1.5 mb-6">
            {metrics.map((metric, i) => (
              <span 
                key={i} 
                className="px-2.5 py-1 rounded-lg text-xs font-mono border transition-all duration-200"
                style={{ backgroundColor: `${color}0c`, borderColor: `${color}30`, color }}
              >
                {metric}
              </span>
            ))}
          </div>
          
          <div className="border-t border-[#ebdccb] pt-4 mt-auto">
            <div className="mb-4">
              <h4 className="text-xs font-mono text-[#78695b] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                TECHNOLOGIES
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#f5efe5] border border-[#dfd1bf] text-[#635242]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <details className="group/details">
              <summary className="flex items-center justify-between cursor-pointer list-none py-1">
                <span className="text-sm font-semibold text-[#45372c] group-hover/details:text-[#16110e] transition-colors">
                  KEY OUTCOMES
                </span>
                <ArrowRight className="w-4 h-4 text-[#8a7b6e] group-open/details:rotate-90 transition-transform" />
              </summary>
              <div className="mt-3 space-y-2 pl-2 border-l-2 border-[#d8c8b4]">
                {outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-[#3b2f25]">
                    <CheckCircle className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5" />
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