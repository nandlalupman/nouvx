"use client";

import * as React from "react";
import {
  Mail,
  Search,
  Download,
  Loader2,
  Calendar,
  Copy,
  Check,
  CheckCircle2,
  Users,
} from "lucide-react";
import type { NewsletterSubscription } from "@/lib/supabase/types";

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = React.useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [copiedEmail, setCopiedEmail] = React.useState<string | null>(null);

  const fetchSubscribers = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/subscribers?limit=200");
      const json = await res.json();
      if (json.data) {
        setSubscribers(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(text);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const exportToCSV = () => {
    if (subscribers.length === 0) return;
    const headers = "id,email,source,created_at\n";
    const rows = subscribers
      .map((s) => `"${s.id}","${s.email}","${s.source}","${s.created_at}"`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `nouvx-subscribers-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
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
            <Mail className="w-6 h-6 text-[#d97706]" />
            Newsletter Subscribers
          </h1>
          <p className="text-sm text-[#8a8078] mt-1">
            Audience receiving autonomous AI research briefings, updates, and announcements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-[#0c1019] border border-[#1e293b] text-[#d97706] flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {filtered.length} Subscribers
          </span>
          <button
            onClick={exportToCSV}
            disabled={subscribers.length === 0}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#b45309] to-[#d97706] hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5a5550]" />
        <input
          type="text"
          placeholder="Filter subscribers by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#13110f] border border-[#1e1b18] focus:border-[#d97706]/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#5a5550] outline-none transition-colors"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#13110f] border border-[#1e1b18] overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-7 h-7 text-[#d97706] animate-spin" />
            <p className="text-xs text-[#8a8078] font-mono">Loading audience list...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Mail className="w-10 h-10 text-[#5a5550] mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium text-white">No subscribers found</p>
            <p className="text-xs text-[#5a5550] mt-1">Subscribers from the footer or newsletter forms will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0e0c0a] text-xs font-mono uppercase tracking-wider text-[#5a5550] border-b border-[#1e1b18]">
                <tr>
                  <th className="py-3.5 px-5">Subscriber Email</th>
                  <th className="py-3.5 px-5">Acquisition Source</th>
                  <th className="py-3.5 px-5">Subscription Date</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1b18]">
                {filtered.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#1a1714]/60 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-medium text-white flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#5a5550]" />
                        {sub.email}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-mono text-[#8a8078] bg-[#1e1b18] border border-[#2a2420]">
                        {sub.source || "website"}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-xs text-[#5a5550] font-mono whitespace-nowrap">
                      {formatDate(sub.created_at)}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => copyToClipboard(sub.email)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-[#8a8078] hover:text-[#d97706] hover:bg-[#1e1b18] transition-colors"
                      >
                        {copiedEmail === sub.email ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
