"use client";

import * as React from "react";
import {
  MessageSquare,
  Briefcase,
  Mail,
  Megaphone,
  TrendingUp,
  Clock,
  ArrowRight,
  Loader2,
  User,
  Building2,
} from "lucide-react";

interface DashboardStats {
  total_contacts: number;
  total_applications: number;
  total_subscribers: number;
  active_campaigns: number;
  new_contacts: number;
  new_applications: number;
}

interface RecentContact {
  id: string;
  full_name: string;
  email: string;
  company: string;
  status: string;
  created_at: string;
}

interface RecentApplication {
  id: string;
  full_name: string;
  email: string;
  job_title: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = React.useState<DashboardStats | null>(null);
  const [recentContacts, setRecentContacts] = React.useState<RecentContact[]>([]);
  const [recentApps, setRecentApps] = React.useState<RecentApplication[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats);
        setRecentContacts(data.recent_contacts || []);
        setRecentApps(data.recent_applications || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 text-[#d97706] animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      label: "Contact Submissions",
      total: stats?.total_contacts || 0,
      badge: stats?.new_contacts || 0,
      badgeLabel: "new",
      icon: MessageSquare,
      color: "#b45309",
      href: "/admin/contacts",
    },
    {
      label: "Career Applications",
      total: stats?.total_applications || 0,
      badge: stats?.new_applications || 0,
      badgeLabel: "new",
      icon: Briefcase,
      color: "#10b981",
      href: "/admin/applications",
    },
    {
      label: "Newsletter Subscribers",
      total: stats?.total_subscribers || 0,
      badge: null,
      badgeLabel: "",
      icon: Mail,
      color: "#d97706",
      href: "/admin/subscribers",
    },
    {
      label: "Active Campaigns",
      total: stats?.active_campaigns || 0,
      badge: null,
      badgeLabel: "",
      icon: Megaphone,
      color: "#f59e0b",
      href: "/admin/campaigns",
    },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHrs < 1) return "Just now";
    if (diffHrs < 24) return `${diffHrs}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "reviewed": return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";
      case "contacted": return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "screening": return "bg-orange-500/15 text-orange-400 border-orange-500/30";
      case "interview": return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "offered": return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "closed": return "bg-[#5a5550]/15 text-[#5a5550] border-[#5a5550]/30";
      case "rejected": return "bg-red-500/15 text-red-400 border-red-500/30";
      default: return "bg-[#5a5550]/15 text-[#5a5550] border-[#5a5550]/30";
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-sm text-[#8a8078] mt-1">NOUVX Systems Overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="group p-5 rounded-2xl bg-[#13110f] border border-[#1e1b18] hover:border-[#2a2420] transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{ backgroundColor: `${card.color}10`, borderColor: `${card.color}25` }}
              >
                <card.icon className="w-5 h-5" style={{ color: card.color }} />
              </div>
              {card.badge !== null && card.badge > 0 && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  {card.badge} {card.badgeLabel}
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-white mb-1">{card.total}</p>
            <p className="text-xs text-[#8a8078] font-medium group-hover:text-[#d97706] transition-colors flex items-center gap-1">
              {card.label}
              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </p>
          </a>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="rounded-2xl bg-[#13110f] border border-[#1e1b18] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e1b18]">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#d97706]" />
              Recent Contacts
            </h3>
            <a
              href="/admin/contacts"
              className="text-[10px] font-mono text-[#5a5550] hover:text-[#d97706] transition-colors flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          <div className="divide-y divide-[#1e1b18]">
            {recentContacts.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#5a5550]">No submissions yet</div>
            ) : (
              recentContacts.map((contact) => (
                <div key={contact.id} className="px-5 py-3.5 hover:bg-[#1e1b18]/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#5a5550]" />
                      <span className="text-sm font-semibold text-white">{contact.full_name}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${statusColor(contact.status)}`}>
                      {contact.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#5a5550]">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {contact.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(contact.created_at)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="rounded-2xl bg-[#13110f] border border-[#1e1b18] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e1b18]">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              Recent Applications
            </h3>
            <a
              href="/admin/applications"
              className="text-[10px] font-mono text-[#5a5550] hover:text-[#d97706] transition-colors flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          <div className="divide-y divide-[#1e1b18]">
            {recentApps.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#5a5550]">No applications yet</div>
            ) : (
              recentApps.map((app) => (
                <div key={app.id} className="px-5 py-3.5 hover:bg-[#1e1b18]/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#5a5550]" />
                      <span className="text-sm font-semibold text-white">{app.full_name}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${statusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#5a5550]">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      {app.job_title}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(app.created_at)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
