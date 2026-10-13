"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Briefcase, 
  MapPin, 
  Cpu, 
  Bot, 
  Eye, 
  Server, 
  Shield, 
  Sparkles, 
  CheckCircle2, 
  Send,
  X
} from "lucide-react";
import { Button, NuovxLogo, Badge, Card, CardContent } from "@/components/ui";
import { ThemeToggle, useTheme } from "@/components/theme/ThemeProvider";
import { Footer } from "@/components/footer/Footer";

interface JobPosition {
  id: string;
  title: string;
  dept: "Robotics" | "Inference & AI" | "Computer Vision" | "Infrastructure";
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  tech: string[];
}

const POSITIONS: JobPosition[] = [
  {
    id: "robotics-engineer",
    title: "Senior Robotics Systems Engineer",
    dept: "Robotics",
    location: "Bengaluru, India / Hybrid",
    type: "Full-Time",
    experience: "4+ years",
    description:
      "Lead architecture and deterministic kinematic control loops for autonomous mobile robot fleets and industrial manipulators using ROS 2 Humble.",
    requirements: [
      "Deep expertise in C++17/20, ROS 2 Humble, and Nav2 costmap algorithms",
      "Experience with hardware-in-the-loop (HIL) testing and trajectory planning",
      "Familiarity with NVIDIA Isaac Sim or Gazebo physics simulators",
    ],
    tech: ["ROS 2", "C++20", "Isaac Sim", "Nav2", "Fast DDS"],
  },
  {
    id: "cuda-acceleration",
    title: "CUDA & TensorRT Acceleration Specialist",
    dept: "Inference & AI",
    location: "Bengaluru, India / Remote",
    type: "Full-Time",
    experience: "3+ years",
    description:
      "Optimize transformer and physical AI model inference down to microsecond latencies on NVIDIA DGX and Jetson AGX Orin clusters.",
    requirements: [
      "Proven track record writing custom CUDA C++ kernels and Triton model servers",
      "Hands-on expertise with TensorRT 10, FP8 quantization, and AWQ/SmoothQuant",
      "Experience with high-throughput continuous batching and KV-cache optimization",
    ],
    tech: ["CUDA 12.4", "TensorRT", "Triton", "PyTorch", "vLLM"],
  },
  {
    id: "vision-architect",
    title: "Principal Computer Vision Architect",
    dept: "Computer Vision",
    location: "Remote / Hybrid",
    type: "Full-Time",
    experience: "5+ years",
    description:
      "Architect industrial video pipelines achieving 41+ FPS edge inference across 64 simultaneous camera streams for automated factory quality control.",
    requirements: [
      "Mastery of real-time object detection (YOLOv9, RT-DETR) and multi-object tracking",
      "Deep experience with NVIDIA DeepStream, GStreamer, and Jetson deployment",
      "Solid foundation in OpenCV, ONNX Runtime, and hardware-accelerated video decoding",
    ],
    tech: ["DeepStream", "RT-DETR", "YOLOv9", "ByteTrack", "GStreamer"],
  },
  {
    id: "k8s-distributed",
    title: "Distributed Systems & Kubernetes Engineer",
    dept: "Infrastructure",
    location: "Napoli, Italy / Remote",
    type: "Full-Time",
    experience: "4+ years",
    description:
      "Scale our multi-tenant physical AI orchestration fabric across distributed cloud and edge nodes with 99.999% reliability SLA.",
    requirements: [
      "Extensive experience with Kubernetes internals, custom CRDs, and KEDA scaling",
      "Production expertise with Apache Kafka event streaming and Redis clusters",
      "Familiarity with Cilium eBPF networking and zero-trust zero-drift GitOps with ArgoCD",
    ],
    tech: ["Kubernetes", "Kafka", "ArgoCD", "Cilium eBPF", "Go"],
  },
];

