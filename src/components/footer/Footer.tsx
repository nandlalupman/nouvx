"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GitFork, Link, Mail, Cpu, Shield, Zap, Network, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { NuovxLogo } from "@/components/ui";

const FOOTER_LINKS = {
  systems: [
    { label: "Services",      href: "/services"       },
    { label: "Products",      href: "#systems"        },
    { label: "Architecture",  href: "#architecture"   },
    { label: "Operations",    href: "#operations"     },
  ],
  company: [
    { label: "About",    href: "/about"    },
    { label: "Careers",  href: "/careers"  },
    { label: "Contact",  href: "/contact"  },
  ],
  network: [
    { label: "GitHub",        href: "https://github.com",           external: true },
    { label: "LinkedIn",      href: "https://linkedin.com",         external: true },
    { label: "Research Desk", href: "mailto:research@nouvx.com",    external: true },
  ],
};

const LEGAL_LINKS = [
  { label: "Security",    href: "/security"    },
  { label: "Reliability", href: "/reliability" },
  { label: "Privacy",     href: "/privacy"     },
  { label: "Terms",       href: "/terms"       },
];

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    try {
      setStatus("loading");
      setErrorMessage("");
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "footer" }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to subscribe");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="relative bg-slate-50/80 border-t border-slate-200 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]
          bg-[radial-gradient(ellipse,rgba(180,83,9,0.05)_0%,transparent_65%)]" />
      </div>

      <div className="section-container relative z-10 py-16 lg:py-20">
        {/* Newsletter Subscription Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 p-6 sm:p-8 rounded-2xl bg-[#09090b] text-white border border-slate-800 relative overflow-hidden shadow-xl"
        >
          <div className="absolute top-0 right-0 w-80 h-40 bg-[radial-gradient(ellipse,rgba(180,83,9,0.22)_0%,transparent_70%)] pointer-events-none" />
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase block mb-1">
                Engineering Intelligence Dispatches
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Stay at the forefront of physical AI & autonomous systems
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Get monthly deep-dives on robotics architecture, edge inference, and platform upgrades.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-shrink-0">
              {status === "success" ? (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed! Welcome to NOUVX briefings.</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="engineer@company.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === "error") setStatus("idle");
                        }}
                        className="bg-[#18181b] border border-slate-700 focus:border-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 outline-none w-full sm:w-72 transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#b45309] hover:bg-[#d97706] disabled:opacity-50 transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap cursor-pointer"
                    >
                      {status === "loading" ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <>
                          Subscribe
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                  {status === "error" && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errorMessage}
                    </p>
                  )}
                </div>
              )}
            </form>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[2fr_repeat(3,1fr)] gap-10 lg:gap-14 mb-16">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:pr-10"
          >
            {/* Logo */}
            <div className="mb-5">
              <NuovxLogo variant="light" size="md" showTagline={false} />
            </div>

            <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-xs font-normal">
              A brighter tomorrow with skills. Engineering intelligent AI infrastructure, 
              robotics platforms, and operational systems for next-generation builders.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { href: "https://github.com",         icon: GitFork, label: "GitHub"   },
                { href: "https://linkedin.com",       icon: Link,    label: "LinkedIn" },
                { href: "mailto:research@nouvx.com",  icon: Mail,    label: "Email"    },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-white border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent hover:bg-accent-dim transition-all duration-200 shadow-xs"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Systems */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            aria-label="Systems navigation"
          >
            <h4 className="text-xs font-mono font-semibold text-text-muted uppercase tracking-widest mb-5">
              Systems
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.systems.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary flex items-center gap-2 group transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/40 group-hover:bg-accent transition-colors flex-shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Company */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.13 }}
            aria-label="Company navigation"
          >
            <h4 className="text-xs font-mono font-semibold text-text-muted uppercase tracking-widest mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary flex items-center gap-2 group transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/40 group-hover:bg-accent transition-colors flex-shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Network */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            aria-label="Network navigation"
          >
            <h4 className="text-xs font-mono font-semibold text-text-muted uppercase tracking-widest mb-5">
              Network
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.network.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-text-secondary hover:text-text-primary flex items-center gap-2 group transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/40 group-hover:bg-accent transition-colors flex-shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="pt-8 border-t border-border"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
            {/* Copyright + status badges */}
            <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-text-muted">
              <span>© 2026 NOUVX. All rights reserved.</span>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-success" />
                <span>Security</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-warning" />
                <span>Reliability</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Network className="w-3 h-3 text-accent" />
                <span>Autonomy</span>
              </div>
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-text-muted">
              {LEGAL_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="hover:text-text-secondary transition-colors">
                  {link.label}
                </a>
              ))}
            </div>

            {/* Systems operational */}
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;