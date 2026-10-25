"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Shield, Mail, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid credentials");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05050a] px-4">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.10)_0%,transparent_65%)]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#b45309]/20 to-[#d97706]/10 border border-[#b45309]/30 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-[#d97706]" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">NOUVX Admin</h1>
          <p className="text-sm text-[#8a8078] mt-1">Systems Control Panel</p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-2xl bg-[#13110f] border border-[#2a2420] shadow-2xl">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-[#8a8078] uppercase tracking-wider mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5550]" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nouvx.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#2a2420] bg-[#0e0c0a] text-sm text-white placeholder:text-[#5a5550] focus:outline-none focus:border-[#d97706]/60 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#8a8078] uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5550]" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#2a2420] bg-[#0e0c0a] text-sm text-white placeholder:text-[#5a5550] focus:outline-none focus:border-[#d97706]/60 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#b45309] hover:bg-[#d97706] text-white font-bold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#b45309]/15"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Access Control Panel
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#2a2420] text-center">
            <p className="text-xs text-[#5a5550] font-mono">
              Protected by Supabase Auth · End-to-end encrypted
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs font-mono text-[#5a5550] hover:text-[#d97706] transition-colors"
          >
            ← Back to NOUVX Website
          </a>
        </div>
      </div>
    </div>
  );
}
