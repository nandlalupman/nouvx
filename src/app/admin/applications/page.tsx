"use client";

import * as React from "react";
import {
  Briefcase,
  Search,
  Filter,
  Mail,
  ExternalLink,
  Loader2,
  ChevronDown,
  X,
  User,
  Calendar,
  Copy,
  Check,
  FileText,
  Building,
} from "lucide-react";
import type { CareerApplication } from "@/lib/supabase/types";

const STATUS_OPTIONS: CareerApplication["status"][] = ["new", "screening", "interview", "offered", "rejected"];

export default function AdminApplicationsPage() {
  const [applications, setApplications] = React.useState<CareerApplication[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [selectedApp, setSelectedApp] = React.useState<CareerApplication | null>(null);
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  const fetchApplications = React.useCallback(async () => {
    try {
      setLoading(true);
      const url = statusFilter === "all"
        ? "/api/admin/applications?limit=50"
        : `/api/admin/applications?status=${statusFilter}&limit=50`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.data) {
        setApplications(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  React.useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleStatusChange = async (id: string, newStatus: CareerApplication["status"]) => {
    try {
      setUpdatingId(id);
      const res = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
        );
        if (selectedApp?.id === id) {
          setSelectedApp((prev) => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (e) {
      console.error("Failed to update status", e);
    } finally {
      setUpdatingId(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const filtered = applications.filter((a) => {
    const q = search.toLowerCase();
    return (
      a.full_name.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.job_title.toLowerCase().includes(q) ||
      (a.background && a.background.toLowerCase().includes(q))
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "screening":
        return "bg-orange-500/15 text-orange-400 border-orange-500/30";
      case "interview":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "offered":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "rejected":
        return "bg-red-500/15 text-red-400 border-red-500/30";
      default:
        return "bg-neutral-500/15 text-neutral-400 border-neutral-500/30";
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-emerald-400" />
            Career Applications
          </h1>
          <p className="text-sm text-[#8a8078] mt-1">
            Review candidate submissions, engineer portfolios, and manage hiring pipeline.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-[#0c1019] border border-[#1e293b] text-emerald-400">
            {filtered.length} Applicants
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5a5550]" />
          <input
            type="text"
            placeholder="Search candidate name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#13110f] border border-[#1e1b18] focus:border-emerald-500/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#5a5550] outline-none transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["all", "new", "screening", "interview", "offered", "rejected"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all whitespace-nowrap ${
                statusFilter === st
                  ? "bg-emerald-500 text-[#05050a] font-semibold shadow-sm"
                  : "bg-[#13110f] border border-[#1e1b18] text-[#8a8078] hover:text-white hover:border-[#1e293b]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#13110f] border border-[#1e1b18] overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-7 h-7 text-emerald-400 animate-spin" />
            <p className="text-xs text-[#8a8078] font-mono">Fetching candidate applications...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Briefcase className="w-10 h-10 text-[#5a5550] mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium text-white">No applications found</p>
            <p className="text-xs text-[#5a5550] mt-1">Applications submitted on the careers page will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0e0c0a] text-xs font-mono uppercase tracking-wider text-[#5a5550] border-b border-[#1e1b18]">
                <tr>
                  <th className="py-3.5 px-5">Candidate</th>
                  <th className="py-3.5 px-5">Target Role</th>
                  <th className="py-3.5 px-5">Portfolio / Profile</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5">Applied</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1b18]">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#1a1714]/60 transition-colors cursor-pointer group"
                    onClick={() => setSelectedApp(item)}
                  >
                    <td className="py-4 px-5">
                      <div className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {item.full_name}
                      </div>
                      <div className="text-xs text-[#8a8078] font-mono mt-0.5">{item.email}</div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-white font-medium">{item.job_title}</span>
                      <span className="text-[10px] text-[#5a5550] font-mono block mt-0.5">ID: {item.job_id}</span>
                    </td>
                    <td className="py-4 px-5" onClick={(e) => e.stopPropagation()}>
                      {item.profile_url ? (
                        <a
                          href={item.profile_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-[#d97706] hover:underline font-mono"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          View Profile
                        </a>
                      ) : (
                        <span className="text-xs text-[#5a5550]">None provided</span>
                      )}
                    </td>
                    <td className="py-4 px-5" onClick={(e) => e.stopPropagation()}>
                      <div className="relative inline-block">
                        <select
                          value={item.status}
                          disabled={updatingId === item.id}
                          onChange={(e) =>
                            handleStatusChange(item.id, e.target.value as CareerApplication["status"])
                          }
                          className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-lg border appearance-none pr-6 cursor-pointer bg-[#0e0c0a] focus:outline-none ${getStatusBadge(
                            item.status
                          )}`}
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#0c1019] text-white">
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                      </div>
                    </td>
                    <td className="py-4 px-5 text-xs text-[#5a5550] font-mono whitespace-nowrap">
                      {formatDate(item.created_at)}
                    </td>
                    <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`mailto:${item.email}?subject=NOUVX Application: ${encodeURIComponent(
                            item.job_title
                          )}`}
                          className="p-1.5 rounded-lg text-[#5a5550] hover:text-emerald-400 hover:bg-[#251f1a] transition-colors"
                          title="Email Candidate"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setSelectedApp(item)}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
                        >
                          Review
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Candidate Modal / Drawer */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#13110f] border border-[#2a2420] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e1b18] bg-[#0e0c0a]">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Candidate Profile</h3>
                <p className="text-xs text-[#5a5550] font-mono mt-0.5">Applied for {selectedApp.job_title}</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg text-[#5a5550] hover:text-white hover:bg-[#1e1b18] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0e0c0a] border border-[#1e1b18]">
                  <span className="text-[10px] font-mono text-[#5a5550] uppercase tracking-wider block mb-1">
                    Candidate Name
                  </span>
                  <div className="text-base font-semibold text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-400" />
                    {selectedApp.full_name}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-[#8a8078] font-mono">{selectedApp.email}</span>
                    <button
                      onClick={() => copyToClipboard(selectedApp.email)}
                      className="p-1 text-[#5a5550] hover:text-emerald-400 transition-colors"
                      title="Copy email"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0e0c0a] border border-[#1e1b18]">
                  <span className="text-[10px] font-mono text-[#5a5550] uppercase tracking-wider block mb-1">
                    Role & Portfolio
                  </span>
                  <div className="text-sm font-semibold text-white">
                    {selectedApp.job_title}
                  </div>
                  {selectedApp.profile_url && (
                    <div className="mt-2">
                      <a
                        href={selectedApp.profile_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#d97706] hover:underline font-mono"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {selectedApp.profile_url}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Background / Notes */}
              <div className="p-4 rounded-xl bg-[#0e0c0a] border border-[#1e1b18]">
                <span className="text-[10px] font-mono text-[#5a5550] uppercase tracking-wider block mb-2">
                  Candidate Background & Cover Note
                </span>
                <div className="text-sm text-[#cbd5e1] whitespace-pre-wrap leading-relaxed bg-[#0c1019] p-3.5 rounded-lg border border-[#26201b]">
                  {selectedApp.background || "No additional background text submitted."}
                </div>
              </div>

              {/* Pipeline Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#0e0c0a] border border-[#1e1b18]">
                <div>
                  <span className="text-xs font-semibold text-white block">Candidate Status</span>
                  <span className="text-[11px] text-[#5a5550]">Advance candidate in the recruitment pipeline</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {STATUS_OPTIONS.map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedApp.id, st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold capitalize border transition-all ${
                        selectedApp.status === st
                          ? getStatusBadge(st) + " ring-1 ring-white/20"
                          : "bg-transparent border-[#1e1b18] text-[#5a5550] hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#1e1b18] bg-[#0e0c0a]">
              <span className="text-xs text-[#5a5550] font-mono flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Applied {formatDate(selectedApp.created_at)}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#8a8078] hover:text-white hover:bg-[#1e1b18] transition-colors"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedApp.email}?subject=NOUVX Application — ${encodeURIComponent(
                    selectedApp.job_title
                  )}`}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#05050a] bg-gradient-to-r from-emerald-400 to-[#10b981] hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Contact Candidate
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
