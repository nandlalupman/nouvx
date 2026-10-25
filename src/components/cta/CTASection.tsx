"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Clock, Shield, Zap, Network, Bot, CheckCircle2, Sparkles } from "lucide-react";
import { Button, Badge } from "@/components/ui";

const PROCESS_STEPS = [
  { number: "01", title: "Discovery",    description: "System requirements, constraints, and operational context analysis.", color: "#b45309" },
  { number: "02", title: "Architecture", description: "Technical design, technology selection, and integration planning.",    color: "#9a3412" },
  { number: "03", title: "Prototype",    description: "Rapid validation, proof-of-concept, and iterative refinement.",        color: "#10b981" },
  { number: "04", title: "Deployment",   description: "Production rollout, monitoring setup, and knowledge transfer.",        color: "#d97706" },
];

const CONTACT_INFO = [
  { icon: Mail,    label: "Email",       value: "contact@nouvx.com",                       href: "mailto:contact@nouvx.com" },
  { icon: MapPin,  label: "India",       value: "Bengaluru, Karnataka",                    href: "#" },
  { icon: MapPin,  label: "Italy",       value: "Napoli, Italy",                           href: "#" },
  { icon: Clock,   label: "Response",    value: "Engineering review within 1 business day", href: "#" },
];

const FOCUS_AREAS = [
  { icon: Shield,  label: "Security",      desc: "Zero-trust, encryption, compliance",    color: "#ef4444" },
  { icon: Zap,     label: "Reliability",   desc: "99.999% uptime, chaos engineering",    color: "#d97706" },
  { icon: Network, label: "Autonomy",      desc: "Self-healing, adaptive systems",        color: "#b45309" },
  { icon: Bot,     label: "Intelligence",  desc: "AI-native, model-driven ops",           color: "#9a3412" },
];

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-white border-t border-slate-200 relative overflow-hidden">
      {/* Background halos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px]
          bg-[radial-gradient(ellipse,rgba(180,83,9,0.05)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px]
          bg-[radial-gradient(ellipse,rgba(217,119,6,0.03)_0%,transparent_65%)]" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge variant="accent" size="md" dot animate className="mb-5 inline-flex">
            Engage NOUVX
          </Badge>
          <h2 className="section-title mb-5">
            Build the Next Generation of
            <br />
            <span className="gradient-text">Intelligent Infrastructure</span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
            Bring us a system problem — AI product development, computer vision, robotics software,
            automation, backend infrastructure, or monitoring platforms.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button variant="ai" size="xl" className="group w-full sm:w-auto" asChild>
            <a href="/contact" className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Start a Project</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-amber-300" />
            </a>
          </Button>
          <Button variant="outline" size="xl" className="w-full sm:w-auto" asChild>
            <a href="/careers">Explore Careers</a>
          </Button>
        </motion.div>

        {/* Focus Area Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-24"
        >
          {FOCUS_AREAS.map((area, i) => (
            <motion.div
              key={area.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.18 + i * 0.07 }}
              className="group p-4 rounded-2xl bg-bg-card border border-border hover:border-border-accent transition-all duration-300 text-center"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 mx-auto border transition-all duration-300"
                style={{ backgroundColor: `${area.color}10`, borderColor: `${area.color}28` }}
              >
                <area.icon className="w-5 h-5" style={{ color: area.color }} aria-hidden="true" />
              </div>
              <p className="font-semibold text-text-primary text-sm">{area.label}</p>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">{area.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Process + Contact Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start"
        >
          {/* Engagement Process */}
          <div>
            <h3 className="font-display font-bold text-2xl text-text-primary mb-2">
              Engagement Process
            </h3>
            <p className="text-text-secondary leading-relaxed mb-8 text-sm">
              Every engagement is a systematic progression from problem definition
              to production deployment, with clear milestones.
            </p>

            <div className="space-y-4">
              {PROCESS_STEPS.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.09 }}
                  className="flex gap-4 p-4 rounded-2xl bg-bg-card border border-border hover:border-border-accent transition-all duration-300 group"
                >
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-display font-bold text-sm border transition-all duration-300"
                    style={{
                      borderColor: `${step.color}30`,
                      backgroundColor: `${step.color}08`,
                      color: `${step.color}90`,
                    }}
                  >
                    {step.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-text-primary text-sm group-hover:text-accent transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">{step.description}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-text-dim group-hover:text-success flex-shrink-0 self-center transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-2xl text-text-primary mb-2">
              Contact Information
            </h3>
            <p className="text-text-secondary leading-relaxed mb-8 text-sm">
              Reach out directly — our engineering team responds promptly with
              a qualified technical review.
            </p>

            <div className="space-y-3 mb-8">
              {CONTACT_INFO.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.28 + i * 0.08 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-bg-card border border-border hover:border-border-accent transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-accent-dim border border-accent-muted">
                    <info.icon className="w-4.5 h-4.5 text-accent" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest">{info.label}</p>
                    <a href={info.href} className="text-sm text-text-primary hover:text-accent transition-colors mt-0.5 block font-medium truncate">
                      {info.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Deployment modes */}
            <div className="mb-6">
              <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">
                Deployment Modes
              </p>
              <div className="flex flex-wrap gap-2">
                {["Cloud", "On-Prem", "Edge", "Hybrid", "Air-Gapped"].map((mode) => (
                  <span key={mode} className="tag hover:text-accent-bright hover:border-accent-muted cursor-default">
                    {mode}
                  </span>
                ))}
              </div>
            </div>

            {/* Core work */}
            <div>
              <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">
                Core Work
              </p>
              <div className="flex flex-wrap gap-2">
                {["AI Development", "Computer Vision", "Robotics Software", "Automation", "Backend Infra", "Monitoring"].map((work) => (
                  <span key={work} className="tag hover:text-accent-bright hover:border-accent-muted cursor-default">
                    {work}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;