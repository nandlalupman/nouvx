"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles, Megaphone } from "lucide-react";
import type { Campaign } from "@/lib/supabase/types";

export function CampaignBanner() {
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([]);
  const [dismissed, setDismissed] = React.useState<Set<string>>(new Set());
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    // Load dismissed campaigns from localStorage
    try {
      const stored = localStorage.getItem("nouvx-dismissed-campaigns");
      if (stored) setDismissed(new Set(JSON.parse(stored)));
    } catch {}

    // Fetch active campaigns
    fetch("/api/campaigns")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setCampaigns(data.data.filter((c: Campaign) => c.display_location === "banner"));
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const dismiss = (id: string) => {
    const next = new Set(dismissed);
    next.add(id);
    setDismissed(next);
    try {
      localStorage.setItem("nouvx-dismissed-campaigns", JSON.stringify([...next]));
    } catch {}
  };

  const visibleCampaigns = campaigns.filter((c) => !dismissed.has(c.id));

  if (!loaded || visibleCampaigns.length === 0) return null;

  return (
    <div className="w-full">
      <AnimatePresence>
        {visibleCampaigns.map((campaign) => (
          <motion.div
            key={campaign.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="relative bg-[#09090b] text-white border-b border-slate-800">
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[400px] h-[200px] bg-[radial-gradient(ellipse,rgba(180,83,9,0.18)_0%,transparent_65%)]" />
                <div className="absolute top-0 right-1/4 w-[300px] h-[200px] bg-[radial-gradient(ellipse,rgba(217,119,6,0.12)_0%,transparent_65%)]" />
              </div>

              <div className="section-container relative flex items-center justify-center gap-4 py-3 px-4">
                {/* Badge */}
                {campaign.badge_text && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    {campaign.badge_text}
                  </span>
                )}

                {/* Image thumbnail */}
                {campaign.image_url && (
                  <img
                    src={campaign.image_url}
                    alt=""
                    className="hidden md:block w-8 h-8 rounded-lg object-cover border border-slate-700"
                  />
                )}

                {/* Content */}
                <div className="flex items-center gap-3 text-center">
                  <p className="text-sm text-white font-medium">
                    <span className="font-bold">{campaign.title}</span>
                    {campaign.description && (
                      <span className="text-slate-300 ml-1.5">{campaign.description}</span>
                    )}
                  </p>
                </div>

                {/* CTA Link */}
                {campaign.link_url && (
                  <a
                    href={campaign.link_url}
                    className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-400 hover:text-white transition-colors flex-shrink-0"
                  >
                    {campaign.link_text || "Learn More"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}

                {/* Dismiss */}
                <button
                  onClick={() => dismiss(campaign.id)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default CampaignBanner;
