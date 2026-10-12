"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GitFork, Link, Mail, Cpu, Shield, Zap, Network } from "lucide-react";
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
    { label: "Research", href: "#research" },
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
  return (
    <footer className="relative bg-bg-secondary border-t border-border overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]
          bg-[radial-gradient(ellipse,rgba(212,163,115,0.12)_0%,transparent_65%)]" />
      </div>

      <div className="section-container relative z-10 py-16 lg:py-20">
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
              <NuovxLogo variant="dark" size="md" showTagline={true} />
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
                  className="w-9 h-9 rounded-xl bg-bg-elevated border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent-muted hover:bg-accent-dim transition-all duration-200"
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