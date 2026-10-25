import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/** GET dashboard stats for admin */
export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch counts in parallel
    const [contactsRes, applicationsRes, subscribersRes, campaignsRes] = await Promise.all([
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
      supabase.from("career_applications").select("*", { count: "exact", head: true }),
      supabase.from("newsletter_subscriptions").select("*", { count: "exact", head: true }),
      supabase.from("campaigns").select("*", { count: "exact", head: true }).eq("is_active", true),
    ]);

    // Fetch new/unreviewed counts
    const [newContactsRes, newAppsRes] = await Promise.all([
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("career_applications").select("*", { count: "exact", head: true }).eq("status", "new"),
    ]);

    // Recent submissions (last 5)
    const [recentContacts, recentApps] = await Promise.all([
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(5),
      supabase.from("career_applications").select("*").order("created_at", { ascending: false }).limit(5),
    ]);

    return NextResponse.json({
      stats: {
        total_contacts: contactsRes.count || 0,
        total_applications: applicationsRes.count || 0,
        total_subscribers: subscribersRes.count || 0,
        active_campaigns: campaignsRes.count || 0,
        new_contacts: newContactsRes.count || 0,
        new_applications: newAppsRes.count || 0,
      },
      recent_contacts: recentContacts.data || [],
      recent_applications: recentApps.data || [],
    }, { status: 200 });
  } catch (err) {
    console.error("Admin stats API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
