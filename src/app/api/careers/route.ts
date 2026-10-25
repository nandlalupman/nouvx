import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { job_id, job_title, full_name, email, profile_url, background } = body;

    // Validate required fields
    if (!job_id || !job_title || !full_name || !email || !profile_url) {
      return NextResponse.json(
        { error: "Missing required fields: job_id, job_title, full_name, email, profile_url" },
        { status: 400 }
      );
    }

    const supabase = await createAdminSupabaseClient();

    const { data, error } = await supabase
      .from("career_applications")
      .insert({
        job_id,
        job_title,
        full_name,
        email,
        profile_url,
        background: background || "",
      })
      .select()
      .single();

    if (error) {
      console.error("Career application error:", error);
      return NextResponse.json(
        { error: "Failed to submit application" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    console.error("Careers API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
