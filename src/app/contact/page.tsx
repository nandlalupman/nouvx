"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Mail, 
  MapPin, 
  Clock, 
  Shield, 
  Zap, 
  Network, 
  Bot, 
  CheckCircle2, 
  Send,
  AlertCircle,
  Loader2
} from "lucide-react";
import { Button, NuovxLogo, Badge } from "@/components/ui";
import { Footer } from "@/components/footer/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Form state
  const [formData, setFormData] = React.useState({
    full_name: "",
    email: "",
    company: "",
    focus_area: "Autonomous Fleet & ROS 2 Control",
    timeline: "Immediate (Production Readiness)",
    requirements: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      setSubmitted(true);
      setFormData({
        full_name: "",
        email: "",
        company: "",
        focus_area: "Autonomous Fleet & ROS 2 Control",
        timeline: "Immediate (Production Readiness)",
        requirements: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-accent/30 selection:text-white">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-border shadow-xs">
        <div className="section-container flex items-center justify-between h-16 lg:h-[4.5rem]">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center group py-1">
              <NuovxLogo variant="light" size="sm" showTagline={false} />
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
              variant="ai"
              size="sm"
              className="rounded-xl px-4 shadow-sm"
              asChild
            >
              <a href="/careers">View Careers</a>
            </Button>
          </div>
        </div>
      </header>

      {/* ── Main Section ── */}
      <section className="relative py-16 lg:py-24 bg-bg-primary overflow-hidden flex-1">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.12)_0%,transparent_65%)]" />
        </div>

        <div className="section-container relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Information */}
            <div className="lg:col-span-5">
              <Badge variant="accent" size="md" className="mb-4 inline-flex">
                ENGAGE NOUVX ENGINEERING
              </Badge>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-text-primary mb-5">
                Deploy Sovereign{" "}
                <span className="bg-gradient-to-r from-text-primary via-[#b45309] to-[#d97706] bg-clip-text text-transparent">
                  Physical AI
                </span>
              </h1>

              <p className="text-base text-text-secondary leading-relaxed mb-8">
                Connect directly with our infrastructure architects to scope autonomous fleet orchestration, 
                high-throughput model serving on DGX clusters, or 41 FPS edge computer vision systems.
              </p>

              {/* Direct Touchpoints */}
              <div className="space-y-4 mb-10">
                {[
                  {
                    icon: Mail,
                    label: "Enterprise Solutions",
                    val: "contact@nouvx.com",
                    href: "mailto:contact@nouvx.com",
                  },
                  {
                    icon: Mail,
                    label: "Research & Systems Lab",
                    val: "research@nouvx.com",
                    href: "mailto:research@nouvx.com",
                  },
                  {
                    icon: MapPin,
                    label: "India Engineering Bay",
                    val: "Bengaluru, Karnataka, India",
                  },
                  {
                    icon: MapPin,
                    label: "European Systems Center",
                    val: "Napoli, Campania, Italy",
                  },
                  {
                    icon: Clock,
                    label: "Response SLA",
                    val: "Technical scoping review within 24 hours",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-bg-card border border-border shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0 text-accent mt-0.5">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-semibold text-text-primary hover:text-accent transition-colors"
                        >
                          {item.val}
                        </a>
                      ) : (
                        <div className="text-sm font-semibold text-text-primary">
                          {item.val}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="p-4 rounded-xl border border-border bg-bg-secondary/70">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent mb-1.5">
                  <Shield className="w-4 h-4" />
                  CONFIDENTIAL ARCHITECTURE REVIEW
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  All enterprise technical disclosures and hardware integration discussions are conducted under mutual NDA.
                </p>
              </div>
            </div>

            {/* Right: Interactive Consultation Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-2xl bg-bg-card border border-border shadow-xl relative overflow-hidden">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center mx-auto mb-5 text-accent">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-text-primary mb-3">
                      Deployment Scoping Initiated
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto mb-8">
                      Thank you for engaging NOUVX. An enterprise systems engineer has been assigned to your request and will follow up with technical architecture documentation within 1 business day.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      className="bg-[#b45309] hover:bg-[#d97706] text-white font-bold text-sm rounded-xl px-7 shadow-md"
                    >
                      Submit Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h3 className="font-display font-bold text-2xl text-text-primary mb-1">
                        Request System Architecture Call
                      </h3>
                      <p className="text-sm text-text-secondary">
                        Detail your operational parameters, compute hardware, or fleet scale.
                      </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-sm text-red-400">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-text-secondary mb-1.5">
                            Full Name *
                          </label>
                          <input
                            required
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder="Alex Morgan"
                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg-secondary text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-text-secondary mb-1.5">
                            Work Email *
                          </label>
                          <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="alex@enterprise.com"
                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg-secondary text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-text-secondary mb-1.5">
                            Company / Organization *
                          </label>
                          <input
                            required
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Autonomous Robotics Corp"
                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg-secondary text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-text-secondary mb-1.5">
                            Primary Focus Area
                          </label>
                          <select
                            name="focus_area"
                            value={formData.focus_area}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg-secondary text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                          >
                            <option>Autonomous Fleet &amp; ROS 2 Control</option>
                            <option>41 FPS Computer Vision &amp; Edge AI</option>
                            <option>High-Throughput CUDA Model Serving</option>
                            <option>Distributed Kubernetes Infrastructure</option>
                            <option>Full-Stack Physical AI Platform</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-text-secondary mb-1.5">
                          Deployment Timeline
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg-secondary text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                        >
                          <option>Immediate (Production Readiness)</option>
                          <option>Within 30–60 Days</option>
                          <option>Quarterly Roadmap Exploration</option>
                          <option>Research Collaboration / POC</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-text-secondary mb-1.5">
                          Operational System Context &amp; Requirements *
                        </label>
                        <textarea
                          required
                          rows={4}
                          name="requirements"
                          value={formData.requirements}
                          onChange={handleChange}
                          placeholder="Describe target hardware (e.g. Jetson Orin, H100), telemetry throughput, robot count, or latency targets..."
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg-secondary text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#b45309] hover:bg-[#d97706] text-white font-bold text-sm rounded-xl py-3.5 mt-3 shadow-md disabled:opacity-60"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Transmitting Specification...
                          </>
                        ) : (
                          <>
                            Submit Technical Specification
                            <Send className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
