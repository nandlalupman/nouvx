"use client";

import * as React from "react";
import {
  Megaphone,
  Plus,
  Trash2,
  ExternalLink,
  Loader2,
  Calendar,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  ArrowRight,
} from "lucide-react";
import type { Campaign } from "@/lib/supabase/types";

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [togglingId, setTogglingId] = React.useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = React.useState("");
  const [formDesc, setFormDesc] = React.useState("");
  const [formBadge, setFormBadge] = React.useState("NEW");
  const [formLinkUrl, setFormLinkUrl] = React.useState("/contact");
  const [formLinkText, setFormLinkText] = React.useState("Learn More");
  const [formLocation, setFormLocation] = React.useState<"banner" | "popup" | "section">("banner");
  const [formActive, setFormActive] = React.useState(true);
  const [formError, setFormError] = React.useState<string | null>(null);

  const fetchCampaigns = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/campaigns");
      const json = await res.json();
      if (json.data) {
        setCampaigns(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const handleToggleActive = async (campaign: Campaign) => {
    try {
      setTogglingId(campaign.id);
      const res = await fetch("/api/admin/campaigns", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: campaign.id, is_active: !campaign.is_active }),
      });
      if (res.ok) {
        setCampaigns((prev) =>
          prev.map((c) => (c.id === campaign.id ? { ...c, is_active: !c.is_active } : c))
        );
      }
    } catch (e) {
      console.error("Toggle campaign failed", e);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this campaign?")) return;
    try {
      setDeletingId(id);
      const res = await fetch(`/api/admin/campaigns?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCampaigns((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (e) {
      console.error("Delete campaign failed", e);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormError("Title is required");
      return;
    }
    try {
      setSubmitting(true);
      setFormError(null);
      const res = await fetch("/api/admin/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle.trim(),
          description: formDesc.trim(),
          badge_text: formBadge.trim() || "NEW",
          link_url: formLinkUrl.trim() || null,
          link_text: formLinkText.trim() || "Learn More",
          display_location: formLocation,
          is_active: formActive,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to create campaign");
      }

      if (json.data) {
        setCampaigns((prev) => [json.data, ...prev]);
        setIsModalOpen(false);
        // Reset form
        setFormTitle("");
        setFormDesc("");
        setFormBadge("NEW");
        setFormLinkUrl("/contact");
        setFormLinkText("Learn More");
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to create campaign");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Megaphone className="w-6 h-6 text-[#f59e0b]" />
            Campaigns & Announcements
          </h1>
          <p className="text-sm text-[#8a8078] mt-1">
            Broadcast product releases, research milestones, and alerts across the website banner.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#b45309] to-[#d97706] hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg w-fit"
        >
          <Plus className="w-4 h-4" />
          Create Campaign
        </button>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-16 rounded-2xl bg-[#13110f] border border-[#1e1b18] flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-7 h-7 text-[#f59e0b] animate-spin" />
            <p className="text-xs text-[#8a8078] font-mono">Loading campaign broadcasts...</p>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="p-16 rounded-2xl bg-[#13110f] border border-[#1e1b18] text-center">
            <Megaphone className="w-10 h-10 text-[#5a5550] mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium text-white">No campaigns active</p>
            <p className="text-xs text-[#5a5550] mt-1">
              Create a campaign to display an announcement banner on top of the website
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#d97706] bg-[#b45309]/15 hover:bg-[#b45309]/25 border border-[#b45309]/30 transition-colors inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              New Campaign
            </button>
          </div>
        ) : (
          campaigns.map((camp) => (
            <div
              key={camp.id}
              className={`p-5 rounded-2xl border transition-all ${
                camp.is_active
                  ? "bg-[#13110f] border-[#1e293b] shadow-lg"
                  : "bg-[#0e0c0a]/60 border-[#1e1b18] opacity-75"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {camp.badge_text && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#b45309]/20 text-[#d97706] border border-[#b45309]/30">
                        {camp.badge_text}
                      </span>
                    )}
                    <span className="text-base font-bold text-white tracking-tight">
                      {camp.title}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold ${
                        camp.is_active
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : "bg-[#5a5550]/15 text-[#8a8078] border border-[#5a5550]/30"
                      }`}
                    >
                      {camp.is_active ? "ACTIVE" : "INACTIVE"}
                    </span>
                    <span className="text-[10px] font-mono text-[#5a5550] uppercase">
                      Location: {camp.display_location}
                    </span>
                  </div>

                  {camp.description && (
                    <p className="text-sm text-[#cbd5e1] leading-relaxed max-w-3xl">
                      {camp.description}
                    </p>
                  )}

                  {camp.link_url && (
                    <div className="flex items-center gap-2 pt-1 text-xs font-mono text-[#d97706]">
                      <span>Action:</span>
                      <a
                        href={camp.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white flex items-center gap-1"
                      >
                        {camp.link_text || "Learn More"} ({camp.link_url})
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 self-end lg:self-center">
                  <button
                    onClick={() => handleToggleActive(camp)}
                    disabled={togglingId === camp.id}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border transition-all ${
                      camp.is_active
                        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                    }`}
                  >
                    {togglingId === camp.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : camp.is_active ? (
                      "Deactivate"
                    ) : (
                      "Activate"
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(camp.id)}
                    disabled={deletingId === camp.id}
                    className="p-2 rounded-xl text-[#5a5550] hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                    title="Delete Campaign"
                  >
                    {deletingId === camp.id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-red-400" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="mt-4 pt-3 border-t border-[#1e1b18]">
                <span className="text-[10px] font-mono text-[#5a5550] uppercase tracking-wider block mb-2">
                  Preview in Top Banner
                </span>
                <div className="rounded-xl bg-gradient-to-r from-[#0f1320] via-[#211a14] to-[#0f1320] border border-[#b45309]/30 px-4 py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#b45309] text-white">
                      {camp.badge_text || "NEW"}
                    </span>
                    <span className="font-medium text-white">{camp.title}</span>
                    {camp.description && (
                      <span className="text-[#8a8078] hidden sm:inline">— {camp.description}</span>
                    )}
                  </div>
                  {camp.link_url && (
                    <span className="text-[#d97706] font-semibold flex items-center gap-1 hover:underline ml-2 whitespace-nowrap">
                      {camp.link_text || "Learn More"} <ArrowRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-[#13110f] border border-[#2a2420] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e1b18] bg-[#0e0c0a]">
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d97706]" />
                New Announcement Campaign
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-[#5a5550] hover:text-white hover:bg-[#1e1b18] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="p-6 space-y-4 overflow-y-auto flex-1">
              {formError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-[#cbd5e1] mb-1.5">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NOUVX Physical AI Engine 2.0 Released"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-[#0e0c0a] border border-[#1e1b18] focus:border-[#d97706]/50 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#5a5550] outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-[#cbd5e1] mb-1.5">
                  Description / Subtitle
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Autonomous edge fleet orchestration is now live in production."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full bg-[#0e0c0a] border border-[#1e1b18] focus:border-[#d97706]/50 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#5a5550] outline-none resize-none"
                />
              </div>

              {/* Badge Text & Location */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#cbd5e1] mb-1.5">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. NEW, UPDATE, ANNOUNCEMENT"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full bg-[#0e0c0a] border border-[#1e1b18] focus:border-[#d97706]/50 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#5a5550] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#cbd5e1] mb-1.5">
                    Display Location
                  </label>
                  <select
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value as any)}
                    className="w-full bg-[#0e0c0a] border border-[#1e1b18] focus:border-[#d97706]/50 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="banner">Top Banner</option>
                    <option value="popup">Modal Popup</option>
                    <option value="section">Page Section</option>
                  </select>
                </div>
              </div>

              {/* Link URL & Button Text */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#cbd5e1] mb-1.5">
                    Link URL
                  </label>
                  <input
                    type="text"
                    placeholder="/contact or https://..."
                    value={formLinkUrl}
                    onChange={(e) => setFormLinkUrl(e.target.value)}
                    className="w-full bg-[#0e0c0a] border border-[#1e1b18] focus:border-[#d97706]/50 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#5a5550] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#cbd5e1] mb-1.5">
                    Link Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Learn More, Read Whitepaper"
                    value={formLinkText}
                    onChange={(e) => setFormLinkText(e.target.value)}
                    className="w-full bg-[#0e0c0a] border border-[#1e1b18] focus:border-[#d97706]/50 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#5a5550] outline-none"
                  />
                </div>
              </div>

              {/* Active Toggle */}
              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0e0c0a] border border-[#1e1b18] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formActive}
                  onChange={(e) => setFormActive(e.target.checked)}
                  className="w-4 h-4 rounded text-[#b45309] bg-[#0c1019] border-[#1e293b] focus:ring-0"
                />
                <span className="text-xs font-medium text-white">
                  Publish campaign immediately (make active)
                </span>
              </label>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#8a8078] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#b45309] to-[#d97706] hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center gap-2"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Publish Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
