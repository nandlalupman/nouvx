"use client";

import * as React from "react";
import {
  MessageSquare,
  Search,
  Filter,
  Mail,
  Building2,
  Clock,
  ExternalLink,
  CheckCircle2,
  Loader2,
  ChevronDown,
  X,
  User,
  Calendar,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import type { ContactSubmission } from "@/lib/supabase/types";

const STATUS_OPTIONS: ContactSubmission["status"][] = ["new", "reviewed", "contacted", "closed"];

export default function AdminContactsPage() {
  const [contacts, setContacts] = React.useState<ContactSubmission[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [selectedContact, setSelectedContact] = React.useState<ContactSubmission | null>(null);
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  const fetchContacts = React.useCallback(async () => {
    try {
      setLoading(true);
      const url = statusFilter === "all" 
        ? "/api/admin/contacts?limit=50" 
        : `/api/admin/contacts?status=${statusFilter}&limit=50`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.data) {
        setContacts(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  React.useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleStatusChange = async (id: string, newStatus: ContactSubmission["status"]) => {
    try {
      setUpdatingId(id);
      const res = await fetch("/api/admin/contacts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setContacts((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
        if (selectedContact?.id === id) {
          setSelectedContact((prev) => prev ? { ...prev, status: newStatus } : null);
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

  const filtered = contacts.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.full_name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.focus_area.toLowerCase().includes(q)
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "reviewed":
        return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";
      case "contacted":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "closed":
        return "bg-neutral-500/15 text-neutral-400 border-neutral-500/30";
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
            <MessageSquare className="w-6 h-6 text-[#d97706]" />
            Contact Submissions
          </h1>
          <p className="text-sm text-[#8a8078] mt-1">
            Review inbound inquiries, project requirements, and enterprise leads.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-[#0c1019] border border-[#1e293b] text-[#d97706]">
            {filtered.length} Total Records
          </span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5a5550]" />
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#13110f] border border-[#1e1b18] focus:border-[#d97706]/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#5a5550] outline-none transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["all", "new", "reviewed", "contacted", "closed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all whitespace-nowrap ${
                statusFilter === st
                  ? "bg-[#b45309] text-white font-semibold shadow-sm"
                  : "bg-[#13110f] border border-[#1e1b18] text-[#8a8078] hover:text-white hover:border-[#1e293b]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table / List */}
      <div className="rounded-2xl bg-[#13110f] border border-[#1e1b18] overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-7 h-7 text-[#d97706] animate-spin" />
            <p className="text-xs text-[#8a8078] font-mono">Fetching submissions...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <MessageSquare className="w-10 h-10 text-[#5a5550] mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium text-white">No contact inquiries found</p>
            <p className="text-xs text-[#5a5550] mt-1">Inquiries submitted on the website will show up here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0e0c0a] text-xs font-mono uppercase tracking-wider text-[#5a5550] border-b border-[#1e1b18]">
                <tr>
                  <th className="py-3.5 px-5">Lead</th>
                  <th className="py-3.5 px-5">Company / Area</th>
                  <th className="py-3.5 px-5">Timeline</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5">Date</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1b18]">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#1a1714]/60 transition-colors cursor-pointer group"
                    onClick={() => setSelectedContact(item)}
                  >
                    <td className="py-4 px-5">
                      <div className="font-semibold text-white group-hover:text-[#d97706] transition-colors">
                        {item.full_name}
                      </div>
                      <div className="text-xs text-[#8a8078] font-mono mt-0.5">{item.email}</div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="text-white font-medium flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#5a5550]" />
                        {item.company}
                      </div>
                      <div className="text-xs text-[#5a5550] mt-0.5 max-w-[200px] truncate">
                        {item.focus_area}
                      </div>
                    </td>
                    <td className="py-4 px-5 text-xs text-[#8a8078] font-mono">
                      {item.timeline}
                    </td>
                    <td className="py-4 px-5" onClick={(e) => e.stopPropagation()}>
                      <div className="relative inline-block">
                        <select
                          value={item.status}
                          disabled={updatingId === item.id}
                          onChange={(e) =>
                            handleStatusChange(item.id, e.target.value as ContactSubmission["status"])
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
                          href={`mailto:${item.email}?subject=RE: NOUVX Inquiry — ${encodeURIComponent(
                            item.company
                          )}`}
                          className="p-1.5 rounded-lg text-[#5a5550] hover:text-[#d97706] hover:bg-[#251f1a] transition-colors"
                          title="Send Email"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setSelectedContact(item)}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium text-[#d97706] bg-[#b45309]/15 hover:bg-[#b45309]/25 border border-[#b45309]/30 transition-colors"
                        >
                          Details
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

      {/* Details Modal / Drawer */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#13110f] border border-[#2a2420] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e1b18] bg-[#0e0c0a]">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Inquiry Details</h3>
                <p className="text-xs text-[#5a5550] font-mono mt-0.5">ID: {selectedContact.id}</p>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-1.5 rounded-lg text-[#5a5550] hover:text-white hover:bg-[#1e1b18] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              {/* Lead Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0e0c0a] border border-[#1e1b18]">
                  <span className="text-[10px] font-mono text-[#5a5550] uppercase tracking-wider block mb-1">
                    Contact Person
                  </span>
                  <div className="text-base font-semibold text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-[#d97706]" />
                    {selectedContact.full_name}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-[#8a8078] font-mono">{selectedContact.email}</span>
                    <button
                      onClick={() => copyToClipboard(selectedContact.email)}
                      className="p-1 text-[#5a5550] hover:text-[#d97706] transition-colors"
                      title="Copy email"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0e0c0a] border border-[#1e1b18]">
                  <span className="text-[10px] font-mono text-[#5a5550] uppercase tracking-wider block mb-1">
                    Organization
                  </span>
                  <div className="text-base font-semibold text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#d97706]" />
                    {selectedContact.company}
                  </div>
                  <div className="text-xs text-[#5a5550] mt-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Timeline: {selectedContact.timeline}
                  </div>
                </div>
              </div>

              {/* Focus Area */}
              <div className="p-4 rounded-xl bg-[#0e0c0a] border border-[#1e1b18]">
                <span className="text-[10px] font-mono text-[#5a5550] uppercase tracking-wider block mb-1">
                  Focus Area
                </span>
                <p className="text-sm font-medium text-white">{selectedContact.focus_area}</p>
              </div>

              {/* Requirements */}
              <div className="p-4 rounded-xl bg-[#0e0c0a] border border-[#1e1b18]">
                <span className="text-[10px] font-mono text-[#5a5550] uppercase tracking-wider block mb-2">
                  System Requirements & Scope
                </span>
                <div className="text-sm text-[#cbd5e1] whitespace-pre-wrap leading-relaxed bg-[#0c1019] p-3.5 rounded-lg border border-[#26201b]">
                  {selectedContact.requirements}
                </div>
              </div>

              {/* Status Update in Modal */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#0e0c0a] border border-[#1e1b18]">
                <div>
                  <span className="text-xs font-semibold text-white block">Pipeline Status</span>
                  <span className="text-[11px] text-[#5a5550]">Update submission handling status</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {STATUS_OPTIONS.map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedContact.id, st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold capitalize border transition-all ${
                        selectedContact.status === st
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

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#1e1b18] bg-[#0e0c0a]">
              <span className="text-xs text-[#5a5550] font-mono flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Submitted {formatDate(selectedContact.created_at)}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedContact(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#8a8078] hover:text-white hover:bg-[#1e1b18] transition-colors"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedContact.email}?subject=RE: NOUVX Inquiry — ${encodeURIComponent(
                    selectedContact.company
                  )}`}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#b45309] to-[#d97706] hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