export default function CareersPage() {
  const { theme } = useTheme();
  const [selectedDept, setSelectedDept] = React.useState<string>("All");
  const [activeJob, setActiveJob] = React.useState<JobPosition | null>(null);
  const [isApplying, setIsApplying] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const filteredPositions = selectedDept === "All"
    ? POSITIONS
    : POSITIONS.filter((p) => p.dept === selectedDept);

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 selection:text-white">
      {/* ── Top Navigation ── */}
      <header className="sticky top-0 z-50 bg-bg-primary/90 backdrop-blur-2xl border-b border-border shadow-xs">
        <div className="section-container flex items-center justify-between h-16 lg:h-[4.5rem]">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center group py-1">
              <NuovxLogo variant={theme === "light" ? "light" : "dark"} size="sm" showTagline={false} />
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
            <ThemeToggle />
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

      {/* ── Careers Hero ── */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-bg-primary">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(212,163,115,0.14)_0%,transparent_70%)]" />
        </div>

        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <Badge variant="accent" size="md" className="mb-5 inline-flex">
            CAREERS AT NOUVX · WE ARE HIRING
          </Badge>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6 text-text-primary">
            Build the Frontier of{" "}
            <span className="bg-gradient-to-r from-text-primary via-[#e2b17a] to-accent bg-clip-text text-transparent">
              Physical AI &amp; Robotics
            </span>
          </h1>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto mb-10">
            We are assembling a world-class team of systems architects, GPU performance engineers, and roboticists.
            Together, we engineer sovereign infrastructure for autonomous physical machines.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Competitive Equity", "Access to DGX GPU Superclusters", "Global Mobility (IN / IT)", "Direct Engineering Impact"].map((item) => (
              <span
                key={item}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono border border-border bg-bg-card text-text-secondary flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Positions ── */}
      <section className="py-16 bg-bg-secondary/60 border-t border-border relative">
        <div className="section-container max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary mb-2">
                Open Engineering Roles
              </h2>
              <p className="text-sm text-text-secondary">
                Select a discipline to explore technical requirements and apply.
              </p>
            </div>

            {/* Department Filter */}
            <div className="flex flex-wrap gap-2">
              {["All", "Robotics", "Inference & AI", "Computer Vision", "Infrastructure"].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                    selectedDept === dept
                      ? "bg-accent text-[#0a0807] font-bold shadow-xs"
                      : "bg-bg-card border border-border text-text-muted hover:text-text-primary hover:border-accent/40"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job Cards */}
          <div className="space-y-4">
            {filteredPositions.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group p-6 rounded-2xl bg-bg-card border border-border hover:border-accent/60 transition-all duration-300 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-accent/15 text-accent border border-accent/30">
                      {job.dept}
                    </span>
                    <span className="text-xs font-mono text-text-muted flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-text-dim" />
                      {job.location}
                    </span>
                    <span className="text-xs font-mono text-text-muted">
                      · {job.type} · {job.experience}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-text-primary group-hover:text-accent transition-colors mb-2">
                    {job.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed mb-4 max-w-2xl">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {job.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-bg-secondary border border-border/80 text-text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <Button
                    size="sm"
                    className="bg-[#d4a373] hover:bg-[#e2b17a] text-[#0a0807] font-bold text-xs rounded-xl px-5 shadow-xs"
                    onClick={() => {
                      setActiveJob(job);
                      setSubmitted(false);
                    }}
                  >
                    Apply Role
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Modal ── */}
      <AnimatePresence>
        {activeJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-bg-card border border-border rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8"
            >
              <button
                onClick={() => setActiveJob(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center mx-auto mb-4 text-accent">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-text-primary mb-2">
                    Application Received
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    Thank you for applying to <strong>{activeJob.title}</strong>. Our engineering leads review submissions within 2 business days.
                  </p>
                  <Button
                    onClick={() => setActiveJob(null)}
                    className="bg-[#d4a373] hover:bg-[#e2b17a] text-[#0a0807] font-bold text-sm rounded-xl px-6"
                  >
                    Close Window
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-widest">
                      APPLYING FOR
                    </span>
                    <h3 className="font-display font-bold text-xl text-text-primary mt-1">
                      {activeJob.title}
                    </h3>
                    <p className="text-xs font-mono text-text-muted mt-0.5">
                      {activeJob.location} · {activeJob.dept}
                    </p>
                  </div>

                  <form onSubmit={handleSubmitApplication} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-text-secondary mb-1">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Ada Lovelace"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-bg-secondary text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-text-secondary mb-1">
                        Work Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="ada@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-bg-secondary text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-text-secondary mb-1">
                        GitHub / LinkedIn URL *
                      </label>
                      <input
                        required
                        type="url"
                        placeholder="https://github.com/username"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-bg-secondary text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-text-secondary mb-1">
                        Brief Technical Background
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Briefly describe your experience with CUDA, ROS 2, or distributed systems..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-bg-secondary text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isApplying}
                      className="w-full bg-[#d4a373] hover:bg-[#e2b17a] text-[#0a0807] font-bold text-sm rounded-xl py-3 mt-2 shadow-xs"
                    >
                      {isApplying ? "Submitting Application..." : "Submit Application"}
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
